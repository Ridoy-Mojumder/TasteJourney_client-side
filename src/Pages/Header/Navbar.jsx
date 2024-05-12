import { Link, NavLink } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "./logo2.json";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import './Navbar.css'

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };



    const items = (
        <>
            <NavLink className="group flex cursor-pointer flex-col">
                <span className="flex font-bold text-[#45bfca]">Home</span>{" "}
                <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-[#278f7d] transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
            <NavLink to="/allFoods" className="group flex cursor-pointer flex-col">
                <span className="flex font-bold text-[#45bfca]">AllFoods</span>{" "}
                <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-[#278f7d] transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
            <NavLink to="/gallery" className="group flex cursor-pointer flex-col">
                <span className="flex font-bold text-[#45bfca]">Gallery</span>{" "}
                <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-[#278f7d] transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
            {
                user &&
                <NavLink to="/myProfile" className="group flex cursor-pointer flex-col">
                    <span className="flex font-bold text-[#45bfca]">MyProfile</span>{" "}
                    <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-[#278f7d] transition-all duration-300 group-hover:w-full"></span>
                </NavLink>
            }
            <NavLink to="/aboutUs" className="group flex cursor-pointer flex-col">
                <span className="flex font-bold text-[#45bfca]">AboutUs</span>{" "}
                <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-[#278f7d] transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
        </>
    );

    return (
        <div>
            <div className=" font-dancing">
                <nav className="rounded-lg shadow-xl p-4 flex justify-center  items-center gap-4 mt-[-20px]  transition duration-300 ease-in-out">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost md:hidden text-sky-700"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16"
                                    />
                                </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content mt-3 z-[1] p-1 shadow bg-base-100 rounded-box w-44 font-bold flex items-center justify-between gap-10 text-black"
                            >
                                {items}
                            </ul>
                        </div>
                        <div className="hidden md:flex justify-start items-start w-36 ">
                            <Link t="/">
                                <div className=" rounded-lg shadow-xl p-4 flex justify-center items-center gap-2 mt-[-px] hover:bg-[#afdbdf] transition duration-300 ease-in-out w-80">
                                    <div className=" ">
                                        <Lottie options={defaultOptions} height={50} width={160} />
                                    </div>
                                    <h1 className="text-xl pr-20  md:text-3xl font-bold text-[#45bfca] tracking-wide  animate-pulse hover:animate-none transition duration-300 ease-in-out  cursor-pointer">
                                        TasteJourney
                                    </h1>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className=" flex md:items-center md:justify-between gap-16">
                        <div className="hidden md:flex md:items-center md:justify-between gap-16">
                            <ul className="flex items-center justify-between gap-10">{items}</ul>
                        </div>
                        <div className="navbar-end gap-4">
                            <div className="flex gap-3">
                                {user ? (
                                    // If user is logged in, show user's photo and logout button
                                    <div className="flex items-center">
                                        <div className="pointer group relative mx-auto  flex h-10 w-max justify-center">
                                            <img
                                                src={user.photoURL}
                                                alt="User Profile"
                                                className="h-12 w-12  rounded-full cursor-pointer border border-[#278f7d] "
                                            />
                                            {/* Hover Text */}
                                            <div className="absolute -bottom-12 cursor-pointer whitespace-nowrap opacity-0 duration-500 hover:hidden group-hover:-bottom-16 group-hover:opacity-100  ">
                                                <p className="rounded-md bg-[#278f7d] px-3 py-2 text-white shadow-[0px_0px_10px_0px_#278f7d]"> {user.displayName}</p>
                                                <span className="absolute -top-2 left-[50%] h-0 w-0 -translate-x-1/2 -rotate-[45deg] border-b-[20px] border-r-[20px] border-b-transparent border-r-[#278f7d] shadow-[0px_0px_10px_0px_#278f7d]"></span>
                                            </div>
                                            {/* Hover button */}
                                        </div>
                                        <button
                                            className="bg-[#ca4e45] rounded-sm px-6 py-2 transition-all duration-300 hover:scale-90 ml-4 font-bold text-white"
                                            onClick={logOut}
                                        >
                                            LogOut
                                        </button>
                                    </div>
                                ) : (
                                    // If user is not logged in, show login button
                                    <NavLink to="/logIn">
                                        <button className="bg-[#45bfca] rounded-sm px-6 py-2 transition-all duration-300 hover:scale-90 font-bold text-white">
                                            LogIn
                                        </button>
                                    </NavLink>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;
