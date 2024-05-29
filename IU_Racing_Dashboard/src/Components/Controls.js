import React, { useState, useEffect } from 'react';
import ControlMeter from './ControlMeter';
import { io } from 'socket.io-client';

const Controls = () => {
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

  return (
    <div className='flex ml-8 py-4 space-x-4'>
      <div className='w-1/4'>
        <ControlMeter name='Throttle' color='#2B64FF' maxValue={20} value={throttle} />
      </div>
      <div className='w-1/4'>
        <ControlMeter name='Brake' color='#AE2BFF' maxValue={10} value={brake} />
      </div>
      <div className='w-1/4'>
        <ControlMeter name='Gear' color='#FFFFFF' maxValue={7} value={gear} />
      </div>
      <div className='w-1/4'>
        <ControlMeter name='Comm.' color='#B0B0B0' maxValue={100} value={comm} />
      </div>
    </div>
  );
};

export default Controls;
