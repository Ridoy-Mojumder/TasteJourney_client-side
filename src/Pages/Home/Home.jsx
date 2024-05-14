import { Helmet } from "react-helmet";
import AllFoodSection from "../AllFoodSection/AllFoodSection";
import BannerSection from "../BannerSection/BannerSection";
import ContactUs from "../ContactUs/ContactUs";
import MeetOurMemberAndChef from "../MeetOurMemberAndChef/MeetOurMemberAndChef";
import 'animate.css';


const Home = () => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
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