import React from 'react'
import Video from './Video';
import Ordinal from './Ordinal';

const SimVideo = ({data}) => {
    const rank=data.rank;
    const sim_race = data.sim_race;
    const desc = data.desc;
    const video_link = data.link;
    const title = data.title;
    const objective = data.objective;
    const achievement = data.achievement;
    return (
        <div className='flex-col xl:mt-20 w-full max-sm:mt-10'>
            <div className='xl:flex max-sm:flex-col max-sm:items-center rank'>
                <div className='xl:w-1/2 flex items-start xl:text-6xl max-sm:text-3xl font-bold max-sm:leading-loose max-sm:mb-4'>
                    <div className='italic xl:text-7xl'>{sim_race}</div>{Ordinal(sim_race)} sim race
                </div>
                <div className='xl:flex max-sm:flex'>
                    <div className='xl:flex rounded max-sm:w-1/2 max-sm:flex xl:px-8 place-items-center justify-center bg-[#990000] xl:text-4xl max-sm:text-2xl max-sm:mb-4'>
                        <div className='italic'>{rank}</div>{Ordinal(rank)} place
                    </div>
                    <div className='xl:flex xl:px-4 max-sm:w-1/2 max-sm:flex place-items-center justify-center xl:text-2xl max-sm:text-base'>
                        {desc}
                    </div>
                </div>
            </div>
            <div className='video flex justify-center mt-10 mb-10'>
                <Video link={video_link} title={title}/>
            </div>
            <div className='xl:flex xl:space-x-5 max-sm:flex-col'>
                <div className='xl:w-1/2  text-left font-bold text-2xl max-sm:leading-loose'>
                    Objective
                    <div className='xl:text-xl max-sm:not-italic max-sm:text-lg font-normal text-left'>
                        {objective}
                    </div>
                </div>
                
                <div className='xl:w-1/2  text-left font-bold text-2xl max-sm:leading-loose'>
                    Achievement
                    <div className='text-xl max-sm:not-italic max-sm:text-lg font-normal text-left'>
                        {achievement}
                    </div>
                </div>
            </div>
        </div>
  )
}

export default SimVideo;