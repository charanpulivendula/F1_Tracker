import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import monza_race_json from '../../Static/monza_race.json';
import kentucky_race_json from '../../Static/Kentucky_RaceLine.json';
import ZoomAnimation from './ZoomAnimation';
import startImage from '../../Assets/start.png';
import startDir from '../../Assets/start_dir.png';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';

const RaceMapPlanar = () => {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const [carPosition, setCarPosition] = useState(null);
  const [raceTrack, setRaceTrack] = useState([]);
  const [bounds, setBounds] = useState({ minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity });
  const mapType = useSelector(state => state.map.mapType);

  useEffect(() => {
    // Update raceTrack based on mapType
    const track = mapType === "Monza" ? monza_race_json : kentucky_race_json;
    setRaceTrack(track);
  }, [mapType]);

  useEffect(() => {
    // Calculate bounds whenever raceTrack is updated
    if (raceTrack.length > 0) {
      let min_x = Infinity, max_x = -Infinity, min_y = Infinity, max_y = -Infinity;
      raceTrack.forEach(element => {
        min_x = Math.min(element.x, min_x);
        max_x = Math.max(element.x, max_x);
        min_y = Math.min(element.y, min_y);
        max_y = Math.max(element.y, max_y);
      });
      setBounds({ minX: min_x, maxX: max_x, minY: min_y, maxY: max_y });
    }
  }, [raceTrack]);

  useEffect(() => {
    if (raceTrack.length === 0) return; // Exit if no data

    const drawPath = () => {
      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove(); // Clear previous elements

      const path = d3.select(svgRef.current).append('path');
      const xScale = d3.scaleLinear().domain([bounds.minX - 50, bounds.maxX + 50]).range([550, 0]);
      const yScale = d3.scaleLinear().domain([bounds.minY - 50, bounds.maxY + 50]).range([350, 0]);
      const pathGenerator = d3.line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y))
        .curve(d3.curveLinear);

      path.datum(raceTrack)
        .attr('d', pathGenerator)
        .attr('stroke', '#B0B0B0')
        .attr('stroke-width', 5)
        .attr('fill', 'none');

      // Add start image
      const startPoint = raceTrack[0];
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
  }, [raceTrack, bounds]);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_SERVER_URL);

    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    socket.on('location', (data) => {
      try {
        const { x, y } = JSON.parse(data);
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
    setCarPosition({ x, y });
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
