import React, { useState, useEffect } from 'react';
import car_temp from '../Assets/car_temp.png';
import steering from '../Assets/steering.png';

const Temperature = () => {
  const [angle, setAngle] = useState(45);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prevAngle) => Math.floor(Math.random()* 360)); // Rotate by 10 degrees every second
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex'>
      <div className='w-1/4'></div>
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
          <div className='text-lg text-white'>{angle}º</div>
        </div>
      </div>
      <div className='w-1/4'></div>
    </div>
  );
}

export default Temperature;