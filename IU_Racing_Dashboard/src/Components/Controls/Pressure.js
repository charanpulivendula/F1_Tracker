import { useState,useEffect } from "react";
import { io } from "socket.io-client";

const Pressure = ()=>{
    const [coolantTemp,setCoolantTemp] = useState(104)
    const [oilPressure, setOilPressure] = useState(323)
    const [frontPressure, setFrontPressure] = useState(124)
    const [rearPressure, setRearPressure] = useState(124)

    useEffect(() => {
        const pressureSocket = io(process.env.REACT_APP_SERVER_URL);

        pressureSocket.on('connect', () => {
            console.log('Pressure Monitor Connected to server');
        });

        pressureSocket.on('disconnect', () => {
            console.log('Pressure Monitor Disconnected from server');
        });

        pressureSocket.on('coolanttemperature', (string) => {
            setCoolantTemp(string)
        });
        pressureSocket.on('oilpressure', (string) => {
            setOilPressure(string)
        });

        pressureSocket.on('brakepressure', (string) => {
            const data = JSON.parse(string);
            if ('fBrakePressureCmd' in data){
                setFrontPressure(Math.round(data.fBrakePressureCmd));
            }
            if ('rBrakePressureCmd' in data){
                setRearPressure(Math.round(data.rBrakePressureCmd));
            }
        });

        return () => {
        pressureSocket.disconnect();
        };
    }, []);
    return (
        <div className="flex-col space-y-10">
            <div className="flex space-x-5">
                <div className="flex flex-col w-1/2 space-y-2 justify-center items-center">
                    <div className="heading">
                        COOLANT TEMP
                    </div>
                    <div className="flex text-xl w-full number justify-center items-center h-10  bg-boxColor rounded-lg">
                        {coolantTemp}
                    </div>
                </div>
                <div className="flex flex-col w-1/2 justify-center items-center space-y-2">
                    <div className="heading">
                        OIL PRESSURE
                    </div>
                    <div className="flex w-full text-xl justify-center items-center h-10 number bg-boxColor rounded-lg">
                        {oilPressure}
                    </div>
                </div>
            </div>
            <div className="">
                <div className="heading">
                    BREAK PRESSURE
                </div>
                <div className="space-y-10 mt-3">
                    <div className="flex justify-center items-center w-full">
                        <div className="number text-left text-2xl w-[60%]">
                            Front
                        </div>
                        <div className="flex justify-center items-center w-[40%] bg-boxColor rounded-lg text-xl number h-10">
                            {frontPressure}
                        </div>
                    </div>
                    <div className="flex justify-center items-center w-full">
                        <div className="number text-left text-2xl w-[60%]">
                            Rear
                        </div>
                        <div className="flex justify-center items-center w-[40%] bg-boxColor rounded-lg text-xl number h-10">
                            {rearPressure}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Pressure