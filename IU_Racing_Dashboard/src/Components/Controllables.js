import progress_circle from '../Assets/progress_circle.svg';
// import Temperature from "./Temperature";
import Speedometer from "./Speedometer";
import Controls from './Controls';
import TempState from './TempState';

// import States from './States';

const Contollables = ()=>{
    return (
        <div className='flex flex-col w-4/5 xl:space-y-10'>
            <Speedometer/>
            <Controls/>
            <TempState/>
        </div>
    )
}
export default Contollables;