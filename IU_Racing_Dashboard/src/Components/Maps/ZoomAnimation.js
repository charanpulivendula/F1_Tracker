import React, { useRef, useEffect, useState } from "react";
import * as d3 from 'd3';
import monza_boundaries_json from '../../Static/monza_boundaries.json';
import monza_race_json from '../../Static/monza_race.json';
import SimpleDeque from './SimpleDequeue'

const Zoom_Animation = () => {
    const svgRef = useRef(null);
    const monza_boundaries = useRef(monza_boundaries_json);
    const monza_race = useRef(monza_race_json);
    const [pointPosition, setPointPosition] = useState({ x: 0, y: 0 });
    const [currentIndex, setCurrentIndex] = useState(0);
    const [boundaries, setBoundaries] = useState({
        topLeft: { x: 0, y: 0 },
        topRight: { x: 0, y: 0 },
        bottomLeft: { x: 0, y: 0 },
        bottomRight: { x: 0, y: 0 }
    });
    const track_width = 10;

    const width = 550;
    const height = 350;
    const padding = 24;
    const pointRadius = 10;
    const offset = 15;
    const centerX = width / 2;
    const centerY = height / 2;

    var innerTrack = []
    var outerTrack = []
    var racepath = []

    monza_boundaries.current.forEach(element => {
        innerTrack.push([-element.inner_x,-element.inner_y])
        outerTrack.push([-element.outer_x,-element.outer_y])
    });

    monza_race.current.forEach(element => {
        racepath.push([-element.x,-element.y])
    });

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

        svg.append('circle')
            .attr('cx', centerX)
            .attr('cy', centerY)
            .attr('r', 15)
            .attr('fill', '#F20000')
            .attr('stroke', 'black')
            .attr('stroke-width', 2)
            

        const intervalId = setInterval(() => {
            const index = (currentIndex) % racepath.length;
            const [x, y] = racepath[index];
            
            
            setPointPosition({ x, y });
            setCurrentIndex(prevIndex => (prevIndex + 1) % racepath.length);

            setBoundaries({
                topLeft: { x: x - offset, y: y - offset },
                topRight: { x: x + offset, y: y - offset },
                bottomLeft: { x: x - offset, y: y + offset },
                bottomRight: { x: x + offset, y: y + offset }
            });
        }, 50);
        // Define gradient
        const gradient = svg.append("defs")
            .append("linearGradient")
            .attr("id", "stroke-gradient")
            .attr("x1", "0%")
            .attr("x2", "100%")
            .attr("y1", "0%")
            .attr("y2", "0%");

        gradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "B0B0B0");
        gradient.append("stop")
            .attr("offset", "25%")
            .attr("stop-color", "white");
        gradient.append("stop")
            .attr("offset", "75%")
            .attr("stop-color", "white");
        gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "B0B0B0");

        return () => clearInterval(intervalId);
    }, [pointPosition,currentIndex,boundaries]);

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("path").remove();

        const drawTrackSegment = (track, color) => {
            let path_width = track_width;
            let path_breaker = false;
            let linear_gradient = null;
            if(color === '#F20000'){
                path_width = track_width/2;
                path_breaker = true;
            }
            else{
                linear_gradient = "url(#stroke-gradient)"
            }
            if (!Array.isArray(track) || track.length === 0) return;
            let trackDequeue  = updateTrackDequeue(track, boundaries,path_breaker).toArray();
            let track_length = 0;
            if(path_breaker){
                for(let point of trackDequeue){
                    track_length++;
                    if(point[0]===pointPosition.x && point[1]===pointPosition.y){
                        break;
                    }  
                }
                trackDequeue = trackDequeue.slice(0,track_length);
            }
            svg.append('path')
                .attr('d', lineGenerator(trackDequeue))
                .attr('fill', 'none')
                .attr('stroke', linear_gradient?linear_gradient:color)
                .attr('stroke-width', path_width)
                .attr('z-index',-1);
        };

        drawTrackSegment(innerTrack, 'white');
        drawTrackSegment(outerTrack, 'white');
        drawTrackSegment(racepath, '#F20000');

        function updateTrackDequeue(trackData,newBoundaries){
            const dequeue = new SimpleDeque();
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
        </div>
    );
}

export default Zoom_Animation;
