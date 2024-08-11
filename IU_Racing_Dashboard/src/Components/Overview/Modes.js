import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setMapType } from '../../Redux/mapSlice';
import { setThemeMode } from '../../Redux/themeSlice';
import darkModeImage from '../../Assets/dark_mode.png';

const Modes = ()=>{
    const dispatch = useDispatch()
    const mapValue = useSelector(state => state.mapType)
    const mode = useSelector(state=>state.mode)
    
    const handleMapChange = (event) => {
        dispatch(setMapType(event.target.value));
      };
      const handleModeChange = (event)=>{
        dispatch(setThemeMode('light'))
      }
    return(
        <div className="flex flex-col space-y-20">
            <div className=''>
                <img src={darkModeImage} alt='dark mode' onClick={handleModeChange} height={50} width={50}/>
            </div>
            <div>
                <select
                    className='bg-black border w-24 h-8 rounded-md text-center'
                    style={{ color: "#fff" }}
                    value={mapValue}
                    onChange={handleMapChange}
                >   
                    <option value="KY">KY</option>
                    <option value="Google">Google</option>
                    <option value="Monza">Monza</option>
                    <option value="IN">IN</option>
                </select>
            </div>
        </div>
    );
}
export default Modes