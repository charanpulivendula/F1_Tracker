# Getting Started with F1_Tracker

# Overview
 Formula1 dashboard for a racing car involves integrating various technologies to track and display real-time data such as speed, location, throttle, brake, steering angle, and tire temperature. Here's an overview of the components and their interactions:

## Available Scripts

Go to the project directory, you can run:

## `npm install` or `npm install ModuleName`

Installing all the dependencies at once or installing by module.
can be viewed in Package.json

## `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).



## Data Flow and Integration

### Data Collection:

The autonomous racing car is equipped with various sensors to measure speed, location, throttle position, brake pressure, steering angle, and tire temperature.
ROS2 nodes are responsible for collecting data from these sensors and publishing it to relevant topics.

### Data Serialization:

Sensor data is serialized using Protocol Buffers (ProtoBuf) for efficient and compact transmission.
This serialized data is sent to the backend server via ROS2.

### Backend Server:

The Node.js server, built with Express, receives serialized data from the car.
The server deserializes the data using ProtoBuf and processes it as needed.
Real-time data is then sent to the frontend using Socket.IO.

### Frontend Display:

* The React frontend establishes a Socket.IO connection to receive real-time updates from the server.
Data visualizations are created using react.js and D3.js to provide interactive and informative displays for speed, throttle, brake, steering angle, and tire temperature.
* Google Maps API is used to display the car's current location on a map, with real-time updates based on incoming data.
Key Features
* *Real-Time Tracking:* The dashboard updates in real-time, reflecting the car's current status and performance metrics.

* *Interactive Visualizations:* Speedometer, throttle and brake meters, and tire temperature gauges provide clear and interactive representations of the car's status.

* *Location Tracking:* Google Maps API integration allows for real-time location tracking, displaying the car's movement on a map.
Efficient Data Handling: Use of ProtoBuf ensures efficient serialization and deserialization of data, reducing latency and improving performance.

* *Scalability and Flexibility:* The use of ROS2 allows for easy integration of additional sensors and data points as needed, making the system scalable and adaptable to future requirements.

## Example Workflow
- *Car Sensor Data:* Sensors on the car collect data on speed, location, throttle, brake, steering angle, and tire temperature.
- *ROS2 Publication:* Data is published to ROS2 topics, serialized using ProtoBuf.
- *Backend Server:* Node.js server receives serialized data, deserializes it, and processes it.
- *Socket.IO* Communication: Processed data is sent to the frontend via Socket.IO.
- *Frontend Visualization:* React frontend receives data, updates visualizations (D3.js), and displays the car's location on a Google Map.

# Tests
  - component.test.js (use Jest)

