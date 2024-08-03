import React, { useState, useEffect } from "react";

import { io } from "socket.io-client";
import Controls from "./Controls/Controls";
import Map from "./Maps/Map";
import Overview from "./Overview/Overview";

const Dashboard = () => {
  const [initializing, setInitializing] = useState(true);
  const [controls, setControls] = useState(false);
  const [perception, setPerception] = useState(false);
  const [localization, setLocalization] = useState(false);
  const [msg, setMsg] = useState("Initializing...");
  const [done, setDone] = useState(false);
  const [close,setClose] = useState(false);

  useEffect(() => {
    const dashboard_socket = io(process.env.REACT_APP_SERVER_URL);

    dashboard_socket.on('disconnect', () => {
      console.log("status disconnect");
    });

    dashboard_socket.on('connect', () => {
      console.log("status incoming");
    });

    // Clean up socket connection
    return () => {
      dashboard_socket.disconnect();
    };
  }, []);

  // useEffect(() => {
  //   // Sequentially update states with timeouts
  //   setTimeout(() => {
  //     setInitializing(false);
  //     setMsg("Controls initializing...");
  //   }, 3000);

  //   setTimeout(() => {
  //     setControls(true);
  //     setMsg("Perception initializing...");
  //   }, 6000);

  //   setTimeout(() => {
  //     setPerception(true);
  //     setMsg("Localization initializing...");
  //   }, 9000);

  //   setTimeout(() => {
  //     setLocalization(true);
  //     setMsg("Done...");
  //   }, 12000);

  //   setTimeout(()=>{
  //     setDone(true)
  //   },14000)

  // }, []); 

  // const handleclosePopup = ()=>{
  //   setClose(true);
  // }

  return (
    <div className="flex flex-row w-full space-x-16">
      {/* {(initializing || !controls || !perception || !localization || !done) && !close && <PopUpMessage message={msg} closePopup={handleclosePopup}/>} */}
        <Overview />
        <Map />
        <Controls />
    </div>
  );
};

export default Dashboard;
