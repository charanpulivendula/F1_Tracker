import React from 'react';
import Luddy from '../Assets/Luddy.png';

export const RacingInfo = () => {
  return (
    <div id='racing_info' className='w-full max-sm:mt-10 xl:h-[32rem] max-sm:pl-5 max-sm:pr-5 max-sm:flex-col max-sm:w-full xl:mt-28 xl:flex xl:pl-48 xl:pr-48 xl:mb-32 max-sm:mb-12'>
      <div className='max-sm:flex-col xl:flex-col xl:w-2/3 max-sm:justify-center max-sm:w-full '>
        <div className='flex items-start max-sm:text-left xl:text-6xl max-sm:text-4xl font-bold xl:leading-loose max-sm:leading-loose'>
            IU Racing Team
        </div>
        <div className='flex max-sm:text-start items-start xl:text-3xl max-sm:text-lg font-bold xl:mb-5'>
            Building Autonomous Racing Cars
        </div>
        <div className=' visible-only-sm flex max-sm:justify-center max-sm:items-center max-sm:h-[240px]'>
          <img className='rounded-lg' width={200} height={200} src={Luddy} alt='Luddy'/>
        </div>
        <div className='flex items-start text-xl max-sm:text-lg text-left leading-normal'>
          The IU Racing Team comprises a diverse group of passionate students from Indiana University, spanning PhD, Master's, and undergraduate programs. With expertise and interest in various facets of the autonomy stack—ranging from perception to planning to control—we are dedicated to developing and implementing cutting-edge technology for the fastest fully autonomous racing car. Our journey began in August 2023 with just 8 PhD students Led by Prof. Lantao Liu, head of the VAIL Lab, then the team quickly expanded to a cohesive team of 28 members, each specializing in different aspects of the autonomy stack. 
        </div>
        
      </div>
      <div className='visible-only-lg visible-only-md xl:flex  xl:w-1/3 ml-48'>
        <img className='rounded' width={400} height={400} src={Luddy} alt='Luddy'/>
      </div>
    </div>
  )
}

export default RacingInfo;
