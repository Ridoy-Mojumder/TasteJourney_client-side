import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useLoaderData, useNavigate } from "react-router-dom";

const UpdateItems = () => {
    const { user } = useContext(AuthContext);
    const loadedData = useLoaderData();
    const navigate = useNavigate();
    const [foodData, setFoodData] = useState({
        food_name: loadedData.food_name,
        food_image: loadedData.food_image,
        food_category: loadedData.food_category,
        quantity: loadedData.quantity,
        price: loadedData.price,
        name: user ? user.displayName : '',
        email: user ? user.email : '',
        food_origin: loadedData.food_origin,
        description: loadedData.description
    });

    useEffect(() => {
        setFoodData({
            food_name: loadedData.food_name,
            food_image: loadedData.food_image,
            food_category: loadedData.food_category,
            quantity: loadedData.quantity,
            price: loadedData.price,
            name: user ? user.displayName : '',
            email: user ? user.email : '',
            food_origin: loadedData.food_origin,
            description: loadedData.description
        });
    }, [loadedData, user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFoodData({ ...foodData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/TasteJourneyAllFood/${loadedData._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(foodData)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.modifiedCount > 0) {
                navigate('/myProfile')
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Food Item Updated Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
        .catch(error => {
            console.error('Error updating food item:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong! Please try again.',
            });
        });
    };
    return (
        <div className="max-w-4xl mx-auto p-5">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Food Name</label>
                    <input
                        type="text"
                        name="food_name"
                        value={foodData.food_name}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Food Image URL</label>
                    <input
                        type="text"
                        name="food_image"
                        value={foodData.food_image}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Food Category</label>
                    <input
                        type="text"
                        name="food_category"
                        value={foodData.food_category}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        value={foodData.quantity}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={foodData.price}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Added By</label>
                    <input
                        type="text"
                        name="name"
                        value={user.displayName}
                        readOnly
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="text"
                        name="email"
                        value={user.email}
                        readOnly
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none sm:text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Food Origin (Country)</label>
                    <input
                        type="text"
                        name="food_origin"
                        value={foodData.food_origin}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={foodData.description}
                        onChange={handleChange}
                        rows="3"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Short description about the food..."
                        required
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Update Item
                </button>
            </form>
        </div>
    );
};

export default UpdateItems;
