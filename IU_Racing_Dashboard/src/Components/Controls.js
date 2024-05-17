import React from 'react';
import ControlMeter from './ControlMeter';

const Controls = () => {
  return (
    <div className='flex ml-8 py-4 space-x-4'>
      <div className='w-1/4'>
        <ControlMeter name='Throttle' color='#2B64FF' maxValue={20} />
      </div>
      <div className='w-1/4'>
        <ControlMeter name='Brake' color='#AE2BFF' maxValue={10} />
      </div>
      <div className='w-1/4'>
        <ControlMeter name='Gear' color='#FFFFFF' maxValue={7} />
      </div>
      <div className='w-1/4'>
        <ControlMeter name='Comm.' color='#B0B0B0' maxValue={100} />
      </div>
    </div>
  );
};

export default Controls;