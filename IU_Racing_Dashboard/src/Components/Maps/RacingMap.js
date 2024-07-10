

import React, { useState, useEffect, useRef } from 'react';
import racingmap from '../../Assets/racing_map.png';
import RaceMapScale from './RaceMapScale'
import GMap from './GMap';
import RaceMapPlanar from './RaceMapPlanar';

const RacingMap = () => {
  const [mapType, setMapType] = useState('racing');
  

  const handleMapChange = (event) => {
    setMapType(event.target.value);
  };
  
  const selectedMap = mapType === 'racing' ? <RaceMapPlanar/> : <GMap />;

  return (
    <div className='flex-col h-full'>
      <select
        className=''
        style={{ color: "#000" }}
        value={mapType}
        onChange={handleMapChange}
      >
        <option value="racing">Racing Map</option>
        <option value="google">Google Map</option>
      </select>
      {selectedMap}
    </div>
  );
};

export default RacingMap;

