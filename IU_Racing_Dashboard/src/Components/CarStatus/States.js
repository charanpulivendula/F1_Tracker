import { useState } from "react";
import Green from "../Miscellaneous/Green";

const States = ()=>{
    const [systemState,setSystemState] = useState({
        id:6,
        msg:"Crack Checks Passed"
    })
    const [ctState,setCTState] = useState({
        id:5,
        msg:"Start Engine Now"
    })
    const [gpsHealth,setGPSHealth] = useState(100)
    const [heartbeat,setHeartbeat] = useState(<Green/>)
 return (
    <div className="flex-col space-y-2">
        <div className="flex w-full space-x-2">
            <div className="w-1/2 space-y-1">
                <div className="heading">
                    SYSTEM STATE
                </div>
                <div className="flex flex-col justify-center items-center h-20 w-full bg-boxColor">
                    <div className="number text-2xl">
                        {systemState.id}
                    </div>
                    <div>
                        {systemState.msg}
                    </div>
                </div>
            </div>
            <div className="w-1/2 space-y-1">
                <div className="heading">
                    CT STATE
                </div>
                <div className="flex flex-col justify-center items-center h-20 w-full bg-boxColor">
                    <div className="number text-2xl">
                        {ctState.id}
                    </div>
                    <div>
                        {ctState.msg}
                    </div>
                </div>
            </div>
        </div>
        <div className="flex w-full space-x-2">
            <div className="w-1/2 space-y-1">
                <div className="heading">
                    GPS HEALTH
                </div>
                <div className="flex flex-col justify-center items-left h-10 w-full bg-boxColor">
                    <div>
                        {gpsHealth}%
                    </div>
                </div>
            </div>
            <div className="w-1/2 space-y-1">
                <div className="heading">
                    HEARTBEAT
                </div>
                <div className="flex space-x-3 justify-center items-center h-10 w-full bg-boxColor">
                    <div>
                        {heartbeat}
                    </div>
                    <div>
                        Perfect
                    </div>
                </div>
            </div>
        </div>
    </div>
 );   
}

export default States