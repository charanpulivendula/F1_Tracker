import React from 'react';
import Indy_challenge from '../Assets/Indy_challenge.png';
import Arrow from '../Assets/arrow.png';
import Button from './Button';

const IndyChallenge = () => {
  return (
    <div id='Indy_Challenge' className='w-full max-sm:pt-12 max-sm:pb-12 xl:pt-[84px] xl:pb-[84px] bg-[#990000] place-items-center max-sm:pl-5 max-sm:pr-5 xl:flex xl:pl-48 xl:pr-48'>
        <div className='visible-only-lg visible-only-md xl:w-1/3 xl:flex xl:justify-end '>
            <img src={Indy_challenge} alt='Indy_challenge' width={400} height={400}/>
        </div>
        <div className='xl:ml-24 xl:w-2/3 flex-col xl:mr-10'>
            <div className='text-left xl:text-4xl max-sm:text-3xl font-bold'>
                Participating In Indy Autonomous Challenge 2024
            </div>
            {/* <div className='text-left xl:text-4xl max-sm:text-3xl font-bold'>
            </div> */}
            <div className='visible-only-sm '>
                <br/>
                <img src={Indy_challenge} alt='Indy_challenge' width={300} height={300}/>
                <br/>
            </div>
            <br/>
            <div className='items-start text-left xl:text-xl max-sm:text-lg xl:mb-[26px]'>
               The Indy Autonomous Challenge is a series of competitions to advance technology that can speed the commercialization of fully autonomous vehicles and deployments of advanced driver-assistance systems to increase safety and performance. The competition series features teams from universities around the world.
            </div>
            <Button text={"Check out Indy Autonomous Challenge"} height={80}/>
        </div>
    </div>
  )
}

export default IndyChallenge