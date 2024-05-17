import React, { useEffect, useState } from 'react';
import yellow from '../Assets/Track-Flag-yellow.png';
import red from '../Assets/track-flag-red.png';
import green from '../Assets/Track Flag green.png';
import purple from '../Assets/Track Flag Purple.png';
import blue from '../Assets/Track Flag blue.png';
import orange from '../Assets/Track Flag orange.png';
import grey from '../Assets/track-flag-grey.png';

const FlagData = () => {
    const [trackflag,setTrackFlag] = useState(red);
    const [msg,setMsg] = useState("No team can race");
    const [vehicleflag,setVehicleFlag] = useState(purple);
    const [intervalId, setIntervalId] = useState(null);
  const Track_Flag_List = [
    {
        flag:green,
        msg: 'Full speed mode'
    },
    {
        flag:yellow,
        msg:'Low speed mode'
    },
    {
        flag:red,
        msg:'No team can race'
    }
    
  ];
  const Vehicle_Flag_List = [
    purple,yellow,blue,orange,grey
  ];
  useEffect(() => {
    let index1 = 0;
    let index2=0
    const changeTrackFlag = () => {
      const { flag, msg } = Track_Flag_List[index1];
      setTrackFlag(flag);
      setMsg(msg);
      index1 = (index1 + 1) % Track_Flag_List.length;
    };

    const changeVehicleFlag = () => {
      setVehicleFlag(Vehicle_Flag_List[index2]);
      index2 = (index2 + 1) % Vehicle_Flag_List.length;
    };

    const intervalIdTrack = setInterval(changeTrackFlag, 5000); // Change track flag every 5 seconds
    const intervalIdVehicle = setInterval(changeVehicleFlag, 3000); // Change vehicle flag every 3 seconds

    return () => {
      clearInterval(intervalIdTrack);
      clearInterval(intervalIdVehicle);
    };
  }, []);

  return (
    <div className='flex-col'>
        <div className='flex my-4'>
            <img src={trackflag} alt="Track Flag" width={70} height={70}/>
            <div className='flex-col p-4'>
                <p className='flex justify-start'>Track Flag</p>
                <p className='flex justify-start'>:{msg}</p>
            </div>
        </div>
        <div className='flex my-4'>
            <img src={vehicleflag} alt="Vehicle Flag" width={70} height={70} />
            <div className='flex-col p-4'>
                <p className='flex justify-start'>Vehicle Flag</p>
            </div>
        </div>
    </div>
  )
}

export default FlagData;