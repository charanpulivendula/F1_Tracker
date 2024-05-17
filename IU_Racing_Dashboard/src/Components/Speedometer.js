import progress_circle from '../Assets/progress_circle.svg';
import marker from '../Assets/marker.svg';
import line from '../Assets/line_speedometer.svg';
import ChangingProgressProvider from './ChangingProgressProvider';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useState, useEffect } from 'react';

const Speedometer = () => {
    const [speed, setSpeed] = useState(87);
    const [rotation, setRotation] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    const [minSpeed, setMinSpeed] = useState(10);
    const [maxSpeed, setMaxSpeed] = useState(10);
    const [RPM,setRPM] = useState(0);

    useEffect(() => {
        // Calculate the rotation angle based on the speed
        const maxSpeedValue = 300;
        const minRotation = 212; // Rotation angle at 0 km/h
        const maxRotation = 572; // Rotation angle at 300 km/h
        const speedRatio = speed / maxSpeedValue;
        const rotationAngle = minRotation + (maxRotation - minRotation) * speedRatio;
        setRotation(rotationAngle);

        // Update minimum and maximum speed based on current speed
        const calculatedMinSpeed = Math.min(speed, minSpeed);
        const calculatedMaxSpeed = Math.max(speed, maxSpeed);
        setMinSpeed(calculatedMinSpeed);
        setMaxSpeed(calculatedMaxSpeed);
    }, [speed]);

    useEffect(() => {
        // Update speed with random values every 2 seconds
        const updateSpeed = () => {
            const randomSpeed = Math.floor(Math.random() * 301); // Random speed between 0 and 300 km/h
            setSpeed(randomSpeed);
        };
        const updateRPM = ()=>{
            const randomRPM = Math.floor(Math.random() * 10000);
            setRPM(randomRPM);
        }   
        const intervalId = setInterval(updateSpeed, 2000); // Update speed every 2 seconds
        const intervalId1=setInterval(updateRPM,1000);


        return () => {
            clearInterval(intervalId); 
            clearInterval(intervalId1);// Clear interval on component unmount
        };
    }, []);

    return (
        <div className='flex'>
            <div className='w-1/4 flex-col leading-tight'>
                <div className='py-2'>
                    <div className='text-[20pt]'>
                        Minimum
                    </div>
                    <div className='number text-[36pt] bold'>
                        {minSpeed}
                    </div>
                </div>
                <div className='py-2'>
                    <div className='text-[20pt]'>
                        Maximum
                    </div>
                    <div className='number text-[36pt] bold'>
                        {maxSpeed}
                    </div>
                </div>
                <div className='py-2'>
                    <div className='text-[20pt]'>
                        RPM
                    </div>
                    <div className='number text-[36pt] bold'>
                        {RPM}
                    </div>
                </div>
            </div>
            <div className='flex w-3/4 place-items-center justify-center '>
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
                                        <ChangingProgressProvider values={[speed * 1 / 3]}>
                                            {(value) => (
                                                <CircularProgressbar
                                                    value={value}
                                                    circleRatio={0.94}
                                                    styles={buildStyles({
                                                        rotation: 41.50 / 100 + 1 / 8,
                                                        strokeLinecap: "butt",
                                                        trailColor: "#000",
                                                        pathColor: "#cf1616",
                                                    })}
                                                />
                                            )}
                                        </ChangingProgressProvider>
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
                                            className={`absolute w-[200px] h-[280px] top-4 left-[34.5px] transform transition-transform`}
                                            alt="Vector"
                                            src={marker}
                                            style={{ transform: `rotate(${rotation}deg)` }}
                                        />
                                        <div className="w-[262px] top-[90px] right-[10px] [font-family:'Michroma',Helvetica] font-normal text-white text-[100px] text-center absolute tracking-[0] leading-[normal]">
                                            {speed}
                                        </div>
                                        <div className="absolute top-[58.5px] left-[77.5px] [font-family:'Archivo',Helvetica] font-normal text-white text-[32px] tracking-[0] leading-[normal] whitespace-nowrap">
                                            Current
                                        </div>
                                    </div>
                                    <div className="absolute top-[256.5px] left-[104px] [font-family:'Archivo',Helvetica] font-normal text-white text-[24px] tracking-[0] leading-[normal] whitespace-nowrap">
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