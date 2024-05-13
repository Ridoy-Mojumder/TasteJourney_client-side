import axios from "axios";
import { useContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../../Provider/AuthProvider";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const PurchasePage = () => {
    const loadedData = useLoaderData();
    const { food_name, price, quantity } = loadedData;

    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        food_name: food_name,
        price: price,
        quantity: 0
    });

    const [orderCount, setOrderCount] = useState(0);
    const [availableQuantity, setAvailableQuantity] = useState(quantity);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePurchase = async (e) => {
        e.preventDefault();
        if (availableQuantity < formData.quantity) {
            Swal.fire({
                title: 'Error!',
                text: 'Insufficient quantity available',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:5000/purchase', {
                ...formData,
                buyerName: user.displayName,
                buyerEmail: user.email,
                buyingDate: new Date().toISOString(),
            });
            console.log(response.data)
            
            // Assuming response includes updated quantity and order count
            const { updatedQuantity, updatedOrderCount } = response.data;

            // Update frontend state with updated values
            setAvailableQuantity(updatedQuantity);
            setOrderCount(updatedOrderCount);

            Swal.fire({
                title: 'Success!',
                text: 'Purchase successful',
                icon: 'success',
                confirmButtonText: 'Great!'
            });
        } catch (error) {
            console.error('Error purchasing food:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Error processing your purchase',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    };

    return (
        <div className="flex justify-around items-center p-20 bg-gray-100 min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold text-center mb-6">Purchase Food</h1>
                <form onSubmit={handlePurchase} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="food_name">Food Name</label>
                        <input type="text" name="food_name" id="food_name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            value={formData.food_name} onChange={handleInputChange} required readOnly />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="price">Price</label>
                        <input type="number" name="price" id="price"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            value={formData.price} onChange={handleInputChange} required readOnly />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="quantity">Quantity</label>
                        <input type="number" name="quantity" id="quantity"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            min="1" value={formData.quantity} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="buyerName">Buyer Name</label>
                        <input type="text" id="buyerName"
                            className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            value={user.displayName} readOnly />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="buyerEmail">Buyer Email</label>
                        <input type="email" id="buyerEmail"
                            className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            value={user.email} readOnly />
                    </div>
                    <button type="submit"
                        className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        disabled={availableQuantity === 0}>
                        Purchase
                    </button>
                </form>
                <ToastContainer />
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-xs w-full ">
                <h1 className="text-3xl">Available Quantity: {availableQuantity}</h1>
                <h1 className="text-3xl">Order Count: {orderCount}</h1>
            </div>
        </div>
    );
};

export default PurchasePage;

