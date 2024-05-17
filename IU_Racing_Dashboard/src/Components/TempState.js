import React from 'react'
import States from './States'
import Temperature from './Temperature'

const TempState = () => {
  return (
    <div className='flex'>
        <div className='w-1/2'>
            <States/>
        </div>
        <div className='w-1/2'>
            <Temperature/>
        </div>
        
    </div>
  )
}

export default TempState