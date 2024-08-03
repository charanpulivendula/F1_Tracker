import GMap from './GMap';
import RaceMapPlanar from './RaceMapPlanar';
import LapsInfo from './LapsInfo'
import { useSelector } from 'react-redux';

const Map = () => {
  const mapType = useSelector(state => state.map.mapType)

  console.log(mapType);
  
  const selectedMap = mapType === 'Google' ? <GMap/> : <RaceMapPlanar/>;

  return (
    <div className='flex-col h-full'>
      <LapsInfo/>
      <div className='mt-8'>
        {selectedMap}
      </div>
    </div>
  );
};

export default Map;

