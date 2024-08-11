import React from 'react'
import ChangingProgressProvider from './ChangingProgressProvider';
import {
    CircularProgressbar,
    buildStyles,
  } from "react-circular-progressbar";
  import "react-circular-progressbar/dist/styles.css";
import progress_circle from '../../Assets/progress_circle.svg';

const ControlMeter = ({ name, color, maxValue,value, cmdvalue }) => {

  return (
    
    <div className="relative w-[100px] h-[100px] bg-[100%_100%]">
        <ChangingProgressProvider values={[value]}>
            {(value) => (
            <CircularProgressbar
                value={value}
                maxValue={maxValue}
                circleRatio={1}
                styles={buildStyles({
                  rotation: 0.5,
                  strokeLinecap: "butt",
                  trailColor: "#000",
                  pathColor: color,
                
                })}
                strokeWidth={13}
            />
            )}
        </ChangingProgressProvider>
        <img
        className="absolute w-[80px] h-[70px] top-[14px] left-[10px]"
        alt="Ellipse"
        src={progress_circle}
        />
        <div className="absolute w-[80px] h-[70px] top-[20px]">
            <div className="absolute w-[80px] h-[70px] top-[10px] left-[10px] text font-normal text text-[12px] tracking-[0] leading-[normal] whitespace-nowrap">
            {name}
            </div>
            <div className="absolute number w-[80px] h-[70px] top-[20px] left-[10px] font-normal number text-[15px] tracking-[0] leading-[normal] whitespace-nowrap">
            {value}
            </div>
            <div className="absolute number w-[80px] h-[70px] top-[40px] left-[10px] font-normal number text-[8px] tracking-[0] leading-[normal] whitespace-nowrap">
            {cmdvalue}
            </div>
        </div>
    </div>
  )
}

export default ControlMeter
