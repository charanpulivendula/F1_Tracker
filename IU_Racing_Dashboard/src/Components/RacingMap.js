import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';
import racingmap from '../Assets/racing_map.png';
import {DarkModeStyles} from '../Static/DarkModeStyles';

const libraries = ['places'];



const RacingMap = () => {
  const [mapType, setMapType] = useState('google'); // Default to racing map

  const handleMapChange = (event) => {
    setMapType(event.target.value);
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLEAPIKEY
  });

  const racingMap = (
    <div className=''>
      <img
        alt="Mask group"
        src="https://c.animaapp.com/IFYG8yp8/img/mask-group.png"
        width={1399}
        height={1042}
      />
      <div />
      <img
        alt="Group"
        src={racingmap}
        width={1399}
        height={700}
      />
    </div>
  );

  const googleMap = (
    <div className=''>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: "650px", height: "730px" }}
          zoom={19}
          center={{ lat: 39.18990, lng: -86.52281}}
          options={{ styles: DarkModeStyles }}
        >
          <Marker position={{ lat: 39.1898326, lng: -86.5254004 }} />
        </GoogleMap>
      ) : (
        <div>Loading Google Map...</div>
      )}
    </div>
  );

  const selectedMap = mapType === 'racing' ? racingMap : googleMap;

  return (
    <div className='flex-col w-4/5 ml-10 h-full'>
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
