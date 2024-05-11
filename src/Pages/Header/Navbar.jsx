import { NavLink } from "react-router-dom";
import animationData from './logo2.json';
import Lottie from "react-lottie";
const Navbar = () => {




    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };





    const items = <>
        <NavLink className="group flex cursor-pointer flex-col">
            <span className="flex font-bold text-[#45bfca]">Home</span> <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-[#278f7d] transition-all duration-300 group-hover:w-full"></span>
        </NavLink>
        <NavLink to="/allFoods" className="group flex cursor-pointer flex-col">
            <span className="flex font-bold text-[#45bfca]">AllFoods</span> <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-[#278f7d] transition-all duration-300 group-hover:w-full"></span>
        </NavLink>
        <NavLink to='/addCraft' className="group flex cursor-pointer flex-col">
            <span className="flex font-bold text-[#45bfca]">Gallery</span> <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-[#278f7d] transition-all duration-300 group-hover:w-full"></span>
        </NavLink>
        <NavLink to='/aboutUs' className="group flex cursor-pointer flex-col">
            <span className="flex font-bold text-[#45bfca]">AboutUs</span>  <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-[#278f7d] transition-all duration-300 group-hover:w-full"></span>
        </NavLink>
    </>
    return (
        <div>
            <div className="">
                <nav className="rounded-lg shadow-xl p-4 flex justify-center  items-center gap-4 mt-[-20px]  transition duration-300 ease-in-out">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost md:hidden text-sky-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-1 shadow bg-base-100 rounded-box w-44 font-bold flex items-center justify-between gap-10 text-black">
                                {items}
                            </ul>
                        </div>
                        <div className="hidden md:flex justify-start items-start ">
                            <NavLink t='/'>
                                <div className=" rounded-lg shadow-xl p-4 flex justify-center items-center gap-4 mt-[-px] hover:bg-[#afdbdf] transition duration-300 ease-in-out">
                                    <div className="px-0 mx-0">
                                        <Lottie options={defaultOptions} height={50} width={150}/>
                                    </div>
                                    <h1 className="text-xl pr-20  md:text-3xl font-bold text-[#45bfca] tracking-wide  animate-pulse hover:animate-none transition duration-300 ease-in-out  cursor-pointer">
                                        TasteJourney
                                    </h1>
                                </div>
                            </NavLink>

                        </div>

                    </div>
                    <div className=" flex md:items-center md:justify-between gap-16">
                        <div className="hidden md:flex md:items-center md:justify-between gap-16">
                            <ul className="flex items-center justify-between gap-10">
                                {items}
                            </ul>
                        </div>
                        <div className="navbar-end gap-4">
                            <div className="flex gap-3">
                                <div className="flex items-center justify-between md:mx-10">
                                    <NavLink to='/logIn'>
                                        <button className=" bg-[#45bfca] rounded-sm px-6 py-2 transition-all duration-300 hover:scale-90 font-bold text-white">LogIn</button>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;