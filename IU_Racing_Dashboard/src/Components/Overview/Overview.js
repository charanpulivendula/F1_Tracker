import React from 'react'
import Live from './Live'
import CarStatus from '../CarStatus/CarStatus'
import Modes from './Modes'

const Overview = () => {
  return (
    <div className='w-1/3 flex-col border-box text-white'>
        <div className='flex'>
          <div className='w-3/4'>
            <Live/>
          </div>
          <div className='w-1/4'>
            <Modes/>
          </div>

        </div>
        <div>
            <CarStatus/>
        </div>
    </div>
  )
}

export default Overview