import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import monza_race_json from '../../Static/monza_race.json';
import Zoom_Animation from './Zoom_Animation';
import startImage from '../../Assets/start.png';
import startDir from '../../Assets/start_dir.png';
import { io } from 'socket.io-client';

const RaceMapPlanar = () => {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const carRef = useRef(null);
  const monza_race = useRef(monza_race_json);
  const [carPosition, setCarPosition] = useState(null);

  let max_x = -Infinity;
  let max_y = -Infinity;
  let min_x = Infinity;
  let min_y = Infinity;

  monza_race.current.forEach(element => {
    max_x = Math.max(element.x, max_x);
    max_y = Math.max(element.y, max_y);
    min_x = Math.min(element.x, min_x);
    min_y = Math.min(element.y, min_y);
  });

  useEffect(() => {
    const drawPath = () => {
      const svg = d3.select(svgRef.current);
      const path = d3.select(pathRef.current);
      const xScale = d3.scaleLinear().domain([min_x - 50, max_x + 50]).range([550, 0]);
      const yScale = d3.scaleLinear().domain([min_y - 50, max_y + 50]).range([350, 0]);
      const pathGenerator = d3.line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y))
        .curve(d3.curveLinear);

      path.datum(monza_race.current)
        .attr('d', pathGenerator)
        .attr('stroke', '#B0B0B0')
        .attr('stroke-width', 5)
        .attr('fill', 'none');

      // Add start image
      const startPoint = monza_race.current[0];
      const startX = xScale(startPoint.x);
      const startY = yScale(startPoint.y);

      svg.select('image').remove(); // Remove existing image if any
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
  }, [min_x, max_x, min_y, max_y]);

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
    if (carRef.current && carPosition) {
      const xScale = d3.scaleLinear().domain([min_x - 50, max_x + 50]).range([550, 0]);
      const yScale = d3.scaleLinear().domain([min_y - 50, max_y + 50]).range([350, 0]);

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
  }, [carPosition]);

  return (
    <div className='relative'>
      <div className='my-4'>
        <Zoom_Animation />
      </div>
      <svg ref={svgRef} width={550} height={350} style={{ position: 'relative' }}>
        <path ref={pathRef} />
      </svg>
    </div>
  );
}

export default RaceMapPlanar;
