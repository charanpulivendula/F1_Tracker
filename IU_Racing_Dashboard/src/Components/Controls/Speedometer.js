import React, { useState, useEffect } from 'react';
import progress_circle from '../../Assets/progress_circle.svg';
import marker from '../../Assets/marker.svg';
import line from '../../Assets/line_speedometer.svg';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { io } from "socket.io-client";

const Speedometer = () => {
    const [actualSpeed, setActualSpeed] = useState(200);
    const [cmdSpeed,setCmdSpeed] = useState(87);
    const [rotation, setRotation] = useState(0);
    const [maxSpeed, setMaxSpeed] = useState(10);
    const [RPM, setRPM] = useState(0);

    useEffect(() => {
        const speedSocket = io(process.env.REACT_APP_SERVER_URL);
        speedSocket.on('connect', () => {
            console.log('Speedometer Connected to server');
        });

        speedSocket.on('disconnect', () => {
            console.log('Speedometer Disconnected from server');
        });

        speedSocket.on('speed', (string) => {
            const data = JSON.parse(string);
            if('vehicleSpeedKmph' in data){
                setActualSpeed(Math.round(data.vehicleSpeedKmph));
            }
            if('roundTargetSpeed' in data){
                console.log(data);
                setCmdSpeed(Math.round(data.roundTargetSpeed));
            }

        });
        speedSocket.on('rpm', (data) => {
            setRPM(Math.round(data));
        });

        return () => {
            speedSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        const maxSpeedValue = 300;
        const minRotation = 222; // Rotation angle at 0 km/h
        const maxRotation = 582; // Rotation angle at 300 km/h
        const speedRatio = actualSpeed / maxSpeedValue;
        const rotationAngle = minRotation + (maxRotation - minRotation) * (speedRatio-speedRatio/20);
        setRotation(rotationAngle);
    
        setMaxSpeed((prevSpeed)=>Math.max(prevSpeed,actualSpeed));
    }, [actualSpeed]);

    return (
        <div className='flex'>
            <div className='w-1/4 flex-col space-y-16 text-left'>
                <div className='py-2'>
                    <div className='heading text-[20pt]'>
                        MAXIMUM
                    </div>
                    <div className='number text-[28pt]'>
                        {maxSpeed}
                    </div>
                </div>
                <div className='py-2'>
                    <div className='heading text-[20pt]'>
                        RPM
                    </div>
                    <div className='number text-[28pt]'>
                        {RPM}
                    </div>
                </div>
            </div>
            <div className='flex w-3/4 place-items-center justify-center'>
                <div className="absolute">
                    <div className="absolute">
                        <div className="absolute transform scale-75 -translate-x-[100px] -translate-y-[150px]">
                            <div className="absolute">
                                <div className="top-[384px] left-[105px] [font-family:'Archivo',Helvetica] font-normal text-white text-[24px] text-center whitespace-nowrap absolute tracking-[0] leading-[normal]">
                                    10
                                </div>
                                <img
                                    className="absolute top-[275px] left-[176px] h-[15px] w-[2.5px]"
                                    alt="Line"
                                    src={line}
                                />
                                <div className="absolute">
                                    <div className="relative w-[391.5px] h-[391.5px] bg-[100%_100%]">
                                        <CircularProgressbar
                                            value={actualSpeed}
                                            maxValue={300}
                                            circleRatio={0.94}
                                            styles={buildStyles({
                                                rotation: 41.50 / 100 + 1 / 8,
                                                strokeLinecap: "butt",
                                                trailColor: "#000",
                                                pathColor: "#cf1616",
                                            })}
                                        />
                                        <img
                                            className="absolute w-[346px] h-[346px] top-[22px] left-[24px]"
                                            alt="Ellipse"
                                            src={progress_circle}
                                        />
                                    </div>
                                </div>
                                <div className="absolute w-[265px] h-[282.5px] top-[36.5px] left-[65px]">
                                    <div className="absolute w-[262px] h-[230.5px] top-[3.5px] left-0">
                                        <img
                                            className={`absolute w-[200px] h-[280px] top-4 left-[30px] transform transition-transform`}
                                            alt="Vector"
                                            src={marker}
                                            style={{ transform: `rotate(${rotation}deg)` }}
                                        />
                                        <div className="w-[262px] top-[90px] right-[10px] [font-family:'Michroma',Helvetica] font-normal number text-[100px] text-center absolute tracking-[0] leading-[normal]">
                                            {actualSpeed}
                                        </div>
                                        <div className="w-[262px] top-[210px] right-[10px] [font-family:'Michroma',Helvetica] font-normal number text-[40px] text-center absolute tracking-[0] leading-[normal]">
                                            {cmdSpeed}
                                        </div>
                                        <div className="absolute top-[58.5px] left-[77.5px] [font-family:'Archivo',Helvetica] font-normal text-white text-[32px] tracking-[0] leading-[normal] whitespace-nowrap">
                                            Current
                                        </div>
                                    </div>
                                    <div className="absolute top-[270.5px] left-[104px] [font-family:'Archivo',Helvetica] font-normal text-white text-[24px] tracking-[0] leading-[normal] whitespace-nowrap">
                                        km/h
                                    </div>
                                </div>
                            </div>
                            <div className="top-[398.5px] left-[176px] [font-family:'Archivo',Helvetica] font-normal text-white text-[24px] text-center whitespace-nowrap absolute tracking-[0] leading-[normal]">
                                300
                            </div>
                            <div className="top-[270px] left-[380px] [font-family:'Archivo',Helvetica] font-normal text-white text-[24px] text-center whitespace-nowrap absolute tracking-[0] leading-[normal]">
                                250
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Speedometer;
