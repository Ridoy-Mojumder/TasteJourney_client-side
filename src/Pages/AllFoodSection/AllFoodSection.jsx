import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link } from "react-router-dom";
import 'animate.css';

const AllFoodSection = () => {
    const { user } = useContext(AuthContext);
    const [allFoods, setAllFoods] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`https://taste-journey-server-side.vercel.app/TasteJourneyAllFood`)
            .then(res => res.json())
            .then(data => {
                // Sort the data by orderCount in descending order
                const sortedData = data.sort((a, b) => b.orderCount - a.orderCount);
                setAllFoods(sortedData);
                setIsLoading(false); // Set loading to false after data is fetched and sorted
            })
            .catch(error => {
                console.error("Error fetching foods:", error);
                setIsLoading(false); // Set loading to false even if there's an error
            });
    }, [user]);

    return (
        <>
            {isLoading ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="flex justify-center items-center my-32">
                        <img src="https://i.ibb.co/ZSppyKq/Rotating-globe.gif" alt="" className="w-20" />
                    </div>
                </div>
            ) : (
                <div className="food-card-container m-10">
                <h1 className="text-3xl font-semibold text-[#52c9af] my-10 text-center animate__animated animate__backInRight">
                    Our Top Food Items
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
                    {allFoods.slice(0, 6).map((food, index) => (
                        <div key={index} className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 animate__animated animate__bounceInRight">
                            <div className="relative group">
                                <img src={food.food_image} alt={food.food_name} className="w-full h-60 object-cover mb-4 rounded-t-lg group-hover:opacity-75 transition-opacity duration-300" />
                                <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
                                    <div className="text-center text-white p-4 rounded-lg">
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
                                        <button className="bg-[#52c9af] text-white px-4 py-2 rounded-lg hover:bg-[#429b93] transition-colors duration-200 ease-in-out">
                                            View Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center items-center mt-8">
                    <Link to='/allFoods'>
                        <button className="bg-[#52c9af] text-white px-6 py-3 rounded-lg hover:bg-[#429b93] transition-colors duration-200 ease-in-out">
                            Show More
                        </button>
                    </Link>
                </div>
            </div>
            
            )}
        </>
    );
};

export default AllFoodSection;
