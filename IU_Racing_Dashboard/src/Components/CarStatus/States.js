import { useState,useEffect } from "react";
import Green from "../Miscellaneous/Green";
import { io } from "socket.io-client";

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
    const [heartbeat,setHeartbeat] = useState(0)
    useEffect(() => {
        const States_Socket = io(process.env.REACT_APP_SERVER_URL);

        States_Socket.on('connect', () => {
            console.log('State Monitor Connected to server');
        });

        States_Socket.on('disconnect', () => {
            console.log('State Monitor Disconnected from server');
        });

        States_Socket.on('ctstate', (data) => {
            // console.log(data)
            const ct_key_val = data.split(' ');
            setCTState({
                id:parseInt(ct_key_val[0]),
                msg:ct_key_val[1]
            })
        });
        States_Socket.on('sysstate', (data) => {
            const sys_key_val = data.split(' ');
            setSystemState({
                id:sys_key_val[0],
                msg:sys_key_val[1]
            })
        });

        States_Socket.on('heartbeat',(data)=>{
            setHeartbeat(data)
        })

        return () => {
        States_Socket.disconnect();
        };
    }, []);
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
                </div>
            </div>
        </div>
    </div>
 );   
}

export default States