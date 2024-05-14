import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link } from "react-router-dom";
import 'animate.css';

const AllFoodSection = () => {
    const { user } = useContext(AuthContext);
    const [allFoods, setAllFoods] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/TasteJourneyAllFood`)
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
                <div className="food-card-container my-10 animate__fadeInUp  animate__animated animate__bounceInRight">
                    <h1 className="text-3xl font-semibold text-[#52c9af] my-10 text-center animate__animated animate__backInRight">Our Top Food Items</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {allFoods.slice(0, 6).map((food, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md p-6 font-dancing  animate__animated animate__bounceInRight">
                                <img src={food.food_image} alt={food.food_name} className="w-full h-60 object-cover mb-4 rounded-lg" />
                                <h2 className="text-lg font-semibold text-gray-800 mb-2">{food.food_name}</h2>
                                <p className="text-sm text-gray-600 mb-4">Food Category: {food.food_category}</p>
                                <p className="text-sm text-gray-600 mb-4">Quantity: {food.quantity}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-lg text-[#52c9af] font-bold">Price: ${food.price}</span>
                                    <Link to={`/viewDetails/${food._id}`}>
                                        <button className="bg-[#52c9af] text-white px-4 py-2 rounded hover:bg-[#429b93] transition-colors duration-200 ease-in-out">View Details</button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center items-center mt-8">
                        <Link to='/allFoods'>
                            <button className="bg-[#52c9af] text-white px-4 py-2 rounded hover:bg-[#429b93] transition-colors duration-200 ease-in-out">Show More</button>
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default AllFoodSection;
