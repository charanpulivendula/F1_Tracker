import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import sampleJSON from '../../Static/coordinates.json';
import {io} from 'socket.io-client';
import Zoom_Animation from './Zoom_Animation';

const RaceMapScale = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sampleGeoJSON, setSampleGeoJSON] = useState(null);
  const carRef = useRef(null);
  const pathRef = useRef(null);
  const [carPosition, setCarPosition] = useState(null);
  const geoJSONData = sampleJSON.features;

  useEffect(() => {
    const projectionSocket = io(process.env.REACT_APP_SERVER_URL);

    projectionSocket.on('connect', () => {
      console.log('projection Socket Connected to server');
    });

    projectionSocket.on('disconnect', () => {
      console.log('projection Socket Disconnected from server');
    });

    projectionSocket.on('location', (data) => {
      try {
        const latlng = JSON.parse(data);
        const latitude = parseFloat(latlng.lat);
        const longitude = parseFloat(latlng.long);
        
        if (isFinite(latitude) && isFinite(longitude) ) {
          updateCarPosition(latitude, longitude);
        } else {
          console.error('Invalid latitude or longitude:', latlng);
        }
      } catch (error) {
        console.error('Error parsing location data:', error);
      }
    });

    return () => {
        projectionSocket.disconnect();
    };
  }, []);

  const updateCarPosition = (latitude, longitude) => {
    const newCarPosition = { lat: latitude, lng: longitude };
    setCarPosition(newCarPosition);
  };

  useEffect(() => {
    if (geoJSONData.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % geoJSONData.length);
      }, 1000); // Change the interval as needed for animation speed
      return () => clearInterval(interval);
    }
  }, [geoJSONData]);

  useEffect(() => {
    if (carRef.current && pathRef.current) {
      drawPathAndAnimateCar();
    }
  }, [currentIndex,carPosition]);

  const drawPathAndAnimateCar = () => {
    const svg = d3.select(carRef.current);
    const path = d3.select(pathRef.current);

    const geoData = geoJSONData.slice(0, currentIndex + 1);

    const projection = d3.geoMercator()
      .fitSize([500, 500], { type: "FeatureCollection", features: geoData })

    const pathGenerator = d3.geoPath().projection(projection);

    path.datum({ type: "FeatureCollection", features: geoData })
      .attr('d', pathGenerator)
      .attr('stroke', 'white')
      .attr('stroke-width', 3)
      .attr('fill', 'none')
    
    carPosition && svg.selectAll('.car')
      .data([geoData[geoData.length - 1]])
      .join('circle')
      .attr('class', 'car')
      .attr('cx', d => projection([carPosition.lng,carPosition.lat])[0])
      .attr('cy', d => projection([carPosition.lng,carPosition.lat])[1])
      .attr('r', 10)
      .attr('fill', 'red')
      .transition()
      
  };

  return (
    <div className='relative'>
        <Zoom_Animation/>
        <svg ref={carRef} width={516} height={500} style={{ position: 'relative' }}>
            <path ref={pathRef} />
        </svg>
        
    </div>
  );
};

export default RaceMapScale;

