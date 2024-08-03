import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ErrorTracker = () => {
  const svgRef = useRef();

  useEffect(() => {
    // Clear previous SVG
    d3.select(svgRef.current).selectAll("*").remove();

    const width = 300;
    const height = 125;

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width/3}, ${height})`);

    // Draw arcs rotated 90 degrees to the left
    const arcGenerator = d3.arc()
      .innerRadius((d, i) => 10 * i)
      .outerRadius((d, i) => 10 * (i + 1))
      .startAngle(-Math.PI / 2)
      .endAngle(Math.PI / 2);

    const arcs = [1, 2, 3, 4, 5,6,7,8,9];
    
    svg.selectAll('path')
      .data(arcs)
      .enter()
      .append('path')
      .attr('d', arcGenerator)
      .attr('fill', 'none')
      .attr('stroke', 'white')
      .attr('stroke-width', d => d/4)
    //   .attr('transform', 'rotate(90)');

    svg.append('line')
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('y1', -100)
      .attr('y2', 0)
      .attr('stroke', 'gray')
      .attr('stroke-width', 1);

    svg.append('text')
      .attr('x', 0)
      .attr('y', -110)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .text('Goal');

    svg.append('text')
      .attr('x', 110)
      .attr('y', -5)
      .attr('text-anchor', 'start')
      .attr('fill', 'white')
      .text('Race Line');

    // Add marker
    svg.append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 10)
      .attr('fill', 'red');


    // Add text label for meter
    svg.append('text')
      .attr('x', 0)
      .attr('y', 300)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .text('Meter');

  }, []);

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
