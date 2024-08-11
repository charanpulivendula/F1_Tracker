const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const protobuf = require('protobufjs');
const proto = protobuf.loadSync('./racing.proto');
const dgram = require('dgram');
const http = require('http');
const app = express();
const server = http.createServer(app);
const port = 8080;
const cors = require('cors');
const socketIO = require('socket.io');
const RacingData = proto.lookupType('RacecarData');
const os = require('os');
const { log } = require('console');
let latestData;
const Track_Flag_List = ['green', 'yellow', 'red'];
const Vehicle_Flag_List = ['purple', 'yellow', 'blue', 'orange', 'grey'];
const heartbeatImages = ['samosa', 'circle', 'wrong'];
const enums = require('./Enums')
const TrackCondition = enums.TRACK_CONDITION;
const VehicleFlagObj = enums.VEHICLE_FLAG_OBJ;
const CT_STATE = enums.CT_STATE;
const SYS_STATE = enums.SYS_STATE;
const HEARTBEAT = enums.HEARTBEAT;

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
const udpClient = dgram.createSocket('udp4');
const UDP_LISTENING_PORT = 9876;
const UDP__LISTENING_IP = '10.20.240.105'
const UDP_Target_PORT = 9877;
const UDP_Target_IP = '10.20.240.105'

const networkInterfaces = os.networkInterfaces();

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
  const latestData = RacingData.decode(msg);
  // latestData = RacingData.toObject(decodedData, {
  //   defaults: true,
  //   longs: String,
  //   enums: String,
  //   bytes: String,
  // });
  // console.log(latestData);
  if (latestData.speed!=null){
    io.emit('speed',JSON.stringify(latestData.speed));
  }
  if(latestData.tireTemp && !checkNullValues(latestData.tireTemp))
  { 
    io.emit('tireTemp',JSON.stringify(latestData.tireTemp));
  }
  if(latestData.throttle!=null){
    io.emit('throttle',JSON.stringify(latestData.throttle));
  }
  if(latestData.brake != null){
    io.emit('brake',JSON.stringify(latestData.brake))
  }
  if(latestData.racelineIndex != null){
    console.log(latestData.racelineIndex);
    io.emit('raceorpit',latestData.racelineIndex)
  }
  if(latestData.gear!=null){
    io.emit('gear',JSON.stringify(latestData.gear));
  }
  if(latestData.ctState!=0){
    io.emit('ctstate',latestData.ctState+" "+CT_STATE[latestData.ctState]);
  }
  if(latestData.ctStateRollingCounter!=0){
    io.emit('heartbeat',latestData.ctStateRollingCounter);
  }
  if(latestData.sysState!=0){
    io.emit('sysstate',latestData.sysState+" "+SYS_STATE[latestData.sysState]);
  }
  if(latestData.system!=""){
    io.emit('system',latestData.system);
  }
  if(latestData.engineSpeedRpm!=0){
    io.emit('rpm',latestData.engineSpeedRpm);
  }
  if(latestData.steering!=null){
    io.emit('steering',JSON.stringify(latestData.steering));
  } 
  if(latestData.brakePressure!=null){
    io.emit("brakepressure",JSON.stringify(latestData.brakePressure))
  }
  if(latestData.disconnected!=0){
    io.emit('connection',latestData.disconnected);
  }
  if(latestData.points!=null){
    io.emit("planningpoints",JSON.stringify(latestData.points))
  }
  if(latestData.trackFlag!=0){
    if(''+latestData.trackFlag in TrackCondition){
      io.emit('trackFlag',TrackCondition[latestData.trackFlag]);
    }
  }
  if(latestData.vehFlag!=0){
    if(''+latestData.vehFlag in VehicleFlagObj){
      io.emit('vehicleFlag',VehicleFlagObj[latestData.vehFlag]);
    }
  }
  if(latestData.location!==null && Object.keys(latestData.location).length==2){
    io.emit('location',JSON.stringify(latestData.location));
  }
  if(latestData.coolantTemperature!=0){
    io.emit('coolanttemperature',Math.round(latestData.coolantTemperature));
  }
  if(latestData.engineOilPressureKpa!=0){
    io.emit('oilpressure',Math.round(latestData.engineOilPressureKpa));
  }
  if(latestData.lapCount!=0){
    io.emit('lapcount',latestData.lapCount);
  }
  if(latestData.errors!=null){
    io.emit("errors",JSON.stringify(latestData.errors))
  }
  if(latestData.laps!=0){
    io.emit('laps',latestData.laps);
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
  port: UDP_LISTENING_PORT,
  address: UDP__LISTENING_IP
});



const sendUdpMessage = (message) => {
  // const errMsg = RacingData.verify(message);
  // if (errMsg) throw Error(errMsg);
  
  const messageBuffer = RacingData.encode(RacingData.create(message)).finish();
  udpClient.send(messageBuffer, UDP_Target_PORT, UDP_Target_IP, (err) => {
    if (err) console.error('UDP message send error:', err);
  });
};

// setInterval(() => {
//   const randomData = generateRandomData();
//   sendUdpMessage(randomData);
//   // console.log("message sent");
// }, 5000);

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
    heartbeat: heartbeatImages[1],
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
