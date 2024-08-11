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
      if('rearLeft' in tireTemp){
        setTempRL(Math.floor(tireTemp.rearLeft));
      }
      if('frontLeft' in tireTemp){
        setTempFL(Math.floor(tireTemp.frontLeft));
      }
      if('rearRight' in tireTemp){
        setTempRR(Math.floor(tireTemp.rearRight));
      }
      if('frontRight' in tireTemp){
        setTempFR(Math.floor(tireTemp.frontRight));
      }
    });

    return () => {
      tempSocket.disconnect();
    };
  }, []);

  return (
    <div className='flex'>
      <div className='flex flex-col w-1/4 justify-between pt-10 pb-9'>
          <div className='text text-md number'>
              {tempRL}ºC
          </div>
          <div className='text text-md number'>
              {tempFL}ºC
          </div>
      </div>
      <div className='w-1/2 flex ml-4'>
        <img src={car_temp} alt='car' width={120} height={280} className='' />
      </div>
      <div className='w-1/4 flex flex-col justify-between pt-10 pb-9'>
          <div className='text text-md number'>
              {tempRR}ºC
          </div>
          <div className='text text-md number'>
              {tempFR}ºC
          </div>
      </div>
    </div>
  );
}

export default TireTemp;