import ControlMeter from "./ControlMeter";
import { useState,useEffect } from "react";
import { io } from "socket.io-client"; 

const CarDisplayControls = ()=>{
    const [throttle, setThrottle] = useState(0);
    const [brake, setBrake] = useState(0);
    const [gear, setGear] = useState(0);
    const [comm, setComm] = useState(0);

    useEffect(() => {
        const controlSocket = io(process.env.REACT_APP_SERVER_URL);

        controlSocket.on('connect', () => {
        console.log('controls Connected to server');
        });

        controlSocket.on('disconnect', () => {
        console.log('controls Disconnected from server');
        });

        controlSocket.on('throttle', (data) => {
        setThrottle(data);
        });

        controlSocket.on('brake', (data) => {
        setBrake(data);
        });

        controlSocket.on('gear', (data) => {
        setGear(data);
        });

        controlSocket.on('comm', (data) => {
        setComm(data);
        });

        return () => {
        controlSocket.disconnect();
        };
    }, []);
    return(
        <div>
            <div className='w-1/3'>
                <ControlMeter name='Throttle' color='#2B64FF' maxValue={310} value={throttle} />
            </div>
            <div className='w-1/3'>
                <ControlMeter name='Brake' color='#D38CFF' maxValue={10} value={brake} />
            </div>
            <div className='w-1/3'>
                <ControlMeter name='Gear' color='#797979' maxValue={6} value={gear} />
            </div>
        </div>
    );
}

export default CarDisplayControls