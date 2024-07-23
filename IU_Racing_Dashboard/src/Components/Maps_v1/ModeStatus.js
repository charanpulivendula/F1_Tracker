import { useState } from 'react';
import darkModeImg from '../../Assets/dark_mode.png'
const ModeStatus = ()=>{
    const [status,setStatus] = useState('Disconnected')
    return(
        <div className="flex box-content p-3">
            <div className='w-1/2'>
                <img src={darkModeImg} alt='dark mode' height={50} width={50}/>
            </div>
            <div className='flex place-items-center justify-center w-1/2'>
                <div className='box-content py-2 px-4 border-4 border-[#cf1616] text-[#cf1616] text-2xl font-bold rounded-lg'>
                    {status}
                </div>
            </div>
        </div>
    );
}
export default ModeStatus;