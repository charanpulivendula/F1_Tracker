import React, { useEffect } from 'react'
import trackscroll from '../Assets/track-scroll.png';
import { useState } from 'react';
import SimVideo from './SimVideo';
import competition_data from '../Lab_Data/competition';
import car_red from '../Assets/car_red.png';
import './SimRace.css';

const SimRace = () => {
  const [trackHeight, setTrackHeight] = useState(0);
  const [competitionData, setCompetitionData] = useState(competition_data);

  useEffect(() => {
    if (competition_data !== undefined) {
      setCompetitionData(competition_data);
      setTrackHeight(document.getElementById('sim_videos').offsetHeight);
    }
  },
  [competitionData])
  return (
    <div className=''>
      <div id='racing_def' className='flex-col xl:pl-48 xl:pr-48 xl:mt-28 max-sm:pl-5 max-sm:pr-5 max-sm:mt-12 max-sm:mb-12' >
        <div className='text-left font-bold xl:text-4xl max-sm:text-3xl'>
          What is Autonomous Racing?
        </div>
        <br />
        <div className='text-left xl:text-xl max-sm:text-lg text-left'>
          Autonomous racing is an evolving sport of racing ground-based wheeled vehicles, controlled by computer. Equipped with cutting-edge technology like sensors and AI, these cars and drones navigate tracks independently, pushing the boundaries of autonomy and speed
        </div>
        <div className='xl:mt-28 max-sm:mt-12 '>
          <div className='text-left font-bold xl:text-4xl max-sm:text-3xl'>
            Indy Autonomous Challenge
          </div>
          <div className='text-left font-bold xl:text-4xl max-sm:text-3xl'>
            Simulation Race Achievements
          </div>
          <div className=' flex xl:mt-32 max-sm:mt-16' id='race-content'>
            <div className='track-scroll relative flex w-1/6 place-content-start z-0' id='track-scroll' style={{ height: trackHeight }}>
              <div className='flex place-content-center object-contain xl:ml-9 max-sm:ml-5 xl:w-[30px] max-sm:w-[20px] bg-no-repeat h-full' style={{ backgroundImage: `url(${trackscroll})`, backgroundSize: 'cover' }}>
              </div>
              <div className='absolute inset-0 flex items-start justify-start'>
                <img className='sticky top-50 shadow-2xl shadow-transparent xl:w-[100px] max-sm:w-[60px]' src={car_red} alt='' height={386} />
              </div>
            </div>
            <div className='sim_videos flex-col w-5/6' id='sim_videos'>
              {competitionData.map((competition) => {
                return (<SimVideo data={competition} />);
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimRace