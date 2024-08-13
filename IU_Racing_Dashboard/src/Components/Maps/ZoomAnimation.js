import React, { useRef, useEffect, useState } from "react";
import * as d3 from 'd3';
import monza_boundaries_json from '../../Static/monza_boundaries.json';
import monza_race_json from '../../Static/monza_race.json';
import kentucky_race_json from '../../Static/Kentucky_RaceLine.json';
import Kentucky_boundaries_json from '../../Static/Kentucky_Boundaries.json';
import kentucky_pit_lane from '../../Static/kentucky_pit_lane.json';
import SimpleDeque from './SimpleDequeue';
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const ZoomAnimation = () => {
    const ZOOM = 20;  // zoom in '+' //Zoom out '-'
    const mapDictionary = {
        Monza: [monza_race_json, monza_boundaries_json, []],
        KY: [kentucky_race_json, Kentucky_boundaries_json, kentucky_pit_lane],
        IN: []
    };

    const svgRef = useRef(null);
    const mapType = useSelector(state => state.map.mapType);
    const carPosition = useSelector(state => state.location_points.carPosition);
    const [trackLineJson, setTrackLineJson] = useState(null);
    const [trackBoundaries, setTrackBoundaries] = useState(null);
    const [pitLane, setPitLane] = useState([]);
    const [trajectory,setTrajectory] = useState([]);
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
    const centerX = width / 2;
    const centerY = height / 2;

    const innerTrack = useRef([]);
    const outerTrack = useRef([]);
    const racePath = useRef([]);
    const pitLanePath = useRef([]);
    const raceline = useRef([]);
    useEffect(() => {
        const socket = io(process.env.REACT_APP_SERVER_URL);
    
        socket.on('connect', () => {
          console.log('Trajectory Socket connected');
        });
    
        socket.on('disconnect', () => {
          console.log('Trajectory Socket disconnected');
        });
    
        socket.on('trajectory', (data) => {
          try {
            const trajectory_array = data.trajectory;
            setTrajectory(trajectory_array);
            console.log(trajectory);
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
    useEffect(() => {
        // Load and set track data based on mapType
        if (mapDictionary[mapType]) {
            const [raceData, boundaryData, pitData] = mapDictionary[mapType];
            setTrackLineJson(raceData);
            setTrackBoundaries(boundaryData);
            setPitLane(pitData);
        }
    }, [mapType]);

    useEffect(() => {
        if (trackBoundaries && trackLineJson) {
            innerTrack.current = trackBoundaries.map(element => [element.inner_x, element.inner_y]);
            outerTrack.current = trackBoundaries.map(element => [element.outer_x, element.outer_y]);
            racePath.current = trackLineJson.map(element => [element.x, element.y]);
            pitLanePath.current = pitLane.map(element => [element.x, element.y]);
        }
    }, [trackBoundaries, trackLineJson, pitLane]);

    const xDomain = [boundaries.topLeft.x, boundaries.bottomRight.x];
    const yDomain = [boundaries.topLeft.y, boundaries.bottomRight.y];

    const xScale = d3.scaleLinear()
        .domain(xDomain)
        .range([padding, width - padding]);

    const yScale = d3.scaleLinear()
        .domain(yDomain)
        .range([height - padding, padding]);

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

        // Update boundaries based on car position
        setBoundaries({
            topLeft: { x: carPosition.x - ZOOM, y: carPosition.y - ZOOM },
            topRight: { x: carPosition.x + ZOOM, y: carPosition.y - ZOOM },
            bottomLeft: { x: carPosition.x - ZOOM, y: carPosition.y + ZOOM },
            bottomRight: { x: carPosition.x + ZOOM, y: carPosition.y + ZOOM }
        });
        
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
            .attr("stop-color", "#B0B0B0");
        gradient.append("stop")
            .attr("offset", "25%")
            .attr("stop-color", "white");
        gradient.append("stop")
            .attr("offset", "75%")
            .attr("stop-color", "white");
        gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "#B0B0B0");

    }, [carPosition, centerX, centerY]);

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("path").remove();

        const drawTrackSegment = (track, color, pathWidth) => {
            if (!Array.isArray(track) || track.length === 0) return;

            let trackDequeue = updateTrackDequeue(track, boundaries).toArray();
            svg.append('path')
                .attr('d', lineGenerator(trackDequeue))
                .attr('fill', 'none')
                .attr('stroke', color)
                .attr('stroke-width', pathWidth)
                .attr('z-index', -1);
        };

        drawTrackSegment(innerTrack.current, 'white', trackWidth);
        drawTrackSegment(outerTrack.current, 'white', trackWidth);
        
        drawTrackSegment(pitLanePath.current, '#FFFFFF', 3); // Pit lane with different color and width
        updateRaceline(carPosition, boundaries);
        drawTrackSegment(raceline.current, '#F20000', trackWidth / 2);

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
        function updateRaceline({x,y},newBoundaries){
            const dequeue = [];
            for (let point of raceline.current) {
                if (isPointInBounds(point, newBoundaries)) {
                    dequeue.push(point);
                } else if (dequeue.length != 0) {
                    break;
                }
            }
            raceline.current = [...dequeue,[x,y]];
        }

    }, [boundaries, carPosition, lineGenerator]);

    return (
        <div>
            <svg ref={svgRef} width={width} height={height}></svg>
        </div>
    );
}

export default ZoomAnimation;
