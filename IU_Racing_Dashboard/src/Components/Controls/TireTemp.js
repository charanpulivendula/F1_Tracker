import React, { useState, useEffect } from 'react';
import car_temp from '../../Assets/car_red.png';
import { io } from "socket.io-client";

const TireTemp = () => {
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

    tempSocket.on('tireTemp', (data) => {
      const tireTemp = JSON.parse(data);
      setTempRL(Math.floor(tireTemp.rearLeft));
      setTempFL(Math.floor(tireTemp.frontLeft));
      setTempRR(Math.floor(tireTemp.rearRight));
      setTempFR(Math.floor(tireTemp.frontRight));
    });

    return () => {
      tempSocket.disconnect();
    };
  }, []);

  return (
    <div className='flex'>
      <div className='flex flex-col justify-between pt-12 pb-7'>
          <div className='text number text-lg'>
              {tempRL}ºC
          </div>
          <div className='text number text-lg'>
              {tempFL}ºC
          </div>
      </div>
      <div className=' relative'>
        <img src={car_temp} alt='car' width={120} height={280} className='' />
      </div>
      <div className=' flex flex-col justify-between pt-12 pb-7'>
          <div className='text number text-lg'>
              {tempRR}ºC
          </div>
          <div className='text number text-lg'>
              {tempFR}ºC
          </div>
      </div>
    </div>
  );
}

export default TireTemp;