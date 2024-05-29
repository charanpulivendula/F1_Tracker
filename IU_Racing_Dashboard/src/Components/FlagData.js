import React, { useEffect, useState } from 'react';
import yellow from '../Assets/Track-Flag-yellow.png';
import red from '../Assets/track-flag-red.png';
import green from '../Assets/Track Flag green.png';
import purple from '../Assets/Track Flag Purple.png';
import blue from '../Assets/Track Flag blue.png';
import orange from '../Assets/Track Flag orange.png';
import grey from '../Assets/track-flag-grey.png';
import { io } from 'socket.io-client';

const FlagData = () => {
    const [trackflag,setTrackFlag] = useState(red);
    const [msg,setMsg] = useState("No team can race");
    const [vehicleflag,setVehicleFlag] = useState(purple);
    const [intervalId, setIntervalId] = useState(null);
  const Track_Flag_Map = new Map([
    [
        'green',green,
        
    ],
    [
        'yellow',yellow,
        
    ],
    [
        'red',red,
    ]
    
  ]);
  const Track_Flag_Msg_Map=new Map([
      [green, 'Full speed mode'],
      [yellow,'Low speed mode'],
      [red,'No team can race']
  ]);

  const Vehicle_Flag_Map = new Map([
    ['purple',purple],
    ['yellow',yellow],
    ['blue',blue],
    ['orange',orange],
    ['grey',grey]
  ]);

  useEffect(() => {
    const flagSocket = io("http://localhost:8080");

    flagSocket.on('track_flag', (flag) => {
      setTrackFlag(Track_Flag_Map.get(flag));
      setMsg(Track_Flag_Msg_Map.get(trackflag) || "Unknown state");
    });

    flagSocket.on('connect',()=>{
      console.log('flags connected to server');
    });

    flagSocket.on('disconnect',()=>{
      console.log('flags disconnected from server');
    });

    flagSocket.on('vehicle_flag', (flag) => {
      setVehicleFlag(Vehicle_Flag_Map.get(flag));
    });

    return () => {
      flagSocket.disconnect();
    };
  }, []);

  return (
    <div className='flex-col'>
        <div className='flex my-4'>
            <img src={trackflag} alt="Track Flag" width={70} height={70}/>
            <div className='flex-col p-4'>
                <p className='flex justify-start'>Track Flag</p>
                {/* <p className='flex justify-start'>:{msg}</p> */}
            </div>
        </div>
        <div className='flex my-4'>
            <img src={vehicleflag} alt="Vehicle Flag" width={70} height={70} />
            <div className='flex-col p-4'>
                <p className='flex justify-start'>Vehicle Flag</p>
            </div>
        </div>
    </div>
  )
}

export default FlagData;