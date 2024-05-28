/* global google */
import { GoogleMap, LoadScript, Marker, useJsApiLoader, Polyline, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { DarkModeStyles } from '../Static/DarkModeStyles';
import { useState, useRef, useEffect, useCallback } from 'react';

const GMap = () => {
  const [racePath, setRacePath] = useState([]);
  const [carPosition, setCarPosition] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 39.18990, lng: -86.52281 });
  const [directions, setDirections] = useState(null);
  const directionsServiceRef = useRef(null);

  const handleMapClick = (event) => {
    const newCoordinate = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    setRacePath((prevPath) => [...prevPath, newCoordinate]);
    calculateMapCenter(racePath); 
    calculateDirections();
  };

  const calculateMapCenter = (path) => {
    if (path.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      path.forEach((point) => {
        bounds.extend(new window.google.maps.LatLng(point.lat, point.lng));
      });
      setMapCenter(bounds.getCenter().toJSON());
    }
  };

  const updateCarPosition = (latitude, longitude) => {
    setCarPosition({ lat: latitude, lng: longitude });
  };


  const calculateDirections = useCallback(() => {
    if (window.google) {
      if (!directionsServiceRef.current) {
        directionsServiceRef.current = new google.maps.DirectionsService();
      }

      if (directionsServiceRef.current && racePath.length > 1) {
        const waypoints = racePath.slice(1, -1).map((point) => ({
          location: new google.maps.LatLng(point.lat, point.lng),
          stopover: true,
        }));

        const request = {
          origin: new google.maps.LatLng(racePath[0].lat, racePath[0].lng),
          destination: new google.maps.LatLng(racePath[racePath.length - 1].lat, racePath[racePath.length - 1].lng),
          waypoints,
          travelMode: google.maps.TravelMode.DRIVING,
        };

        directionsServiceRef.current.route(request, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error('Error calculating directions:', status);
          }
        });
      }
    }
  },[racePath]);

  useEffect(() => {
    if (racePath.length > 1) {
      calculateDirections();
      calculateMapCenter(racePath);
    }
  }, [racePath]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLEAPIKEY,
    libraries: ['places'],
  });

  return (
    <div className="ml-5" style={{width:'100%',height:'100%'}} >
      {isLoaded ? (
        <div>
          <GoogleMap
            mapContainerStyle={{ width: 620, height: 700 }}
            zoom={15}
            center={mapCenter}
            options={{ styles: DarkModeStyles }}
            onClick={handleMapClick}
          >
            {directions && <DirectionsRenderer directions={directions} />}
            {carPosition && <Marker position={carPosition} />}
          </GoogleMap>
        </div>
      ) : (
        <div>Loading Google Map...</div>
      )}
    </div>
  );
};

export default GMap;