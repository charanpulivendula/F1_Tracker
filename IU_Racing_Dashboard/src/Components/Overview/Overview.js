import React from 'react'
import Live from './Live'

const Overview = () => {
  return (
    <div className='w-1/3 flex-col border-box text-white'>
        <div className='flex'>
          <div className='w-3/4'>
            <Live/>
          </div>
          <div className='w-1/4'>

          </div>

        </div>
        <div>

        </div>
    </div>
  )
}

export default Overview