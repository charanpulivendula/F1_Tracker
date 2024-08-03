import { useState } from "react";
const Pressure = ()=>{
    const [coolantTemp,setCoolantTemp] = useState(104)
    const [oilPressure, setOilPressure] = useState(323)
    const [front, setFront] = useState(124)
    const [rear, setRear] = useState(124)
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
                        <div className="number text-left text-2xl w-2/3">
                            Front
                        </div>
                        <div className="flex justify-center items-center w-1/3 bg-boxColor rounded-lg text-xl number h-10">
                            {front}
                        </div>
                    </div>
                    <div className="flex justify-center items-center w-full">
                        <div className="number text-left text-2xl w-2/3">
                            Rear
                        </div>
                        <div className="flex justify-center items-center w-1/3 bg-boxColor rounded-lg text-xl number h-10">
                            {rear}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Pressure