import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";

const AllFood = () => {
    const { user } = useContext(AuthContext);
    const [allFoods, setAllFoods] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    useEffect(() => {
        fetch(`https://taste-journey-server-side.vercel.app/TasteJourneyAllFood`)
            .then(res => res.json())
            .then(data => {
                setAllFoods(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching foods:", error);
                setIsLoading(false);
            });
    }, [user]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    // const filteredFoods = allFoods.filter(food => food.food_name.toLowerCase().includes(searchQuery.toLowerCase()));



    const handleMinPriceChange = (e) => {
        setMinPrice(e.target.value);
    };

    const handleMaxPriceChange = (e) => {
        setMaxPrice(e.target.value);
    };

    const filteredFoods = allFoods.filter(food => 
        food.food_name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (minPrice === "" || parseInt(food.price) >= parseInt(minPrice)) &&
        (maxPrice === "" || parseInt(food.price) <= parseInt(maxPrice))
    );

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>All Food</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div className="carousel-item relative w-full mb-16">
                <div className="relative w-full">
                    <img src="https://i.ibb.co/YcHk0yf/man-mechanic-working-with-screwdriver-repair-motorcycle-detail-151013-39125.jpg" className="w-full h-60 object-cover" />
                </div>
                <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-center items-center rounded-xl bg-gradient-to-r from-[#151515] to-[rgb(21, 21, 21, 0)]">
                    <div className="text-white p-4 md:p-16 mt-auto text-center">
                        <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold mb-2 md:mb-0">All Food Items</h1>
                        <div className="bg-[#45bfca] bottom-0 m-10 p-2 flex justify-center items-center" style={{ clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)" }}>
                            <NavLink to='/' className="text-white">Home | All Food Items</NavLink>
                        </div>
                    </div>
                </div>
            </div>


            <div className="flex flex-col md:flex-row items-center justify-center md:justify-end m-8 space-y-4 md:space-y-0 md:space-x-4">
                <label htmlFor="minPrice" className="text-gray-700 font-semibold">
                    Min Price:
                </label>
                <input
                    type="number"
                    id="minPrice"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#52c9af] focus:ring-1 focus:ring-[#52c9af] w-full md:w-40 transition-all duration-300"
                />
                <label htmlFor="maxPrice" className="text-gray-700 font-semibold">
                    Max Price:
                </label>
                <input
                    type="number"
                    id="maxPrice"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#52c9af] focus:ring-1 focus:ring-[#52c9af] w-full md:w-40 transition-all duration-300"
                />
            </div>


            {isLoading ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="flex justify-center items-center my-32">
                        <img src="https://i.ibb.co/ZSppyKq/Rotating-globe.gif" alt="" className="w-20" />
                    </div>
                </div>
            ) : (
                <div className="food-card-container my-10">
                    <h1 className="text-2xl md:text-5xl font-bold text-[#52c9af] my-10 text-center relative">
                        <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-16 h-1 bg-[#52c9af]"></span>
                        Here are all our Food Items
                        <span className="absolute right-0 top-1/2 transform -translate-y-1/2 w-16 h-1 bg-[#52c9af]"></span>
                    </h1>


                    {/* Search input field */}
                    <div className="flex flex-col md:flex-row items-center justify-center md:justify-end m-8 space-y-4 md:space-y-0 md:space-x-4">
                        <label htmlFor="search" className="text-gray-700 font-semibold">
                            Search for Food:
                        </label>
                        <div className="relative w-full md:w-auto">
                            <input
                                type="text"
                                id="search"
                                placeholder="Search by food name..."
                                value={searchQuery}
                                onChange={handleSearch}
                                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#52c9af] focus:ring-1 focus:ring-[#52c9af] w-full md:w-80 transition-all duration-300"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 5.293a1 1 0 011.414-1.414l3.586 3.586a1 1 0 010 1.414l-3.586 3.586a1 1 0 11-1.414-1.414L6.586 9.414a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>


                    {/* Displaying food cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-5">
                        {filteredFoods.map((food, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
                                <div className="relative group">
                                    <img src={food.food_image} alt={food.food_name} className="w-full h-72 md:h-60 object-cover mb-4 group-hover:opacity-75 transition-opacity duration-300" />
                                    <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black to-transparent">
                                        <div className="text-center text-white">
                                            <p className="text-lg font-semibold">Price: ${food.price}</p>
                                            <p className="text-lg font-semibold">Origin: {food.food_origin}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-2">{food.food_name}</h2>
                                    <p className="text-sm text-gray-700 mb-4">Food Category: {food.food_category}</p>
                                    <p className="text-sm text-gray-700 mb-4">Quantity: {food.quantity}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg text-[#52c9af] font-bold">Price: ${food.price}</span>
                                        <Link to={`/viewDetails/${food._id}`}>
                                            <button className="bg-[#52c9af] text-white px-4 py-2 rounded-lg hover:bg-[#429b93] transition-colors duration-200 ease-in-out">View Details</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            )}
        </div>
    );
};

export default AllFood;
