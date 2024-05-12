import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../Provider/AuthProvider";
import { useLoaderData } from "react-router-dom";

const PurchesPage = () => {
    const loadedData = useLoaderData();
    const { food_name, price } = loadedData; // Assuming quantity is not part of loadedData or is defaulting to 1

    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        food_name: food_name,
        price: price,
        quantity: 1  // Defaulting quantity to 1 if not loaded
    });

    // Set initial form data based on loaded data (useEffect hook for setting initial data if it updates)
    useEffect(() => {
        setFormData({
            food_name: food_name,
            price: price,
            quantity: 1
        });
    }, [food_name, price]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePurchase = async (e) => {
        e.preventDefault();
        const purchaseData = {
            ...formData,
            buyerName: user.displayName,
            buyerEmail: user.email,
            buyingDate: new Date().toISOString()
        };

        try {
            const response = await axios.post('http://localhost:5000/purchase', purchaseData);
            if (response.data) {
                toast.success('Purchase successful!');
                // Reset only the quantity
                setFormData(prev => ({
                    ...prev,
                    quantity: 1
                }));
            }
        } catch (error) {
            toast.error('Purchase failed!');
            console.error('Error purchasing food:', error);
        }
    };

    return (
        <div className="flex justify-center items-center p-20 bg-gray-100 min-h-screen">
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
                       value={formData.quantity} min="1" onChange={handleInputChange} required />
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
                    className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Purchase
            </button>
        </form>
        <ToastContainer />
    </div>
</div>

    );
};

export default PurchesPage;
