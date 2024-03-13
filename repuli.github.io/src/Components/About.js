import team_picture from '../Assets/team_picture.png';
import './About.css'
import Mission from './Mission';
import Vision from './Vision';
import Team from './Team';
import members from './Members';
import half_image from '../Assets/half_image.png';
const About = ()=>{
    return (
        <div className="xl:mt-12 max-sm:mt-20 ">
            <div className='font-bold aboutus max-sm:pl-5 max-sm:pr-5 xl:h-[32rem] bg-opacity-40 xl:flex justify-center items-center xl:text-4xl max-sm:text-4xl max-sm:text-left'>
                About Us
            </div>
            <img className='team_mobile visible-only-sm mt-12' src={half_image} alt='team'/>
            <Vision/>
            <Mission/>
            <Team/>
        </div>
    );
}

export default About;
