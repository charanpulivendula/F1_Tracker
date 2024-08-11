import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import monza_race_json from '../../Static/monza_race.json';
import kentucky_race_json from '../../Static/Kentucky_RaceLine.json';
import kentucky_pit_lane from '../../Static/kentucky_pit_lane.json';
import ZoomAnimation from './ZoomAnimation';
import startImage from '../../Assets/start.png';
import startDir from '../../Assets/start_dir.png';
import { io } from 'socket.io-client';
import { useSelector,useDispatch } from 'react-redux';
import { setCarPosition } from '../../Redux/locationSlice';

const RaceMapPlanar = () => {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const pitRef = useRef(null);
  const carPosition = useSelector(state=>state.location_points.carPosition)
  const [raceTrack, setRaceTrack] = useState([]);
  const [pitLane, setPitLane] = useState([]);
  const [bounds, setBounds] = useState({ minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity });
  const mapType = useSelector(state => state.map.mapType);
  const dispatch = useDispatch();

  useEffect(() => {
    // Update raceTrack and pitLane based on mapType
    const track = mapType === "Monza" ? monza_race_json : kentucky_race_json;
    const pit = mapType === "KY" ? kentucky_pit_lane : [];
    setRaceTrack(track);
    setPitLane(pit);
  }, [mapType]);
  const startPoint = mapType === "KY" ? {x: -21.441607590624628,
    y: -42.29719179722661}:{}

  useEffect(() => {
    // Calculate bounds whenever raceTrack or pitLane is updated
    if (raceTrack.length > 0 || pitLane.length > 0) {
      let min_x = Infinity, max_x = -Infinity, min_y = Infinity, max_y = -Infinity;
      
      const updateBounds = (data) => {
        data.forEach(element => {
          min_x = Math.min(element.x, min_x);
          max_x = Math.max(element.x, max_x);
          min_y = Math.min(element.y, min_y);
          max_y = Math.max(element.y, max_y);
        });
      };

      updateBounds(raceTrack);
      updateBounds(pitLane);
      
      setBounds({ minX: min_x, maxX: max_x, minY: min_y, maxY: max_y });
    }
  }, [raceTrack, pitLane]);

  useEffect(() => {
    if (raceTrack.length === 0 && pitLane.length === 0) return; // Exit if no data

    const drawPath = () => {
      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove(); // Clear previous elements

      const xScale = d3.scaleLinear().domain([bounds.minX - 50, bounds.maxX + 50]).range([550, 0]);
      const yScale = d3.scaleLinear().domain([bounds.minY - 50, bounds.maxY + 50]).range([350,0]);
      const pathGenerator = d3.line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y))
        .curve(d3.curveLinear);

      // Draw race track
      const pathRace = d3.select(svgRef.current).append('path');
      pathRace.datum(raceTrack)
        .attr('d', pathGenerator)
        .attr('stroke', '#B0B0B0')
        .attr('stroke-width', 5)
        .attr('fill', 'none');

      // Draw pit lane
      const pathPit = d3.select(svgRef.current).append('path');
      pathPit.datum(pitLane)
        .attr('d', pathGenerator)
        .attr('stroke', '#FFFFFF') // Different color for pit lane
        .attr('stroke-width', 3)
        .attr('fill', 'none');

      // Add start image
      const startX = xScale(startPoint.x);
      const startY = yScale(startPoint.y);

      svg.append('image')
        .attr('xlink:href', startImage)
        .attr('x', startX - 15) // Adjust x to center the image
        .attr('y', startY - 15) // Adjust y to center the image
        .attr('width', 30)
        .attr('height', 30);

      svg.append('image')
        .attr('xlink:href', startDir)
        .attr('x', startX + 15) // Adjust x to center the image
        .attr('y', startY + 15) // Adjust y to center the image
        .attr('width', 50)
        .attr('height', 10);
    };

    drawPath();
  }, [raceTrack, pitLane, bounds]);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_SERVER_URL);

    socket.on('connect', () => {
      console.log('Map_Socket connected');
    });

    socket.on('disconnect', () => {
      console.log('Map_Socket disconnected');
    });

    socket.on('planningpoints', (data) => {
      try {
        const { x, y, z } = JSON.parse(data);
        if (isFinite(x) && isFinite(y)) {
          updateCarPosition(x, y);
        } else {
          console.error('Invalid x or y:', { x, y });
        }
      } catch (error) {
        console.error('Error parsing location data:', error);
      }
    });

    socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const updateCarPosition = (x, y) => {
     dispatch(setCarPosition({x,y}))
  };
  
  useEffect(() => {
    if (carPosition && bounds.minX !== Infinity) {
      const xScale = d3.scaleLinear().domain([bounds.minX - 50, bounds.maxX + 50]).range([550, 0]);
      const yScale = d3.scaleLinear().domain([bounds.minY - 50, bounds.maxY + 50]).range([350, 0]);
      const svg = d3.select(svgRef.current);
      svg.selectAll('.car')
        .data([carPosition])
        .join('circle')
        .attr('class', 'car')
        .attr('cx', d => xScale(d.x))
        .attr('cy', d => yScale(d.y))
        .attr('r', 10)
        .attr('fill', 'red')
        .transition();
    }
  }, [carPosition, bounds]);

  return (
    <div className='relative'>
      <div className='my-4 border-white border rounded-xl p-1'>
        <div className='border-white border rounded-xl'>
          <ZoomAnimation />
        </div>
      </div>
      <div className='my-4 border-white border rounded-xl p-1'>
        <div className='border-white border rounded-xl'>
          <svg ref={svgRef} width={550} height={360} style={{ position: 'relative' }}>
            <path ref={pathRef} />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default RaceMapPlanar;
