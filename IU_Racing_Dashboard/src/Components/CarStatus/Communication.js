import { useState } from "react";
import Red from './Red';
import Green from './Green';
import React from 'react'

const Communication = ()=>{
    const [statusColor,setStatusColor] = useState(<Green/>)
    const [status,setStatus] = useState("Well Connected")
    return (
        <div className="my-2">
            <div className="heading">
                COMMUNICATION
            </div>
            <div className="flex flex-col bg-[#1A1A1A] h-12 rounded-lg px-5 justify-center">
                <div className="flex items-center space-x-5">
                    <div>
                        {statusColor}
                    </div>
                    <div>
                        {status}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Communication