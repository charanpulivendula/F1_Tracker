import React from "react";
import profile from '../Assets/profile.png'
import Luddy from '../Assets/Luddy.png';

const LeadCard = ({ name , team, major, imageUrl }) => {
  return (
    <div className="flex place-content-center w-full sm:w-1/2 md:w-1/4 xl:w-1/4 xl:w-1/4 p-4">
      <div className="rounded-lg overflow-hidden shadow-md">
        <div
          className=" center flex  h-52  bg-cover bg-center"
          style={{ backgroundImage: `url(${profile})`  }}
        >
            <img className="profile_img" src={Luddy} alt={profile}/>
        </div>
        <div className="p-4">
        <h2 className="text-3xl font-semibold mb-2">{name}</h2>
          <h2 className="text-lg font-semibold mb-2">{team}</h2>
          <p className="text-sm text-gray-400">{major}</p>
        </div>
      </div>
    </div>
  );
};

export default LeadCard;