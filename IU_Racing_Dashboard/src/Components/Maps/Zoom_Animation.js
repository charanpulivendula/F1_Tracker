import React, { useRef, useEffect, useState } from "react";
import * as d3 from 'd3';
import innerTrackData from '../../Static/inner.json';
import outerTrackData from '../../Static/outer.json';
import racepathData from '../../Static/racepath.json';
import SimpleDeque from './SimpleDequeue';

const Zoom_Animation = () => {
    const [racePathDequeue, setRacePathDequeue] = useState(new SimpleDeque());
    const [innerTrackDequeue, setInnerTrackDequeue] = useState(new SimpleDeque());
    const [outerTrackDequeue, setOuterTrackDequeue] = useState(new SimpleDeque());
    const svgRef = useRef(null);
    const [pointPosition, setPointPosition] = useState({ x: 0, y: 0 });
    const [currentIndex, setCurrentIndex] = useState(0);
    const [boundaries, setBoundaries] = useState({
        topLeft: { x: 0, y: 0 },
        topRight: { x: 100, y: 0 },
        bottomLeft: { x: 0, y: 100 },
        bottomRight: { x: 100, y: 100 }
    });

    const width = 516;
    const height = 350;
    const padding = 24;
    const pointRadius = 5;
    const offset = 10;
    const centerX = width / 2;
    const centerY = height / 2;

    const innerTrack = useRef(innerTrackData?.coordinates || []);
    const outerTrack = useRef(outerTrackData?.coordinates || []);
    const racepath = useRef(racepathData?.coordinates || []);

    const xDomain = [boundaries.topLeft.x, boundaries.bottomRight.x];
    const yDomain = [boundaries.topLeft.y, boundaries.bottomRight.y];

    const xScale = d3.scaleLinear()
            .domain(xDomain)
            .range([padding, width - padding]);

    const yScale = d3.scaleLinear()
        .domain(yDomain)
        .range([padding, height - padding])

    const lineGenerator = d3.line()
        .x(d => xScale(d[0]))
        .y(d => yScale(d[1]))
        .curve(d3.curveLinear);

    const isPointInBounds = (point, boundaries) => {
        return point[0] >= boundaries.topLeft.x && point[0] <= boundaries.topRight.x &&
               point[1] >= boundaries.topLeft.y && point[1] <= boundaries.bottomLeft.y;
    };

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        // Draw the bounding box
        svg.append("rect")
            .attr("x", padding)
            .attr("y", padding)
            .attr("width", width - 2 * padding)
            .attr("height", height - 2 * padding)
            .style("fill", "none")
            .style("stroke", "white")
            .style("stroke-width", 2);

        svg.append('circle')
            .attr('cx', centerX)
            .attr('cy', centerY)
            .attr('r', 10)
            .attr('fill', 'orange')
            .attr('stroke', 'black')
            .attr('stroke-width', 2);

        const point = svg.append('circle')
            .attr('r', pointRadius)
            .attr('fill', 'yellow');

        const intervalId = setInterval(() => {
            const index = (currentIndex) % racepath.current.length;
            const [x, y] = racepath.current[index];
            
            
            setPointPosition({ x, y });
            setCurrentIndex(prevIndex => (prevIndex + 1) % racepath.current.length);

            setBoundaries({
                topLeft: { x: x - offset, y: y - offset },
                topRight: { x: x + offset, y: y - offset },
                bottomLeft: { x: x - offset, y: y + offset },
                bottomRight: { x: x + offset, y: y + offset }
            });
        }, 100);

        return () => clearInterval(intervalId);
    }, [pointPosition,currentIndex,boundaries]);

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("path").remove();

        const drawTrackSegment = (track, color) => {
            if (!Array.isArray(track) || track.length === 0) return;
            const trackDequeue  = updateTrackDequeue(track, innerTrackDequeue, boundaries);
            console.log(trackDequeue);
            svg.append('path')
                .attr('d', lineGenerator(trackDequeue.toArray()))
                .attr('fill', 'none')
                .attr('stroke', color)
                .attr('stroke-width', 2);
        };

        drawTrackSegment(innerTrack.current, 'blue');
        drawTrackSegment(outerTrack.current, 'red');
        drawTrackSegment(racepath.current, 'green');

        function updateTrackDequeue(trackData, dequeue, newBoundaries){
            dequeue.clear();
            for (let point of trackData) {
                if (isPointInBounds(point, newBoundaries)) {
                    dequeue.pushBack(point);
                } else if (!dequeue.isEmpty()) {
                    break;
                }
            }
            return dequeue;
        };

    }, [boundaries, pointPosition]);

    return (
        <div>
            <svg ref={svgRef} width={width} height={height}></svg>
            <p>Car Position: ({pointPosition.x.toFixed(2)}, {pointPosition.y.toFixed(2)})</p>
            <p>Boundaries: TL({boundaries.topLeft.x.toFixed(2)}, {boundaries.topLeft.y.toFixed(2)}), 
               BR({boundaries.bottomRight.x.toFixed(2)}, {boundaries.bottomRight.y.toFixed(2)})</p>
        </div>
    );
}

export default Zoom_Animation;
