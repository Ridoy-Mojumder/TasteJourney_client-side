import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link } from "react-router-dom";

const AllFoodSection = () => {
    const { user } = useContext(AuthContext);
    const [allFoods, setAllFoods] = useState([]);
    const [showAllData, setShowAllData] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/TasteJourneyAllFood`)
            .then(res => res.json())
            .then(data => {
                setAllFoods(data);
            })
            .catch(error => {
                console.error("Error fetching foods:", error);
            });
    }, [user]);

    const handleShowMore = () => {
        setShowAllData(true);
    };
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        });
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="flex justify-center items-center my-32">
                        <img src="https://i.ibb.co/ZSppyKq/Rotating-globe.gif" alt="" className="w-20" />
                    </div>
                </div>


            ) :
                (
                    <div className="food-card-container my-10">
                         <h1 className="text-3xl font-semibold text-[#52c9af] my-10 text-center">Our Top Food items</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {
                                (showAllData ? allFoods : allFoods.slice(0, 6)).map((food, index) => (
                                    <div key={index} className="bg-white rounded-lg shadow-md p-6 font-dancing">
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
                                ))
                            }
                        </div>
                        {!showAllData && (
                            <div className="flex justify-center mt-8">
                                <button className="bg-[#52c9af] text-white px-4 py-2 rounded hover:bg-[#429b93] transition-colors duration-200 ease-in-out" onClick={handleShowMore}>Show More</button>
                            </div>
                        )}
                    </div>
                )}
        </>
    );
};

export default AllFoodSection;
