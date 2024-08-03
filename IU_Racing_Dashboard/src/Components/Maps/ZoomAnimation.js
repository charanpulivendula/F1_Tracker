import React, { useRef, useEffect, useState } from "react";
import * as d3 from 'd3';
import monza_boundaries_json from '../../Static/monza_boundaries.json';
import monza_race_json from '../../Static/monza_race.json';
import kentucky_race_json from '../../Static/Kentucky_RaceLine.json';
import Kentucky_boundaries_json from '../../Static/Kentucky_Boundaries.json';
import SimpleDeque from './SimpleDequeue';
import { useSelector } from "react-redux";

const ZoomAnimation = () => {
    const mapDictionary = {
        Monza: [monza_race_json, monza_boundaries_json],
        KY: [kentucky_race_json, Kentucky_boundaries_json]
    };

    const svgRef = useRef(null);
    const mapType = useSelector(state => state.map.mapType);
    const [trackLineJson, setTrackLineJson] = useState(null);
    const [trackBoundaries, setTrackBoundaries] = useState(null);
    const [pointPosition, setPointPosition] = useState({ x: 0, y: 0 });
    const [currentIndex, setCurrentIndex] = useState(0);
    const [boundaries, setBoundaries] = useState({
        topLeft: { x: 0, y: 0 },
        topRight: { x: 0, y: 0 },
        bottomLeft: { x: 0, y: 0 },
        bottomRight: { x: 0, y: 0 }
    });

    const trackWidth = 10;
    const width = 550;
    const height = 350;
    const padding = 24;
    const zoom = 20;  // zooming is reverse
    const centerX = width / 2;
    const centerY = height / 2;

    const innerTrack = useRef([]);
    const outerTrack = useRef([]);
    const racePath = useRef([]);

    useEffect(() => {
        // Load and set track data based on mapType
        if (mapDictionary[mapType]) {
            const [raceData, boundaryData] = mapDictionary[mapType];
            setTrackLineJson(raceData);
            setTrackBoundaries(boundaryData);
        }
    }, [mapType, mapDictionary]);

    useEffect(() => {
        if (trackBoundaries && trackLineJson) {
            innerTrack.current = trackBoundaries.map(element => [-element.inner_x, -element.inner_y]);
            outerTrack.current = trackBoundaries.map(element => [-element.outer_x, -element.outer_y]);
            racePath.current = trackLineJson.map(element => [-element.x, -element.y]);
        }
    }, [trackBoundaries, trackLineJson]);

    const xDomain = [boundaries.topLeft.x, boundaries.bottomRight.x];
    const yDomain = [boundaries.topLeft.y, boundaries.bottomRight.y];

    const xScale = d3.scaleLinear()
        .domain(xDomain)
        .range([padding, width - padding]);

    const yScale = d3.scaleLinear()
        .domain(yDomain)
        .range([padding, height - padding]);

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
            .attr('stroke-width', 2);

        const intervalId = setInterval(() => {
            const index = (currentIndex) % racePath.current.length;
            const [x, y] = racePath.current[index];

            setPointPosition({ x, y });
            setCurrentIndex(prevIndex => (prevIndex + 1) % racePath.current.length);

            setBoundaries({
                topLeft: { x: x - zoom, y: y - zoom },
                topRight: { x: x + zoom, y: y - zoom },
                bottomLeft: { x: x - zoom, y: y + zoom },
                bottomRight: { x: x + zoom, y: y + zoom }
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
    }, [pointPosition, currentIndex, centerX, centerY, boundaries]);

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("path").remove();

        const drawTrackSegment = (track, color) => {
            const pathWidth = color === '#F20000' ? trackWidth / 2 : trackWidth;
            const pathBreaker = color === '#F20000';
            const linearGradient = color === '#F20000' ? null : "url(#stroke-gradient)";

            if (!Array.isArray(track) || track.length === 0) return;
            
            let trackDequeue = updateTrackDequeue(track, boundaries).toArray();
            let trackLength = 0;

            if (pathBreaker) {
                for (let point of trackDequeue) {
                    trackLength++;
                    if (point[0] === pointPosition.x && point[1] === pointPosition.y) {
                        break;
                    }
                }
                trackDequeue = trackDequeue.slice(0, trackLength);
            }

            svg.append('path')
                .attr('d', lineGenerator(trackDequeue))
                .attr('fill', 'none')
                .attr('stroke', linearGradient || color)
                .attr('stroke-width', pathWidth)
                .attr('z-index', -1);
        };

        drawTrackSegment(innerTrack.current, 'white');
        drawTrackSegment(outerTrack.current, 'white');
        drawTrackSegment(racePath.current, '#F20000');

        function updateTrackDequeue(trackData, newBoundaries) {
            const dequeue = new SimpleDeque();
            for (let point of trackData) {
                if (isPointInBounds(point, newBoundaries)) {
                    dequeue.pushBack(point);
                } else if (!dequeue.isEmpty()) {
                    break;
                }
            }
            return dequeue;
        }

    }, [boundaries, pointPosition, lineGenerator]);

    return (
        <div>
            <svg ref={svgRef} width={width} height={height}></svg>
        </div>
    );
}

export default ZoomAnimation;
