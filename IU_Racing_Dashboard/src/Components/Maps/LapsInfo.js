import { useState, useEffect } from 'react';
import flags from '../../Assets/flags.png'
import { io } from 'socket.io-client';
const LapsInfo = ()=>{
    const [totalLaps,setTotalLaps] = useState(20)
    const [currentLap,setCurrentLap] = useState(12)
    useEffect(() => {
        const LapSocket = io(process.env.REACT_APP_SERVER_URL);

        LapSocket.on('connect', () => {
            console.log('Lap Monitor Connected to server');
        });

        LapSocket.on('disconnect', () => {
            console.log('Lap Monitor Disconnected from server');
        });

        LapSocket.on('laps', (data) => {
            setTotalLaps(data)
        });
        LapSocket.on('lapcount', (data) => {
            setCurrentLap(data)
        });

        return () => {
        LapSocket.disconnect();
        };
    }, []);
    return (
        <div className='flex h-20 space-x-5'>
            <div className='flex flex-col w-1/3 number rounded-lg bg-boxColor justify-center items-center'>
                <span>
                    LAP
                </span>
                <span>
                    Main Lap
                </span>
                <div className='text-lg font-bold'>
                    {currentLap}/{totalLaps}
                </div>
            </div>
            <div className='flex w-2/3 rounded-lg bg-boxColor'>
                <div className='flex flex-col w-1/2 number justify-center items-center'>
                    <span className='text-md'>
                        Track
                    </span>
                    <span className='text-lg'>
                        Finish Line
                    </span>
                </div>
                <div className='flex w-1/2 justify-center items-center'>
                    <img src={flags} height={120} width={120}/>
                </div>
            </div>
        </div>
    );
}

export default LapsInfo