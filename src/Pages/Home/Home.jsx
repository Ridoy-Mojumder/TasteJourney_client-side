import AllFoodSection from "../AllFoodSection/AllFoodSection";
import BannerSection from "../BannerSection/BannerSection";
import ContactUs from "../ContactUs/ContactUs";
import MeetOurMemberAndChef from "../MeetOurMemberAndChef/MeetOurMemberAndChef";
import 'animate.css';


const Home = () => {
    return (
        <div>
            <BannerSection></BannerSection>
            <div className="animate__fadeInUp">
                <AllFoodSection></AllFoodSection>
            </div>
            <MeetOurMemberAndChef></MeetOurMemberAndChef>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;