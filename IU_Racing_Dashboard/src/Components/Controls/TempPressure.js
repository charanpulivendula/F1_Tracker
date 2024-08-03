import Pressure from "./Pressure";
import TireTemp from "./TireTemp";
import Stop from './Stop'

const TempPressure = ()=>{
    return (
        <div className="flex mt-6 space-x-20">
            <div className="w-1/2">
                <Pressure/>
            </div>
            <div className="w-1/2 flex-col">
                <TireTemp/>
                <Stop/>
            </div>
        </div>
    );
}

export default TempPressure