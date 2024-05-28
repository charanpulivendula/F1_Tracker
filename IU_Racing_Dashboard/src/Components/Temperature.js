import React, { useState, useEffect } from 'react';
import car_temp from '../Assets/car_temp.png';
import steering from '../Assets/steering.png';

const Temperature = () => {
  const [angle, setAngle] = useState(45);
  const [tempLT,setTempLT] = useState(0);
  const [tempLB,setTempLB] = useState(0);
  const [tempRT,setTempRT] = useState(0);
  const [tempRB,setTempRB] = useState(0);

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
              {tempLT}ºC
          </div>
          <div className='text text-lg'>
              {tempLB}ºC
          </div>
      </div>
      <div className='w-1/2 relative'>
        <img src={car_temp} alt='car' width={120} height={280} className='' />
        <div className='absolute top-[36%] left-[34%] flex flex-col items-center'>
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
              {tempRT}ºC
          </div>
          <div className='text text-lg'>
              {tempRB}ºC
          </div>
      </div>
    </div>
  );
}

export default Temperature;