
import { ToastContainer } from "react-toastify";
import { useLoaderData } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import './PurchasePage.css'

const PurchasePage = () => {
    const loadedData = useLoaderData();
    const { _id, food_image, quantity, food_name, price, orderCount, added_by } = loadedData;
    const { email} = added_by;
    const { user } = useContext(AuthContext);
    const [buyingDate, setBuyingDate] = useState("");

    useEffect(() => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const formattedToday = `${yyyy}-${mm}-${dd}`;
        setBuyingDate(formattedToday);
    }, []);



    const handlePurchase = (event) => {
        event.preventDefault();
        const form = event.target;
        const food_name = form.food_name.value;
        const food_image = form.food_image.value;
        const price = form.price.value;
        const quantity = form.quantity.value;
        const buyerName = form.buyerName.value;
        const buyerEmail = form.buyerEmail.value;
        const buyingDate = form.buyingDate.value;
        const newData = { food_name, food_image, quantity, buyerName, buyerEmail, price, buyingDate };
    
        // Check if the buyer's email matches the email of the user who added the food
        if (user.email === email) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "You can't purchase the food you added",
                showConfirmButton: false,
                timer: 1500
            });
            return; // Stop execution
        }
    
        if (parseInt(quantity) > parseInt(loadedData.quantity)) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "You can't buy more than the available quantity",
                showConfirmButton: false,
                timer: 1500
            });
            return; // Stop execution
        }
    
        fetch(`http://localhost:5000/purchase/${_id}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Purchase Added Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };
    
    



    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Purchase Food</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div className="md:flex justify-around items-center md:p-20 bg-gray-100 min-h-screen">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                    <h1 className="text-2xl font-bold text-center mb-6">Purchase Food</h1>
                    {
                        quantity === 0 && <p className="text-red-600 font-bold text-xl"> you can not buy this</p>
                    }
                    <form onSubmit={handlePurchase} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="food_name">Food Name</label>
                            <input
                                type="text"
                                name="food_name"
                                id="food_name"
                                className="input-field"
                                value={food_name}
                                readOnly />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="food_name">Food Image</label>
                            <input
                                type="text"
                                name="food_image"
                                id="food_image"
                                className="input-field"
                                value={food_image}
                                readOnly />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="price">Price</label>
                            <input
                                type="number"
                                name="price"
                                id="price"
                                className="input-field"
                                value={price}
                                readOnly />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="quantity">Quantity</label>
                            <input
                                type="number"
                                name="quantity"
                                id="quantity"
                                className="input-field"
                                min="1"
                                required />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="buyerName">Buyer Name</label>
                            <input
                                type="text"
                                id="buyerName"
                                name="buyerName"
                                className="input-field"
                                value={user.displayName}
                                readOnly />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="buyerEmail">Buyer Email</label>
                            <input
                                type="email"
                                id="buyerEmail"
                                name="buyerEmail"
                                value={user.email}
                                className="input-field"
                                readOnly />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="buyingDate">Buying Date</label>
                            <input
                                type="date"
                                id="buyingDate"
                                name="buyingDate"
                                value={buyingDate}
                                className="input-field"
                                readOnly />
                        </div>
                        <button
                            type="submit"
                            className="submit-button"
                            disabled={quantity === 0}
                        >
                            Purchase
                        </button>
                    </form>
                    <ToastContainer />
                </div>
                <div className="bg-white m-8 p-8 rounded-lg shadow-lg max-w-xs w-full">
                    <h1 className="text-3xl">Available Quantity: {quantity}</h1>
                    <h1 className="text-3xl">Order Count: {orderCount ? orderCount : 0}</h1>
                </div>
            </div>
        </>

    );
};

export default PurchasePage;
