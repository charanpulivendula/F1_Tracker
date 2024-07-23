import React from 'react'

const OpponentCard = (props) => {
  return (
    <div className='flex'>
        <div className='w-2/12 text-black bg-white rounded-md'>
            {props.rank}
        </div>
        <div className=' flex w-5/12 bg-slate-900 justify-start'>
            <div className='w-2 mx-3 bg-[#cf1616]'>
            </div>
            {props.name}
        </div>
        <div className='w-5/12'>

        </div>
    </div>
  )
}

export default OpponentCard