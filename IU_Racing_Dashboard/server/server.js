const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const protobuf = require('protobufjs');
const proto = protobuf.loadSync('./racing_data.proto');
const dgram = require('dgram');
const http = require('http');
const app = express();
const server = http.createServer(app);
const port = 8080;
const cors = require('cors');
const socketIO = require('socket.io');
const RacingData = proto.lookupType('RacecarData');
const os = require('os');
let latestData;
const Track_Flag_List = ['green', 'yellow', 'red'];
const Vehicle_Flag_List = ['purple', 'yellow', 'blue', 'orange', 'grey'];
const heartbeatImages = ['samosa', 'circle', 'wrong']; 

const TrackCondition = {
  0: "null",
  3: "red",
  9: "yellow",
  1: "green",
  37: "wavinggreen",
  4: "checkered",
  255: "default"
};

const VehicleFlagObj = {
  0: "null",
  25: "orange",
  2: "blue",
  4: "grey",
  7: "yellow",
  34: "stop",
  32: "purple",
  33: "enginekill",
  36: "attacker",
  35: "defender",
  255: "default"
};

app.use(cors());

// Express server

const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});

app.get('/api/coordinates', (req, res) => {
  const coordinates = [];

  fs.createReadStream('monza_centerline.csv')
    .pipe(csv(['track_progress', 'x_m', 'y_m', 'w_tr_right_m', 'w_tr_left_m']))
    .on('data', (row) => {
      coordinates.push([parseFloat(row.x_m), parseFloat(row.y_m)]);
    })
    .on('end', () => {
      res.json(coordinates);
    });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// UDP server

const udpServer = dgram.createSocket('udp4');
const UDP_PORT = 9876;

const networkInterfaces = os.networkInterfaces();
let localIPAddress;

Object.keys(networkInterfaces).forEach(interfaceName => {
  const interfaceList = networkInterfaces[interfaceName];
  interfaceList.forEach(interfaceInfo => {
    if (interfaceInfo.family === 'IPv4') {
      localIPAddress = interfaceInfo.address;
      return;
    }
  });
});

udpServer.on('error', (err) => {
  console.log(`UDP server error:\n${err.stack}`);
  udpServer.close();
});

udpServer.on('message', (msg) => {
  const decodedData = RacingData.decode(msg);
  latestData = RacingData.toObject(decodedData, {
    defaults: true,
    longs: String,
    enums: String,
    bytes: String,
  });
  if (latestData.speed!=null && latestData.speed.current!=0){
    latestData.speed.current=Math.floor(latestData.speed.current);
    io.emit('currentspeed',latestData.speed.current);
  }
  if(latestData.rpm!=0){
    io.emit('rpm',latestData.rpm);
  }
  if(latestData.throttle!=0){
    io.emit('throttle',Math.floor(latestData.throttle));
  }
  if(latestData.gear!=0){
    io.emit('gear',latestData.gear);
  }
  if(latestData.tireTemp && !checkNullValues(latestData.tireTemp))
  { 
    io.emit('tireTemp',JSON.stringify(latestData.tireTemp));
  }
  if(latestData.trackFlag!=0){
    io.emit('trackFlag',TrackCondition[latestData.trackFlag]);
  }
  if(latestData.vehicleFlag!=0){
    io.emit('vehicleFlag',VehicleFlagObj[latestData.vehicleFlag]);
  }
  // console.log(JSON.stringify(latestData));
  // Object.keys(latestData).forEach(field => {
  //   io.emit(field, latestData[field]);
  // });
  if(latestData.steeringAngle!=0){
    io.emit('steeringAngle',Math.floor(latestData.steeringAngle));
  }
});

const checkNullValues = (object)=>{
  Object.entries(object).forEach(([key,value])=>{
    if(value===null){
      return true;
    }
  });
  return false;
}

udpServer.on('listening', () => {
  const address = udpServer.address();
  console.log(`UDP server listening on ${address.address}:${address.port}`);
});

udpServer.bind({
  port: UDP_PORT,
  address: localIPAddress
});

setInterval(() => {
  const randomData = generateRandomData();
  Object.keys(randomData).forEach(field => {
    io.emit(field, randomData[field]);
  });
}, 5000);



const generateRandomData = () => {
  return {
    speed: {
      max: Math.floor(Math.random() * 301),
      min: Math.floor(Math.random() * 50),
      current: Math.floor(Math.random() * 301)
    },
    // tire_temp: {
    //   front_right: Math.floor(Math.random() * 100),
    //   front_left: Math.floor(Math.random() * 100),
    //   rear_right: Math.floor(Math.random() * 100),
    //   rear_left: Math.floor(Math.random() * 100)
    // },
    // throttle: Math.floor(Math.random() * 20),
    brake: Math.floor(Math.random() * 10),
    // gear: Math.floor(Math.floor(Math.random() * 7)),
    ct_state: Math.floor(Math.random() * 12) + 1, // Assuming ctState values range from 1 to 12
    heartbeat: heartbeatImages[Math.floor(Math.random() * heartbeatImages.length)],
    comm: Math.floor(Math.random() * 100),
    system: 'Active',
    rpm: Math.floor(Math.random() * 8000),
    // steering_angle: (Math.random() * 2 - 1) * 45,
    disconnected: false,
    laps: Math.floor(Math.random() * 70),
    // track_flag: Track_Flag_List[Math.floor(Math.random() * Track_Flag_List.length)],
    // vehicle_flag: Vehicle_Flag_List[Math.floor(Math.random() * Vehicle_Flag_List.length)],
    planning_trajectory: {
      x_m: Array.from({ length: 5 }, () => Math.random() * 1000),
      y_m: Array.from({ length: 5 }, () => Math.random() * 1000),
      vel_mph: Array.from({ length: 5 }, () => Math.random() * 200)
    },
    sys_state: Math.floor(Math.random() * 19) + 1, // Assuming sysState values range from 1 to 19
  };
};
