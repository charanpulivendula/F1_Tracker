import React from 'react'
import Communication from './Communication'
import States from './States'
import Sensors from './Sensors'

const CarStatus = () => {
  return (
    <div className='flex flex-col'>
      <Communication/>
      <States/>
      <Sensors/>
    </div>
  )
}

export default CarStatus