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
  console.log(`Received data: ${latestData.gear}`);
  Object.keys(latestData).forEach(field => {
    io.emit(field, latestData[field]);
  });
});

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

const Track_Flag_List = ['green', 'yellow', 'red'];
const Vehicle_Flag_List = ['purple', 'yellow', 'blue', 'orange', 'grey'];
const heartbeatImages = ['samosa', 'circle', 'wrong']; 

const generateRandomData = () => {
  return {
    speed: {
      max: Math.floor(Math.random() * 301),
      min: Math.floor(Math.random() * 50),
      current: Math.floor(Math.random() * 301)
    },
    tire_temp: {
      front_right: Math.floor(Math.random() * 100),
      front_left: Math.floor(Math.random() * 100),
      rear_right: Math.floor(Math.random() * 100),
      rear_left: Math.floor(Math.random() * 100)
    },
    throttle: Math.floor(Math.random() * 20),
    brake: Math.floor(Math.random() * 10),
    gear: Math.floor(Math.floor(Math.random() * 7)),
    ct_state: Math.floor(Math.random() * 12) + 1, // Assuming ctState values range from 1 to 12
    heartbeat: heartbeatImages[Math.floor(Math.random() * heartbeatImages.length)],
    comm: Math.floor(Math.random() * 100),
    system: 'Active',
    rpm: Math.floor(Math.random() * 8000),
    steering_angle: (Math.random() * 2 - 1) * 45,
    disconnected: false,
    laps: Math.floor(Math.random() * 70),
    track_flag: Track_Flag_List[Math.floor(Math.random() * Track_Flag_List.length)],
    vehicle_flag: Vehicle_Flag_List[Math.floor(Math.random() * Vehicle_Flag_List.length)],
    planning_trajectory: {
      x_m: Array.from({ length: 5 }, () => Math.random() * 1000),
      y_m: Array.from({ length: 5 }, () => Math.random() * 1000),
      vel_mph: Array.from({ length: 5 }, () => Math.random() * 200)
    },
    sys_state: Math.floor(Math.random() * 19) + 1, // Assuming sysState values range from 1 to 19
  };
};
