// /* global google */
import { GoogleMap, useJsApiLoader, Marker, Polyline } from '@react-google-maps/api';
import { DarkModeStyles } from '../../Static/DarkModeStyles';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import logo from '../../Assets/logo.svg';
const MAX_MARKERS = 10;

const GMap = () => {
  const [racePath, setRacePath] = useState([]);
  const [carPosition, setCarPosition] = useState(null);
  const [mapCenter, setMapCenter] = useState();
  const [disconnect,setDisconnect] = useState(false);
  const mapType = useSelector(state => state.map.mapType);

  useEffect(()=>{
    const center = mapType === "Monza" ? { lat: 45.6217635762167, lng: 9.281490418085674} : {lat:38.710700, lng:-84.915700}
    setMapCenter(center)
  },[mapType])

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
  },[]);

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
    <div className="" style={{ width: '100%', height: '100%' }}>
      <button onClick={()=>{
        setRacePath([]);
      }}>Clear</button>
      {isLoaded ? (
        <div className=''>
          <div className='py-2'>
            <GoogleMap
              mapContainerStyle={{ width: 550, height: 350 }}
              zoom={19}
              center={mapCenter}
              options={{ styles: DarkModeStyles }}
            >
              {carPosition && <Marker position={carPosition} icon={{
                url:logo,
                scaledSize: new window.google.maps.Size(20, 20)
              }}/>}
              {racePath.length > 1 && (
                <Polyline path={racePath} options={{ strokeColor: '#FF0000', strokeOpacity: 1.0, strokeWeight: 18}} />
              )}
            </GoogleMap>
          </div>
          <div className='py-2'>
            <GoogleMap
                mapContainerStyle={{ width: 550, height: 350 }}
                zoom={15}
                center={mapCenter}
                options={{ styles: DarkModeStyles}}
                heading={90}
                tilt={45}
              >
                {carPosition && <Marker position={carPosition} icon={{
                  url:logo,
                  scaledSize: new window.google.maps.Size(20, 20)
                }}/>}
                {racePath.length > 1 && (
                  <Polyline path={racePath} options={{ strokeColor: '#FF0000', strokeOpacity: 0.5, strokeWeight: 3}} />
                )}
              </GoogleMap>
          </div>
        </div>
        
      ) : (
        <div>Google Map Offline...</div>-
        9
      )}
    </div>
  );
};

export default GMap;
