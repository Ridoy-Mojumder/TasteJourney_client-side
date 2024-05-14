import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";

const AboutUs = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>About Us</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div className="carousel-item relative w-full mb-16">
                <div className="relative w-full">
                    <img src="https://i.ibb.co/YcHk0yf/man-mechanic-working-with-screwdriver-repair-motorcycle-detail-151013-39125.jpg" className="w-full h-60 object-cover" />
                </div>
                <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-center items-center rounded-xl bg-gradient-to-r from-[#151515] to-[rgb(21, 21, 21, 0)]">
                    <div className="text-white p-4 md:p-16 mt-auto text-center">
                        <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold mb-2 md:mb-0">About Us</h1>
                        <div className="bg-[#45bfca] bottom-0 m-10 px-8 py-2 flex justify-center items-center" style={{ clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)" }}>
                            <NavLink to='/' className="text-white">Home | About Us</NavLink>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-4 md:px-8 lg:px-16">


                <h1 className="text-5xl font-semibold text-[#52c9af] my-10 text-center font-dancing relative">
                    You can know us
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-px w-40  bg-[#52c9af]"></span>
                </h1>


                <div className="grid grid-cols-1 md:grid-cols-2 my-6 md:my-10 lg:my-20 border p-8" >
                    <div className="flex justify-center items-center">
                        <img src="https://i.ibb.co/02F9VtT/restaurant-with-painting-wall-that-says-fish-it-853177-1321.jpg" alt="" className="w-2/3 rounded-lg shadow-lg rounded-t-full" />
                    </div>
                    <div className="flex flex-col justify-center">

                        <h1 className="text-5xl font-semibold text-[#52c9af] my-10 text-center font-dancing relative">
                            <span>
                                <span className="block md:inline">Our</span>
                                <span className="block md:inline text-[#429b93]">Mission</span>
                            </span>
                            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-px w-40  bg-[#52c9af]"></span>
                        </h1>
                        <p className="text-xl text-center md:text-left font-dancing">At TasteJourney, our mission is to redefine the dining experience, one meal at a time. We are dedicated to creating unforgettable moments for our guests, where every bite tells a story and every dish is crafted with care.</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 my-6 md:my-10 lg:my-20 border p-8">
                    <div className="flex flex-col justify-center">
                        <h1 className="text-5xl font-semibold text-[#52c9af] my-10 text-center font-dancing relative">
                            <span>
                                <span className="block md:inline">Our</span>
                                <span className="block md:inline text-[#429b93]">Chef</span>
                            </span>
                            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-px w-40  bg-[#52c9af]"></span>
                        </h1>
                        <p className="text-xl text-center md:text-left font-dancing">Our chefs are the heart and soul of TasteJourney, bringing creativity, passion, and expertise to every plate. Each member of our culinary team is handpicked for their talent, dedication, and commitment to excellence.</p>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="grid grid-cols-3 md:grid-cols-2 ">
                            <img src="https://i.ibb.co/rmcmhZJ/free-photo-young-chef-preparing-food-restaurant-kitchen-985092-4848.jpg" alt="" className="w-auto shadow-lg rounded-full  " />
                            <img src="https://i.ibb.co/H2ZyrGq/average-human-tone-we-see-man-donning-classic-chefs-hat-apron-his-hands-firmly-hold-1032785-3277.jpg" alt="" className="w-auto shadow-lg rounded-full " />
                            <img src="https://i.ibb.co/VwBMLsj/you-wouldnt-believe-it-unless-you-saw-it-yourself-picture-this-downright-attractive-chef-ad-1032785.jpg" alt="" className="w-auto md:w-auto shadow-lg rounded-full md:ml-[145px] md:-mt-10 " />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 my-6 md:my-10 lg:my-20 border p-8">
                    <div className="flex justify-center items-center">
                        <div className="relative">
                            <img src="https://i.ibb.co/k4f3RD3/restaurant-interior-1127-3394.jpg" className="relative md:h-[600px]  sm:h-[500px] h-[300px]  w-[500px] bg-gray-400 rounded-b-full object-cover" alt="hero navigate ui" />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <h1 className="text-5xl font-semibold text-[#52c9af] my-10 text-center font-dancing relative">
                            <span>
                                <span className="block md:inline">Our</span>
                                <span className="block md:inline text-[#429b93]">Story</span>
                            </span>
                            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-px w-40  bg-[#52c9af]"></span>
                        </h1>
                        <p className="text-xl text-center md:text-left font-dancing">We strive to source the finest ingredients, handpick the most talented chefs, and curate an atmosphere that invites you to savor each moment. Whether you are here for a casual brunch or a special celebration, our mission remains the same: to inspire, delight, and leave you craving more.</p>
                    </div>
                </div>
            </div>

        </>
    );
};

export default AboutUs;
