
import { NavLink } from "react-router-dom";
import AddFoodItems from "./AddFoodItems";
import MyAddedItems from "./MyAddedItems";
import MyOrderdItems from "./MyOrderdItems";


const MyProfile = () => {

    


    return (
        <div>
            <div className="carousel-item relative w-full mb-16">
                <div className="relative w-full">
                    <img src="https://i.ibb.co/YcHk0yf/man-mechanic-working-with-screwdriver-repair-motorcycle-detail-151013-39125.jpg" className="w-full h-60 object-cover" />
                </div>
                <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-center items-center rounded-xl bg-gradient-to-r from-[#151515] to-[rgb(21, 21, 21, 0)]">
                    <div className="text-white p-4 md:p-16 mt-auto text-center">
                        <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold mb-2 md:mb-0">My Profile</h1>
                        <div className="bg-[#45bfca] bottom-0 m-10 p-2 px-20 flex justify-center items-center" style={{ clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)" }}>
                            <NavLink to='/' className="text-white">Home | My Profile</NavLink>
                        </div>
                    </div>
                </div>
            </div>

            <div role="tablist" className="tabs tabs-lifted">
                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="My added food items" />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <h1 className="text-5xl font-semibold text-[#52c9af] my-10 text-center font-dancing relative">
                        My added food items
                        <span className="absolute left-1/2 transform -translate-x-1/2 h-px w-96 -bottom-4 bg-[#52c9af]"></span>
                    </h1>
                    <MyAddedItems></MyAddedItems>
                </div>

                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Add a food item" checked />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <h1 className="text-5xl font-semibold text-[#52c9af] my-10 text-center font-dancing relative">
                        Add a food item
                        <span className="absolute left-1/2 transform -translate-x-1/2 h-px w-96 -bottom-4 bg-[#52c9af]"></span>
                    </h1>
                    <AddFoodItems></AddFoodItems>
                    

                </div>

                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="My ordered food items" />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <h1 className="text-5xl font-semibold text-[#52c9af] my-10 text-center font-dancing relative">
                        My ordered food items
                        <span className="absolute left-1/2 transform -translate-x-1/2 h-px w-96 -bottom-4 bg-[#52c9af]"></span>
                    </h1>
                    <MyOrderdItems></MyOrderdItems>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;