
import { ToastContainer } from "react-toastify";
import { useLoaderData } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const PurchasePage = () => {
    const loadedData = useLoaderData();
    const { _id, food_image, quantity, food_name, price, orderCount } = loadedData;
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
        const newData = { food_name, food_image, quantity, buyerName, buyerEmail, price, buyingDate, }
        console.log(newData)
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
            })
    }



    return (
        <>
           <Helmet>
                <meta charSet="utf-8" />
                <title>About Us</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div className="md:flex justify-around items-center md:p-20 bg-gray-100 min-h-screen">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                    <h1 className="text-2xl font-bold text-center mb-6">Purchase Food</h1>
                    <form onSubmit={handlePurchase} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="food_name">Food Name</label>
                            <input
                                type="text"
                                name="food_name"
                                id="food_name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                value={food_name}
                                readOnly />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="food_name">Food Image</label>
                            <input
                                type="text"
                                name="food_image"
                                id="food_image"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                value={food_image}
                                readOnly />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="price">Price</label>
                            <input
                                type="number"
                                name="price"
                                id="price"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                value={price}
                                readOnly />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="quantity">Quantity</label>
                            <input
                                type="number"
                                name="quantity"
                                id="quantity"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                min="1"
                                required />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="buyerName">Buyer Name</label>
                            <input
                                type="text"
                                id="buyerName"
                                name="buyerName"
                                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" value={user.displayName} readOnly />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="buyerEmail">Buyer Email</label>
                            <input
                                type="email"
                                id="buyerEmail"
                                name="buyerEmail"
                                value={user.email}
                                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                readOnly />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="buyerEmail">Buying Date</label>
                            <input
                                type="date"
                                id="buyingDate"
                                name="buyingDate"
                                value={buyingDate}
                                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                readOnly />
                        </div>
                        <button type="submit"
                            className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
