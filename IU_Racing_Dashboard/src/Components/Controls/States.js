import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import samosa from '../../Assets/samosa.png';
import circle from '../../Assets/Circle.png';
import wrong from '../../Assets/wrong.png';
import '../../Styles/states.css';

const States = () => {
  const [sysState, setSysState] = useState(1);
  const [heartbeat, setHeartbeat] = useState(wrong);
  const [ctState, setCtState] = useState(8);

  const CTStateMap = new Map([
    [1, 'Computer is on'],
    [2, 'After car engine is on'],
    [3, 'Team state updated by car state'],
    [4, 'Team state updated by car state'],
    [5, 'Team state updated by car state'],
    [6, 'Team state updated by car state'],
    [7, 'Initiate driving'],
    [8, 'Caution: Ready to Drive'],
    [9, 'Normal racing'],
    [10, 'Requested stop'],
    [11, 'Race control request central shutdown'],
    [12, 'Race control request shutdown shutdown'],
    [255, 'Default']
  ]);

  const SysStateMap = new Map([
    [1, 'Power on'],
    [2, 'Subsystem control'],
    [3, 'Actuator testing'],
    [4, 'Actuator test done (engine ready)'],
    [5, 'Crank ready'],
    [6, 'Pre-crank check'],
    [7, 'Cranking'],
    [8, 'Engine running'],
    [9, 'Driving'],
    [10, 'Shutdown engine'],
    [11, 'Power off'],
    [16, 'Emergency'],
    [19, 'Ignition (waiting for engine to start)'],
    [13, 'Crank check'],
    [255, 'Default'],
  ]);

  const HeartbeatMap = new Map([
    [samosa, 'Wrong estimation & localization'],
    [circle, 'Perfect condition'],
    [wrong, 'All estimation, location, localization are wrong']
  ]);

  const HeartbeatImages = new Map([
    ['samosa',samosa],
    ['wrong',wrong],
    ['circle',circle]
  ])

  useEffect(() => {
    const stateSocket = io(process.env.REACT_APP_SERVER_URL);

    stateSocket.on('connect', () => {
      console.log('states Connected to server');
    });

    stateSocket.on('disconnect', () => {
      console.log('states Disconnected from server');
    });

    stateSocket.on('sys_state', (data) => {
      setSysState(data);
    });

    stateSocket.on('heartbeat', (data) => {
      setHeartbeat(HeartbeatImages.get(data) || wrong);
    });

    stateSocket.on('ct_state', (data) => {
      setCtState(data);
    });

    return () => {
      stateSocket.disconnect();
    };
  }, []);

  return (
    <div className='flex-col'>
      <div className=''>
        <div className='flex justify-start'>
          CT state
        </div>
        <div className='flex place-items-center justify-center space-x-2 p-1'>
          <div className='state-box number font-bold text-[24px]'>
            {ctState}
          </div>
          <div className='state-info-box text'>
            {CTStateMap.get(ctState) || 'Unknown CTState'}
          </div>
        </div>
      </div>
      <div className=''>
        <div className='flex justify-start'>
          Heartbeat
        </div>
        <div className='flex place-items-center justify-center space-x-2 p-1'>
          <div className='state-box number'>
            <img src={heartbeat} alt='' width={30} height={30} />
          </div>
          <div className='state-info-box text'>
            {HeartbeatMap.get(heartbeat) || 'Unknown'}
          </div>
        </div>
      </div>
      <div className=''>
        <div className='flex justify-start'>
          System
        </div>
        <div className='flex place-items-center justify-center space-x-2 p-1'>
          <div className='state-box number font-bold text-[24px]'>
            {sysState}
          </div>
          <div className='state-info-box text'>
            {SysStateMap.get(sysState) || 'Unknown SysState'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default States;
