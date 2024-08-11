import Speedometer from "./Speedometer";
import ControlMeter from "./ControlMeter";
import CarDisplayControls from "./CarDisplayControls";
const CarDisplay = ()=>{
    return(
        <div className="flex space-x-20">
            <div className="w-3/4">
                <Speedometer/>
            </div>
            <div className="w-1/4 flex flex-col">
                <CarDisplayControls/>
            </div>
        </div>
    );
}

export default CarDisplay