
import { GoogleMap, LoadScript, Marker, useJsApiLoader, Polyline } from '@react-google-maps/api';
import {DarkModeStyles} from '../Static/DarkModeStyles';
import { useState } from 'react';

const GMap = ()=>{
  const [racePath, setRacePath] = useState([]);
  const [carPosition, setCarPosition] = useState(null);

  const handleMapClick = (event) => {
    const newCoordinate = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setRacePath((prevPath) => [...prevPath, newCoordinate]);
  };
  console.log(racePath);
  const updateCarPosition = (latitude, longitude) => {
    setCarPosition({ lat: latitude, lng: longitude });
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLEAPIKEY
  });
  return(
    <div className=''>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: "650px", height: "730px" }}
          zoom={15}
          center={{ lat: 39.18990, lng: -86.52281}}
          options={{ styles: DarkModeStyles }}
          onClick={handleMapClick}
        > 
         {racePath.length > 1 && (
            <Polyline path={racePath} options={{ strokeColor: 'red', strokeWeight: 2 }} />
          )}
          {/* {carPosition && <Marker position={carPosition} />} */}
          <Marker position={{ lat: 39.1898326, lng: -86.5254004 }} />
        </GoogleMap>
      ) : (
        <div>Loading Google Map...</div>
      )}
    </div>
)};

export default GMap;
