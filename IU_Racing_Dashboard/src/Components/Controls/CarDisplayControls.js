import ControlMeter from "./ControlMeter";
import { useState,useEffect } from "react";
import { io } from "socket.io-client"; 

const CarDisplayControls = ()=>{
    const [actualThrottle, setActualThrottle] = useState(0);
    const [cmdThrottle, setCMDThrottle] = useState(0);
    const [actualBrake, setActualBrake] = useState(2);
    const [cmdBrake, setCMDBrake] = useState(2);
    const [actualGear, setActualGear] = useState(5);
    const [cmdGear, setCMDGear] = useState(5);

    useEffect(() => {
        const controlSocket = io(process.env.REACT_APP_SERVER_URL);

        controlSocket.on('connect', () => {
        console.log('controls Connected to server');
        });

        controlSocket.on('disconnect', () => {
        console.log('controls Disconnected from server');
        });

        controlSocket.on('throttle', (string) => {
            const data = JSON.parse(string);
            if ('actualThrottle' in data){
                setActualThrottle(Math.round(data.actualThrottle));
            }
            if ('cmdThrottle' in data){
                setCMDThrottle(Math.round(data.cmdThrottle));
            }
        });

        controlSocket.on('brake', (string) => {
            const data = JSON.parse(string);
            if ('actualBrakeRear' in data){
                setActualBrake(Math.round(data.actualBrakeRear));
            }
            if ('cmdBrake' in data){
                setCMDBrake(Math.round(data.cmdBrake));
            }
        });

        controlSocket.on('gear', (string) => {
            const data = JSON.parse(string);
            if ('actualGear' in data){
                setActualGear(Math.round(data.actualGear));
            }
            if ('cmdGear' in data){
                setCMDGear(Math.round(data.cmdGear));
            }
        });

        return () => {
        controlSocket.disconnect();
        };
    }, []);
    return(
        <div className="flex-col space-y-3">
            <div className='w-1/3'>
                <ControlMeter name='Throttle' color='#2B64FF' maxValue={100} value={actualThrottle} cmdvalue={cmdThrottle}/>
            </div>
            <div className='w-1/3'>
                <ControlMeter name='Brake' color='#D38CFF' maxValue={2600} value={actualBrake} cmdvalue={cmdBrake}/>
            </div>
            <div className='w-1/3'>
                <ControlMeter name='Gear' color='#797979' maxValue={6} value={actualGear} cmdvalue={cmdGear}/>
            </div>
        </div>
    );
}

export default CarDisplayControls