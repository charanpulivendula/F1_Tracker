import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { io } from 'socket.io-client';

const ErrorTracker = () => {
  const [errors, setErrors] = useState([0, 0, 0]); // headingError, crossTrackError, velocityError
  const svgRef = useRef();

  useEffect(() => {
    const ErrorSocket = io(process.env.REACT_APP_SERVER_URL);

    ErrorSocket.on('connect', () => {
      console.log('Error Tracker Connected to server');
    });

    ErrorSocket.on('disconnect', () => {
      console.log('Error Tracker Disconnected from server');
    });

    ErrorSocket.on('errors', (string) => {
      const data = JSON.parse(string);
      setErrors((prevErrors) => {
        return [
          data.headingError !== null ? data.headingError : prevErrors[0],
          data.crossTrackError !== null ? data.crossTrackError : prevErrors[1],
          data.velocityError !== null ? data.velocityError : prevErrors[2],
        ];
      });
    });
    return () => {
      ErrorSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    // Clear previous SVG
    d3.select(svgRef.current).selectAll('*').remove();

    const width = 320;
    const height = 160;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width/4}, ${height/2})`);

    // Draw arcs rotated 90 degrees to the left
    const arcGenerator = d3.arc()
      .innerRadius((d, i) => 10 * i)
      .outerRadius((d, i) => 10 * (i + 1))
      .startAngle(-Math.PI)
      .endAngle(Math.PI);

    const arcs = [1, 2, 3, 4, 5];

    svg.selectAll('path')
      .data(arcs)
      .enter()
      .append('path')
      .attr('d', arcGenerator)
      .attr('fill', 'none')
      .attr('stroke', 'white')
      .attr('stroke-width', d => d / 4);

    svg.append('line')
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('y1', -60)
      .attr('y2', 0)
      .attr('stroke', 'gray')
      .attr('stroke-width', 1);
    svg.append('line')
      .attr('x1', 0)
      .attr('x2', 60)
      .attr('y1', 0)
      .attr('y2', 0)
      .attr('stroke', 'gray')
      .attr('stroke-width', 1);
    svg.append('line')
      .attr('x1', 0)
      .attr('x2', -60)
      .attr('y1', 0)
      .attr('y2', 0)
      .attr('stroke', 'gray')
      .attr('stroke-width', 1);
    svg.append('line')
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('y1', 60)
      .attr('y2', 0)
      .attr('stroke', 'gray')
      .attr('stroke-width', 1);

    svg.append('text')
      .attr('x', 0)
      .attr('y', -65)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .text('Goal');

    svg.append('text')
      .attr('x', 65)
      .attr('y', -5)
      .attr('text-anchor', 'start')
      .attr('fill', 'white')
      .text('Race Line');

    // Add marker
    svg.append('circle')
      .attr('cx', errors[1]*2)
      .attr('cy', -(errors[2] * 2))
      .attr('r', 4)
      .attr('fill', 'red');
      console.log(errors[1]);

  }, [errors]);

  return (
    <div className=''>
      <div className='heading text-left'>
        ERROR TRACKER
      </div>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default ErrorTracker;
