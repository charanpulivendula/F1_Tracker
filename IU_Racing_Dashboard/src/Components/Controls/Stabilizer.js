import { useState } from "react";
import ControlMeter from "./ControlMeter";
import Steering from "./Steering";
import Green from '../Miscellaneous/Green';

const Stabilizer = ()=>{
    const [steer,setSteer] = useState(20)
    const [active,setActive] = useState("Active")
    return (
        <div className="">
            <div className="heading">
                STABILIZER
            </div>
            <div className="flex justify-center items-center">
                <div className=" w-1/2 justify-center items-center">
                    <div className="flex w-full space-x-4 bg-boxColor h-8 justify-center items-center">
                        <div>
                            <Green/>
                        </div>
                        <div>
                            {active}
                        </div>
                    </div>
                </div>
                <div className="w-1/2">
                    <Steering/>
                </div>
            </div>
        </div>
    );
}

export default Stabilizer