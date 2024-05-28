import React from "react";
import RacingMap from "./RacingMap";
import Contollables from "./Controllables";
import Overview from "./Overview";
// import States from './States';
// import Darkmode from "./Darkmode";
// import Connection from "./Connection";

const Dashboard = () => {
  return (
    <div className="flex flex-row w-full ">
      <div className=" flex flex-row justify-between">
        {/* <Darkmode/>
        <Connection/> */}
        <Overview/>
        <RacingMap/>
        <Contollables/>
      </div>
    </div>
  );
};
export default Dashboard;
