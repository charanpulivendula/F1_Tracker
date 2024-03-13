import React from "react";
import profile from '../Assets/profile.png'
import Luddy from '../Assets/Luddy.png';

const MemberCard = ({ name , team, major, imageUrl }) => {
  const image = imageUrl || profile;
  return (
    <div className="max-sm:flex xl:justify-center xl:items-center xl:p-5 max-sm:place-content-start sm:w-1/2 md:w-1/4 xl:w-1/4 xl:w-1/4 max-sm:mt-5 max-sm:mb-5 max-sm:pl-5 max-sm:pr-5">
      {/* <div className="max-sm:flex max-sm:w-full xl:justify-center bg-red-200 rounded-lg overflow-hidden shadow-md max-sm:space-x-10"> */}
        <div className="xl:flex xl:flex-row max-sm:w-36 max-sm:h-36 xl:h-36 xl:justify-center xl:w-full" alt="">
            <img className="xl:h-40 xl:w-40 profile_img rounded-full object-cover object-fit" src={image} and {...profile} alt={profile}/>
        </div>
        <div className="xl:p-4 max-sm:p-3  max-sm:w-3/4 flex flex-col justify-center xl:items-center">
          <h2 className="xl:text-3xl max-sm:text-xl font-semibold mb-2 max-sm:text-center">{name}</h2>
          <h2 className="xl:text-lg max-sm:text-md font-semibold max-sm:text-center mb-2">{team}</h2>
          <h2 className="text-sm max-sm:text-center">{major}</h2>
        </div>
      {/* </div> */}
    </div>
  );
};

export default MemberCard;
