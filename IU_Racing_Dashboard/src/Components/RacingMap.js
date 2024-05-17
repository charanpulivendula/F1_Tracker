import React, { useState } from 'react';
// Import Google Maps API (assuming you have a valid API key)
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import racingmap from '../Assets/racing_map.png';
const libraries = ['places']; // Add places library for better user experience

const RacingMap = () => {
  const [mapType, setMapType] = useState('racing'); // Default to racing map

  const handleMapChange = (event) => {
    setMapType(event.target.value);
  };

  const racingMap = (
    <div className='w-4/5 ml-24'>
      {/* racing zoom */}
      <img
        alt="Mask group"
        src="https://c.animaapp.com/IFYG8yp8/img/mask-group.png"
      />
      <div />
      <img alt="Group" src={racingmap} />
    </div>
  );

  const googleMap = (
    <LoadScript
      googleMapsApiKey={process.env.GOOGLEAPIKEY} // Replace with your actual Google Maps API key
      libraries={libraries}
    >
      {({ isLoaded }) => (
        <div className='w-4/5 ml-16'>
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '400px' }}
              zoom={15}
              center={{ lat: 40.8086127, lng: -86.5254012 }} // Adjust center coordinates as needed
            >
              <Marker position={{ lat: 40.8086127, lng: -86.5254012 }} /> {/* Add a marker (optional) */}
            </GoogleMap>
          ) : (
            <div>Loading Google Map...</div>
          )}
        </div>
      )}
    </LoadScript>
  );

  const selectedMap = mapType === 'racing' ? racingMap : googleMap;

  return (
    <div>
      <select style={{color:"#000"}} value={mapType} onChange={handleMapChange}>
        <option value="racing">Racing Map</option>
        <option value="google">Google Map</option>
      </select>
      {selectedMap}
    </div>
  );
};

export default RacingMap;
