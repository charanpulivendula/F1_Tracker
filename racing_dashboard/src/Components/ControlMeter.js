import React from 'react'
import ChangingProgressProvider from './ChangingProgressProvider';
import { useEffect,useState } from 'react';
import {
    CircularProgressbar,
    buildStyles,
  } from "react-circular-progressbar";
  import "react-circular-progressbar/dist/styles.css";
import progress_circle from '../Assets/progress_circle.svg';

const ControlMeter = ({ name, color, maxValue }) => {
  const [value, setValue] = useState(Math.floor(Math.random() * maxValue) + 1);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(Math.floor(Math.random() * maxValue) + 1);
    }, 2000); // Update value every second
    return () => clearInterval(interval);
  }, [maxValue]);
  return (
    
    <div className="relative w-[100px] h-[100px] bg-[100%_100%]">
        <ChangingProgressProvider values={[value]}>
            {(value) => (
            <CircularProgressbar
                value={value}
                maxValue={maxValue}
                circleRatio={1}
                styles={buildStyles({
                  rotation: 0.25,
                  strokeLinecap: "butt",
                  trailColor: "#000",
                  pathColor: color,
                
                })}
                strokeWidth={14}
            />
            )}
        </ChangingProgressProvider>
        <img
        className="absolute w-[80px] h-[70px] top-[14px] left-[10px]"
        alt="Ellipse"
        src={progress_circle}
        />
        <div className="absolute w-[80px] h-[70px] top-[20px]">
            <div className="absolute w-[80px] h-[70px] top-[10px] left-[10px] text font-family:'Archivo',Helvetica] font-normal text-white text-[12px] tracking-[0] leading-[normal] whitespace-nowrap">
            {name}
            </div>
            <div className="absolute number w-[80px] h-[70px] top-[20px] left-[10px] font-family:'Archivo',Helvetica] font-normal text-white text-[20px] tracking-[0] leading-[normal] whitespace-nowrap">
            {value}
            </div>
        </div>
    </div>
  )
}

export default ControlMeter
