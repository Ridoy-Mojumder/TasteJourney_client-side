import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";


const AddFoodItems = () => {
    const { user } = useContext(AuthContext)
    const [foodData, setFoodData] = useState({
        food_name: '',
        image: null,
        category: '',
        quantity: 0,
        price: 0,
        name: user ? user.displayName : '',
        email: user ? user.email : '',
        food_origin: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFoodData({ ...foodData, image: files[0] });
        } else {
            setFoodData({ ...foodData, [name]: value });
        }
    };




    const handleSubmit = e => {
        e.preventDefault();
        const food_name = foodData.food_name;
        const food_image = foodData.photoURL;
        const food_category = foodData.category;
        const quantity = foodData.quantity;
        const price = foodData.price;
        const name = foodData.name;
        const email = foodData.email;
        const food_origin = foodData.food_origin;
        const description = foodData.description;
        const newArtAndCraft = { food_name, food_image, food_category, quantity, price, "added_by": { "name": name, "email": email }, food_origin, description }
        // console.log(newArtAndCraft)


        fetch('https://taste-journey-server-side.vercel.app/TasteJourneyAllFood/', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newArtAndCraft)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Art and Craft Added Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    };
    return (
        <div className="max-w-4xl mx-auto p-5">
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Food Name</label>
                    <input
                        type="text"
                        name="food_name"
                        value={foodData.food_name}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#52c9af] focus:border-[#52c9af] sm:text-sm"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Food Image</label>
                    <input
                        type="text"
                        name="photoURL"
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#52c9af] focus:border-[#52c9af] sm:text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Food Category</label>
                    <input
                        type="text"
                        name="category"
                        value={foodData.category}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#52c9af] focus:border-[#52c9af] sm:text-sm"
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
                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#52c9af] focus:border-[#52c9af] sm:text-sm"
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
                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#52c9af] focus:border-[#52c9af] sm:text-sm"
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
                        className="mt-1 block w-full px-4 py-3 border border-gray-300 bg-gray-100 rounded-lg shadow-sm focus:outline-none sm:text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="text"
                        name="email"
                        value={user.email}
                        readOnly
                        className="mt-1 block w-full px-4 py-3 border border-gray-300 bg-gray-100 rounded-lg shadow-sm focus:outline-none sm:text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Food Origin (Country)</label>
                    <input
                        type="text"
                        name="food_origin"
                        value={foodData.food_origin}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#52c9af] focus:border-[#52c9af] sm:text-sm"
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
                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#52c9af] focus:border-[#52c9af] sm:text-sm"
                        placeholder="Short description about the food..."
                        required
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-[#52c9af] text-white font-medium rounded-lg shadow-lg hover:bg-[#429b93] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#52c9af] transition duration-300"
                >
                    Add Item
                </button>
            </form>
        </div>

    );
};

export default AddFoodItems;