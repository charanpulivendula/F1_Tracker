/* global google */
import { GoogleMap, useJsApiLoader, Marker, Polyline, MarkerClusterer } from '@react-google-maps/api';
import { DarkModeStyles } from '../Static/DarkModeStyles';
import { useState, useEffect, useCallback,useRef } from 'react';

import io from 'socket.io-client';
import logo from '../Assets/logo.svg';
const MAX_MARKERS = 10;
const libraries = ['places'];

const GMap = () => {
  const [racePath, setRacePath] = useState([]);
  const [carPosition, setCarPosition] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 45.6217635762167, lng: 9.281490418085674});
  const [center, setCenter] = useState({ lat: 45.6217635762167, lng: 9.281490418085674});
  const [disconnect,setDisconnect] = useState(false);

  useEffect(() => {
    const mapSocket = io(process.env.REACT_APP_SERVER_URL);

    mapSocket.on('connect', () => {
      console.log('map Socket Connected to server');
    });

    mapSocket.on('disconnect', () => {
      console.log('map Socket Disconnected from server');
    });
    mapSocket.on('currentspeed',(speed)=>{
      if(speed<=5){
        setDisconnect(true);
      }
      else{
        setDisconnect(false);
      }
    })
    mapSocket.on('location', (data) => {
      try {
        const latlng = JSON.parse(data);
        const latitude = parseFloat(latlng.lat);
        const longitude = parseFloat(latlng.long);
        
        if (isFinite(latitude) && isFinite(longitude) && ! disconnect) {
          updateCarPosition(latitude, longitude);
        } else {
          console.error('Invalid latitude or longitude:', latlng);
        }
      } catch (error) {
        console.error('Error parsing location data:', error);
      }
    });

    return () => {
      mapSocket.disconnect();
      setRacePath([]);
    };
  }, []);

  const updateCarPosition = (latitude, longitude) => {
    const newCarPosition = { lat: latitude, lng: longitude };
    setCarPosition(newCarPosition);
    if(racePath.length>MAX_MARKERS){
      setRacePath(racePath.shift())
      setRacePath((prevPath)=>[...prevPath,newCarPosition]);
    }
    else{
      setRacePath((prevPath) => [...prevPath, newCarPosition]);
    }
    setMapCenter(newCarPosition);
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLEAPIKEY,
  });

  return (
    <div className="ml-5" style={{ width: '100%', height: '100%' }}>
      <button onClick={()=>{
        setRacePath([]);
      }}>Clear</button>
      {isLoaded ? (
        <div className=''>
          <div className='p-2'>
            <GoogleMap
              mapContainerStyle={{ width: 620, height: 400 }}
              zoom={20}
              center={mapCenter}
              options={{ styles: DarkModeStyles }}
            >
              {carPosition && <Marker position={carPosition} icon={{
                url:logo,
                scaledSize: new window.google.maps.Size(20, 20)
              }}/>}
              {racePath.length > 1 && (
                <Polyline path={racePath} options={{ strokeColor: '#FF0000', strokeOpacity: 1.0, strokeWeight: 20}} />
              )}
            </GoogleMap>
          </div>
          <div className='p-2'>
            <GoogleMap
                mapContainerStyle={{ width: 620, height: 400 }}
                zoom={14}
                center={{lat:45.622632, lng:9.288045}}
                options={{ styles: DarkModeStyles}}
                heading={90}
                tilt={45}
              >
                {carPosition && <Marker position={carPosition} icon={{
                  url:logo,
                  scaledSize: new window.google.maps.Size(20, 20)
                }}/>}
                {racePath.length > 1 && (
                  <Polyline path={racePath} options={{ strokeColor: '#FF0000', strokeOpacity: 1.0, strokeWeight: 3}} />
                )}
              </GoogleMap>
          </div>

        </div>
        
      ) : (
        <div>Loading Google Map...</div>
      )}
    </div>
  );
};

export default GMap;
