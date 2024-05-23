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

app.use(cors())

//Express server

const io = socketIO(server);

io.on("connection",(socket)=>{
  console.log("connection successful");
  socket.on('disconnect',()=>{
    console.log('client disconnected');
  })
})

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

//UDP server

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
  io.emit('udpData', latestData);
});

udpServer.on('listening', () => {
  const address = udpServer.address();
  console.log(`UDP server listening on ${address.address}:${address.port}`);
});

udpServer.bind({
  port:UDP_PORT,
  address:localIPAddress
});
