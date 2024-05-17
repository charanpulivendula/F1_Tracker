import { useState } from 'react';
import colors from '../Static/colors.json';
import OpponentCard from './OpponentCard';
const Lap_Data = ()=>{
    const [currentlap,setCurrentLap] = useState(0);
    const [totallaps,setTotalLaps] = useState(28);
    const [opponents,setOpponents] = useState([{name:'IU',color:'crimson',position:1}]);
    return (
        <div className='mx-2 p-1 my-5'>
            <div className="bg-slate-900 mb-2">
                <div className='number'>
                    LAP
                </div>
                <div className='number'>
                    {currentlap}/{totallaps}
                </div>
            </div>
            <OpponentCard rank={1} name={'IU'} color={'crimson'}/>
        </div>
    );
}

export default Lap_Data;