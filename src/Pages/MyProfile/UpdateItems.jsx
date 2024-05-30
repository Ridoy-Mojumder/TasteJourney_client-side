import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

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
        fetch(`https://taste-journey-server-side.vercel.app/TasteJourneyAllFood/${loadedData._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(foodData)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
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
        <div className="max-w-4xl mx-auto p-5 bg-white rounded-lg shadow-lg m-5">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Update Item</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <form onSubmit={handleSubmit} className="space-y-6">
                <h1 className="text-2xl md:text-5xl font-bold text-[#52c9af] my-10 text-center relative">
                    <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-16 h-1 bg-[#52c9af]"></span>
                    Edit Food Item
                    <span className="absolute right-0 top-1/2 transform -translate-y-1/2 w-16 h-1 bg-[#52c9af]"></span>
                </h1>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Food Name</label>
                    <input
                        type="text"
                        name="food_name"
                        value={foodData.food_name}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                        className="mt-1 block w-full px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Food Category</label>
                    <input
                        type="text"
                        name="food_category"
                        value={foodData.food_category}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                        className="mt-1 block w-full px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                        className="mt-1 block w-full px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-gray-200 rounded-md shadow-sm cursor-not-allowed"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="text"
                        name="email"
                        value={user.email}
                        readOnly
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-gray-200 rounded-md shadow-sm cursor-not-allowed"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Food Origin (Country)</label>
                    <input
                        type="text"
                        name="food_origin"
                        value={foodData.food_origin}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={foodData.description}
                        onChange={handleChange}
                        rows="4"
                        className="mt-1 block w-full px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Short description about the food..."
                        required
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full inline-flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Update Item
                </button>
            </form>
        </div>

    );
};

export default UpdateItems;
