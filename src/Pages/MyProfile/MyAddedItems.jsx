import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link } from "react-router-dom";


const MyAddedItems = () => {
    const { user } = useContext(AuthContext);
    const [myAddedData, setMyAddedData] = useState([]);


    useEffect(() => {
        fetch(`http://localhost:5000/TasteJourneyAllFood/`)
            .then(res => res.json())
            .then(data => {
                setMyAddedData(data);
            })
            .catch(error => {
                console.error("Error fetching foods:", error);
            });
    }, [user]);



    return (
        <div>
        {myAddedData.length === 0 ? (
            <p className="text-gray-600 text-center">You have not created any art and crafts yet.</p>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {myAddedData.map((data, index) => {
                    if (data.added_by.email === user.email ) {
                        return (
                            <div key={index} className="bg-white rounded-lg shadow-md p-6">
                                <img src={data.food_image} alt={data.itemName} className="w-full h-40 object-cover mb-4 rounded-lg" />
                                <h2 className="text-lg font-semibold text-gray-800 mb-2">{data.itemName}</h2>
                                <p className="text-sm text-gray-600 mb-4">{data.shortDescription}</p>
                                <p className="text-sm text-gray-600 mb-4">Rating: {data.rating}</p>
                                <p className="text-sm text-gray-600 mb-4">Stock Status: {data.stockStatus}</p>
                                <p className="text-sm text-gray-600 mb-4">Customization: {data.customization}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-lg text-[#52c9af] font-bold">${data.price}</span>
                                    <Link to={`/viewDetails/${data._id}`}>
                                        <button className="bg-[#52c9af] text-white px-4 py-2 rounded hover:bg-[#429b93] transition-colors duration-200 ease-in-out">View Details</button>
                                    </Link>
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <Link to={`/updateArtAndCrafts/${data._id}`}>
                                        <button className="bg-[#69a6eb] text-white px-4 py-2 rounded hover:bg-[#3c6ea7] transition-colors duration-200 ease-in-out">Update Details</button>
                                    </Link>
                                    <button className="bg-[#db4f3c] text-white px-4 py-2 rounded hover:bg-[#7a2c2c] transition-colors duration-200 ease-in-out" >Delete One</button>
                                </div>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        )}
    </div>
    );
};

export default MyAddedItems;