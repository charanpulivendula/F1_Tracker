import React from 'react'
import Arrow from '../Assets/arrow.png';
const Button = ({text,width,height}) => {
  return (
    <div className='flex bg-white rounded-md shadow-lg pl-5 pr-5' style={{width:width,height:height}}>
        <div className='w-4/5 text-xl font-bold text-black flex place-items-center justify-center'>
            {text}
        </div> 
        <div className='w-1/5 items-center flex place-items-center justify-end'>
            <img src={Arrow} width={20} height={20} alt=""/>
        </div>
    </div>
  )
}

export default Button