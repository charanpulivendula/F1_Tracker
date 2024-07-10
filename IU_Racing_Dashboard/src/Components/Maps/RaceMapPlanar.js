import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import monza_race_json from '../../Static/monza_race.json';
import Zoom_Animation from './Zoom_Animation';

const RaceMapPlanar = () => {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const monza_race = useRef(monza_race_json);
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
      const xScale = d3.scaleLinear().domain([min_x-50, max_x+50]).range([550, 0]);
      const yScale = d3.scaleLinear().domain([min_y-50, max_y+50]).range([350, 0]);
      const pathGenerator = d3.line()
                              .x(d => xScale(d.x))
                              .y(d => yScale(d.y))
                              .curve(d3.curveLinear);
      path.datum(monza_race.current)
          .attr('d', pathGenerator)
          .attr('stroke', '#B0B0B0')
          .attr('stroke-width', 5)
          .attr('fill', 'none');
    };

    drawPath();
  }, [min_x, max_x, min_y, max_y]);

  return (
    <div className='relative'>
      <div className='my-12'>
        <Zoom_Animation/>
      </div>
      <svg ref={svgRef} width={550} height={350} style={{ position: 'relative' }}>
        <path ref={pathRef} />
      </svg>
    </div>
  );
}

export default RaceMapPlanar;
