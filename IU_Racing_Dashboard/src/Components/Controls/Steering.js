import React from 'react';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import steering from '../../Assets/steering.png';
import "react-circular-progressbar/dist/styles.css";
import { useState } from 'react';

const Steering = () => {
    const [angle, setAngle] = useState(0);
    return (
        <div className='flex mt-10 flex flex-col items-center'>
          <img
            src={steering}
            height={100}
            width={100}
            className='transition transform duration-300
            
            '
            alt='steering'
            style={{ transform: `rotate(${angle}deg)` }}
          />
          <div className='text-xl text-white font-bold number'>{angle}</div>
        </div>
    );
}

export default Steering;