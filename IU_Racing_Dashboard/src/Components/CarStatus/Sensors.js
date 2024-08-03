import { useState } from "react"
import Green from "../Miscellaneous/Green"
import Red from '../Miscellaneous/Red'

const Sensors = ()=>{
    const [GPS_Antenna,setGPS_ANTENNA] =useState({
        Front:1,
        Top:1,
        Left:0,
        Right:0
    })
    const [IMU,setIMU] =useState({
        Vector_Nav:1,
        Novatel_A:1,
        Novatel_B:1
    })
    const [LIDAR,setLIDAR] =useState({
        Front:1,
        Left:1,
        Right:1
    })
    const [RADAR,setRADAR] =useState({
        Front:1,
        Rear:1
    })
    const [CAMERA,setCAMERA] =useState({
        Front:1,
        Rear:1,
        Left:0,
        Right:0,
        D_Left:0,
        D_Right:0
    })
    const sensors = {"GPS Antenna":GPS_Antenna,
                     "IMU":IMU,
                     "LIDAR":LIDAR,
                     "RADAR":RADAR,
                     "CAMERA":CAMERA}

    return (
        <div className="flex-col mt-2">
            <div className="heading">
                SENSOR
            </div>
            <div className="bg-boxColor p-4">
                {
                    Object.entries(sensors).map(([key,sensor])=>(
                        <div className="flex-col mt-2">
                            <div className="text-left">
                                {key}
                            </div>
                            <div className="flex space-x-4">
                                {
                                    Object.entries(sensor).map(([direction,value])=>(
                                        <div key = {direction} className="flex justify-center items-center space-x-1">
                                            <div>
                                                {value?<Green/>:<Red/>}
                                            </div>
                                            <div>
                                                {direction}
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            
                        </div>
                    ))
                    
                }
            </div>

        </div>
    );
}

export default Sensors