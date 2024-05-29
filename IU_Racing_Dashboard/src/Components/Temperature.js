import React, { useState, useEffect } from 'react';
import car_temp from '../Assets/car_temp.png';
import steering from '../Assets/steering.png';
import { io } from "socket.io-client";
import { useCallback } from 'react';

const Temperature = () => {
  const [angle, setAngle] = useState(45);
  const [tempRL,setTempRL] = useState(0);
  const [tempFL,setTempFL] = useState(0);
  const [tempRR,setTempRR] = useState(0);
  const [tempFR,setTempFR] = useState(0);

  
  useEffect(() => {
    
    const tempSocket = io(process.env.REACT_APP_SERVER_URL);
    tempSocket.on('connect', () => {
      console.log('Temp Connected to server');
    });

    tempSocket.on('disconnect', () => {
      console.log('Temp Disconnected from server');
    });

    tempSocket.on('tire_temp', (data) => {
      setTempRL(data.rear_left);
      setTempFL(data.front_left);
      setTempRR(data.rear_right);
      setTempFR(data.front_right);
    });
    return () => {
      tempSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prevAngle) => Math.floor(Math.random() * 360)); // Rotate by random degrees every second
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prevAngle) => Math.floor(Math.random()* 360)); // Rotate by 10 degrees every second
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex'>
      <div className='flex flex-col w-1/4 justify-between pt-8 pb-9'>
          <div className='text text-lg'>
              {tempRL}ºC
          </div>
          <div className='text text-lg'>
              {tempFL}ºC
          </div>
      </div>
      <div className='w-1/2 relative'>
        <img src={car_temp} alt='car' width={120} height={280} className='' />
        <div className='absolute top-[36%] left-[32%] flex flex-col items-center'>
          <img
            src={steering}
            height={36}
            width={36}
            className='transition transform'
            alt='steering'
            style={{ transform: `rotate(${angle}deg)` }}
          />
          <div className='text-lg text-white font-bold text'>{angle}º</div>
        </div>
      </div>
      <div className='w-1/4 flex flex-col justify-between pt-8 pb-9'>
          <div className='text text-lg'>
              {tempRR}ºC
          </div>
          <div className='text text-lg'>
              {tempFR}ºC
          </div>
      </div>
    </div>
  );
}

export default Temperature;