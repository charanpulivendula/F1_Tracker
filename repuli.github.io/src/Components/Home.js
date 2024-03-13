import  Button  from "./Button";
import FinalDescription from "./FinalDescription";
import IndyChallenge from "./IndyChallenge";
import NavBar from "./NavBar";
import { RacingInfo } from "./RacingInfo";
import SimRace from "./SimRace";

const Home = ()=>{
    return (
        <div className="xl:flex-col flex-row">
            <RacingInfo/>
            <IndyChallenge/>
            <SimRace/>
            <FinalDescription/>
        </div>
    );
}

export default Home;
