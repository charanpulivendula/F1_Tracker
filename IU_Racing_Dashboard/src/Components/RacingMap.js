// import React, { useState } from 'react';
// import { GoogleMap, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';
// import racingmap from '../Assets/racing_map.png';
// import GMap from './GMap';

// const libraries = ['places'];



// const RacingMap = () => {
//   const [mapType, setMapType] = useState('google'); // Default to racing map

//   const handleMapChange = (event) => {
//     setMapType(event.target.value);
//   };

//   const racingMap = (
//     <div className=''>
//       <img
//         alt="Mask group"
//         src="https://c.animaapp.com/IFYG8yp8/img/mask-group.png"
//         width={1399}
//         height={1042}
//       />
//       <div />
//       <img
//         alt="Group"
//         src={racingmap}
//         width={1399}
//         height={700}
//       />
//     </div>
//   );


//   const selectedMap = mapType === 'racing' ? racingMap : <GMap/>;

//   return (
//     <div className='flex-col w-4/5 ml-10 h-full'>
//       <select
//         className=''
//         style={{ color: "#000" }}
//         value={mapType}
//         onChange={handleMapChange}
//       >
//         <option value="racing">Racing Map</option>
//         <option value="google">Google Map</option>
//       </select>
//       {selectedMap}
//     </div>
//   );
// };

// export default RacingMap;

import React, { useState, useEffect, useRef } from 'react';
import racingmap from '../Assets/racing_map.png';
import * as d3 from 'd3';
import GMap from './GMap';
import sampleJSON from '../Static/coordinates.json';

const RacingMap = () => {
  const [mapType, setMapType] = useState('racing');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sampleGeoJSON, setSampleGeoJSON] = useState(null);
  const carRef = useRef(null);
  const pathRef = useRef(null);
  const geoJSONData = sampleJSON.features;

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
  }, [currentIndex]);

  const handleMapChange = (event) => {
    setMapType(event.target.value);
  };

  const drawPathAndAnimateCar = () => {
    const svg = d3.select(carRef.current);
    const path = d3.select(pathRef.current);

    const geoData = geoJSONData.slice(0, currentIndex + 1);

    const projection = d3.geoMercator()
      .fitSize([700, 700], { type: "FeatureCollection", features: geoData })// Rotate left by 90 degrees

    const pathGenerator = d3.geoPath().projection(projection);

    path.datum({ type: "FeatureCollection", features: geoData })
      .attr('d', pathGenerator)
      .attr('stroke', 'white')
      .attr('stroke-width', 3)
      .attr('fill', 'none');

    // Animate the car along the path
    svg.selectAll('.car')
      .data([geoData[geoData.length - 1]])
      .join('circle')
      .attr('class', 'car')
      .attr('cx', d => projection(d.geometry.coordinates)[0])
      .attr('cy', d => projection(d.geometry.coordinates)[1])
      .attr('r', 10)
      .attr('fill', 'red')
      .transition()
      .duration(10000) // Adjust duration as needed for animation speed
      .ease(d3.easeLinear)
      .attrTween('transform', translateAlongPath(path.node()))
      .on('end', () => {
        // Restart animation when it ends
        drawPathAndAnimateCar();
      });
  };

  // Function to animate the car along the path
  const translateAlongPath = (path) => {
    const length = path.getTotalLength();
    return (d, i, a) => (t) => {
      const point = path.getPointAtLength(t * length);
      return `translate(${point.x},${point.y})`;
    };
  };

  const racingMap = (
    <div className='relative'>
      <svg ref={carRef} width={700} height={700} style={{ position: 'relative' }}>
        <path ref={pathRef} />
      </svg>
    </div>
  );

  const selectedMap = mapType === 'racing' ? racingMap : <GMap />;

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

