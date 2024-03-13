import React from 'react'
import MemberCard from './MemberCard';
import profile from '../Assets/profile.png'
import LeadCard from './LeadCard';
import leads from './Leads';
import members_data from './Members';
import lan_tao from '../Photos/lan_tao.png';

const Team = () => {
  return (
    <div className='flex-col xl:mt-40 xl:pl-48 xl:pr-48 max-sm:mt-12'>
        <div className='max-sm:bg-[#424242] max-sm:pt-12 max-sm:pl-5 max-sm:pr-5'>
            <div className='flex text-left font-bold xl:text-5xl max-sm:text-3xl'>
                Professor
            </div>
            <div className='xl:flex mt-10 xl:h-72 xl:bg-[#424242] rounded max-sm:pb-12'>
                <div className='h-full flex justify-center xl:w-1/3 place-items-center'>
                    <div
                    className="w-60 h-60  bg-cover bg-center"
                    style={{ backgroundImage: `url(${lan_tao})`  }}
                    ></div>
                </div>
                <div className='flex-col max-sm:mt-5 xl:p-20 xl:w-2/3'>
                    <div className='text-left font-bold xl:text-3xl max-sm:text-xl'>
                        Prof. Lantao Liu
                    </div>
                    <br/>
                    <div className='text-left xl:text-xl max-sm:text-lg'>
                        <div>
                        Associate Professor
                        </div>
                        <div>
                        Department of Intelligent Systems Engineering
                        </div>
                        <div>
                        Department of Computer Science
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='xl:mt-40 max-sm:mt-12 max-sm:pl-5 max-sm:pr-5'>
            <div className='flex text-left font-bold xl:text-5xl max-sm:text-3xl'>
                Team Leads
            </div>
            <div className="mt-10 flex flex-wrap -mx-4">
                {leads.map((student, index) => (
                    <MemberCard key={index} {...student} />
                ))}
            </div>

        </div>
        <div className='xl:mt-28 max-sm:mt-12 max-sm:pl-5 max-sm:pr-5'>
            <div className='flex text-left font-bold xl:text-5xl max-sm:text-3xl'>
                Team Members
            </div>
            <div className="mt-10 flex flex-wrap -mx-4">
                {members_data.map((student, index) => (
                    <MemberCard key={index} {...student} />
                ))}
            </div>

        </div>
    </div>
  )
}

export default Team