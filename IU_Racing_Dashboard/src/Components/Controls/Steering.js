import React, { useState,useEffect } from 'react';
import ChangingProgressProvider from './ChangingProgressProvider';
import {
    CircularProgressbar,
    buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import progress_circle from '../../Assets/progress_circle.svg';
import { io } from 'socket.io-client';

const Steering = ({ color, maxValue, value}) => {
  const [actualSteering, setActualSteering] = useState(40);
  const [cmdSteering, setCMDSteering] = useState(0);
    useEffect(() => {
      const steeringSocket = io(process.env.REACT_APP_SERVER_URL);

      steeringSocket.on('connect', () => {
          console.log('Steering Monitor Connected to server');
      });

      steeringSocket.on('disconnect', () => {
          console.log('Steering Monitor Disconnected from server');
      });

      steeringSocket.on('steering', (string) => {
          const data = JSON.parse(string);
          if ('actualSteeringDegree' in data){
              setActualSteering(Math.round(data.actualSteeringDegree));
          }
          if ('cmdSteeringDegree' in data){
              setCMDSteering(Math.round(data.cmdSteeringDegree));
          }
      });

      return () => {
      steeringSocket.disconnect();
      };
  }, []);
  return (
    <div className="relative w-[150px] h-[150px] bg-[100%_100%]">
        <ChangingProgressProvider values={[actualSteering+240]}>
            {(value) => (
            <CircularProgressbar
                value={value}
                maxValue={480}
                circleRatio={1}
                styles={buildStyles({
                  rotation: 0.5,
                  strokeLinecap: "butt",
                  trailColor: "#000",
                  pathColor: color,
                })}
                strokeWidth={15}
            />
            )}
        </ChangingProgressProvider>
        <img
          className="absolute w-[100px] h-[100px] top-[25px] left-[25px]"  
          alt="Ellipse"
          src={progress_circle}
        />
        <div className="absolute w-[120px] h-[120px] top-[20px] left-[15px]"> 
            <div className="absolute w-[120px] h-[30px] text-[16px] top-[15px]  font-normal tracking-[0] leading-[normal] whitespace-nowrap">
            Steer
            </div>
            <div className="absolute number w-[120px] h-[40px] top-[25px] text-[35px]  font-normal tracking-[0] leading-[normal] whitespace-nowrap">
            {actualSteering}
            </div>
            <div className="absolute number w-[120px] h-[40px] top-[70px] text-[15px]  font-normal tracking-[0] leading-[normal] whitespace-nowrap">
            {cmdSteering}
            </div>
        </div>
    </div>
  )
}

export default Steering;