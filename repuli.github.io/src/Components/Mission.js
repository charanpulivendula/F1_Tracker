import React from 'react'

const Mission = () => {
  return (
    <div className='xl:mt-40 xl:pl-48 xl:pr-48 max-sm:pl-5 max-sm:pr-5 max-sm:mt-12'>
        <div className='font-bold max-sm:text-3xl max-sm:text-left xl:text-5xl max-sm:mb-8'>
            Mission
        </div>
        <div className='xl:flex xl:mt-5 xl:space-x-10 max-sm:flex-col'>
            <div className='xl:w-1/3 text-left '>
                <br/>
                <div className='font-bold xl:text-3xl max-sm:text-xl'>
                    As a Research Catalyst
                </div>
                <br/>
                <div className='xl:text-xl max-sm:text-lg'>
                    We are dedicated to advancing research across various facets of the autonomy stack, including perception, planning, and control modules. By pushing the boundaries of innovation in these areas, we aim to contribute significantly to the progress of autonomous driving technology.
                </div>
            </div>
            <div className='xl:w-1/3 text-left  '>
                <br/>
                <div className='font-bold text-3xl max-sm:text-xl'>
                    As a Learning Facilitator
                </div>
                <br/>
                <div className='xl:text-xl max-sm:text-lg'>
                    We are committed to offering our students an exceptional opportunity to apply their skills to real-world problems. Through hands-on experience and immersive projects, we empower our members to develop practical solutions and gain invaluable insights into the field of autonomous driving.
                </div>
            </div>
            <div className='xl:w-1/3 text-left '>
                <br/>
                <div className='font-bold text-3xl max-sm:text-xl'>
                    As a Racing Innovator
                </div>
                <br/>
                <div className='xl:text-xl max-sm:text-lg'>
                    Our ultimate goal is to become world champions in Autonomous Racing competitions. By continuously refining our techniques, leveraging cutting-edge technology, and fostering a spirit of collaboration, we aspire to compete against and surpass the best AI teams in the world. 
                </div>
            </div>
        </div>
    </div>
  )
}

export default Mission