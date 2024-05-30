import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyAddedItems = () => {
    const { user } = useContext(AuthContext);
    const [myAddedData, setMyAddedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://taste-journey-server-side.vercel.app/TasteJourneyAllFood/`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                return res.json();
            })
            .then(data => {
                setMyAddedData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching foods:", error);
                setError('Failed to fetch data. Please try again later.');
                setLoading(false);
            });
    }, [user]);

    const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://taste-journey-server-side.vercel.app/TasteJourneyAllFood/${_id}`, {
                    method: 'DELETE',
                })
                    .then(res => {
                        if (!res.ok) {
                            throw new Error('Failed to delete item');
                        }
                        return res.json();
                    })
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Coffee has been deleted.",
                                icon: "success"
                            });
                            const remaining = myAddedData.filter(data => data._id !== _id);
                            setMyAddedData(remaining);
                        }
                    })
                    .catch(error => {
                        console.error("Error deleting item:", error);
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to delete item.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    return (
        <div>
            {loading ? (
                <p className="text-gray-600 text-center">Loading...</p>
            ) : error ? (
                <p className="text-red-600 text-center">{error}</p>
            ) : myAddedData.length === 0 ? (
                <p className="text-gray-600 text-center text-7xl">You have not created any Food Item yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
    {myAddedData.map((data, index) => {
        if (data.added_by.email === user.email) {
            return (
                <div key={index} className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg overflow-hidden transition-shadow duration-300">
                    <img src={data.food_image} alt={data.itemName} className="w-full h-48 object-cover" />
                    
                    <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-800">{data.food_name}</h3>

                        <div className="py-2">
                            <p className="text-gray-600 text-sm">Rating: ⭐️⭐️</p>
                            <p className="text-gray-600 text-sm">Food Origin: {data.food_origin}</p>
                            <p className="text-gray-600 text-sm">Food Category: {data.food_category}</p>
                        </div>

                        <div className="pt-2 border-t mt-2">
                            <p className="text-lg font-semibold text-gray-800">${data.price}</p>
                        </div>
                    </div>

                    <div className="p-4 flex justify-between items-center">
                        <Link to={`/viewDetails/${data._id}`}>
                            <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors duration-200 ease-in-out">Details</button>
                        </Link>
                        <Link to={`/updateItems/${data._id}`}>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 transition-colors duration-200 ease-in-out">Update</button>
                        </Link>
                        <button onClick={() => handleDelete(data._id)} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition-colors duration-200 ease-in-out">
                            Delete
                        </button>
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
