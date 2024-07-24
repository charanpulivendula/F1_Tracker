import logo from '../../Assets/Logo.png';
import Weather from '../../Assets/Weather.png';
import { useState,useEffect } from 'react';
import 'react-clock/dist/Clock.css';
import Clock from 'react-live-clock';


const Live = ()=>{
    const [temp, setTemp] = useState(null);
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        const fetchWeatherData = () => {
          fetch('https://api.openweathermap.org/data/2.5/weather?zip=41086,us&appid=f41f715c9dff38117523dc1f3389c3bc&units=metric')
            .then(response => response.json())
            .then(data => {
              setTemp(data.main.temp);
            })
            .catch(error => console.error(error));
        };
    
        // Fetch initial weather data
        fetchWeatherData();
    
        // Set up interval to fetch weather data every 60 seconds
        const id = setInterval(fetchWeatherData, 60000);
        setIntervalId(id);
    
        // Clean up the interval on component unmount
        return () => clearInterval(id);
      }, []);
    return (
        <div className='flex flex-col'>
            <img
            className="flex mx-[35%]"
            alt="Vector"
            src={logo}
            height={80}
            width={65}
            />
            <div className="flex-col mt-1 w-[300px]">
                <div className="  font-bold text-white text-[24px] tracking-[0] leading-[normal]">
                    LUDDY
                </div>
                {/* <div className='flex justify-center'>
                    <img
                            className=""
                            alt="Weather"
                            width={50}
                            height={50}
                            src={Weather}
                        />
                    <div className="text number [font-family:'Michroma',Helvetica] font-normal text-[#b0b0b0] text-[20px]  tracking-[0] leading-[normal]">
                        {temp} ºC
                    </div>
                </div> */}
                
                {/* <p className="text flex justify-center [font-family:'Michroma',Helvetica] font-normal text-white text-[36px]  tracking-[0] leading-[normal]">
                    <Clock format="HH:mm:ss" interval={1000} className='number' ticking={true} />
                </p> */}
                <p className="text flex justify-center font-normal text-white text-[36px] leading-normal">
                    <Clock format="HH:mm:ss" interval={1000} className='number' ticking={true} />
                </p>

                
                <div className=" ">
                    <div className=" ">
                    <div className=" bg-[#ffa96c] rounded-[17px]" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Live;