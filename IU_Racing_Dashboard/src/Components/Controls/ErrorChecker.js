import ErrorTracker from "./ErrorTracker";
import Stabilizer from "./Stabilizer";

const ErrorChecker = ()=>{
    return(
        <div className="flex mt-5">
            <div className='w-1/2'>
                <ErrorTracker/>
            </div>
            <div className='w-1/2'>
                <Stabilizer/>
            </div>
        </div>
    );
}
export default ErrorChecker