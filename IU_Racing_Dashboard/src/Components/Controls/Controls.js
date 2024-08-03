import React from 'react'
import CarDisplay from './CarDisplay'
import ErrorTracker from './ErrorTracker'
import Stabilizer from './Stabilizer'
import ErrorChecker from './ErrorChecker'
import TempPressure from './TempPressure'

const Controls = () => {
  return (
    <div className='w-1/2 border-box bg-green-200 h-full'>
        <div>
            <CarDisplay/>
        </div>
        <div className='w-full'>
          <ErrorChecker/>
        </div>
        <div className=''>
          <TempPressure/>
        </div>
    </div>
  )
}

export default Controls