import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyOrderdItems = () => {
    const { user } = useContext(AuthContext);
    const [myAddedOrder, setMyAddedOrder] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/purchase`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                return res.json();
            })
            .then(data => {
                setMyAddedOrder(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching foods:", error);
                setError('Failed to fetch data. Please try again later.');
                setLoading(false);
            });
    }, [user]);

    // Filter myAddedOrder based on the currently logged-in user's email
    const filteredOrders = myAddedOrder.filter(order => order.buyerEmail === user.email);

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

                fetch(`http://localhost:5000/purchase/${_id}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Coffee has been deleted.",
                                icon: "success"
                            });
                            const remaining = myAddedOrder.filter(coffee => coffee._id !== _id);
                            setMyAddedOrder(remaining);
                        }
                    })
            }
        });

    };



    return (
        <div className="flex justify-center">
            <table className="border-collapse border border-gray-500 shadow-lg w-full">
                <thead>
                    <tr>
                        <th className="border border-gray-500 px-4 py-2">Food Image</th>
                        <th className="border border-gray-500 px-4 py-2">Food Name</th>
                        <th className="border border-gray-500 px-4 py-2">Price</th>
                        <th className="border border-gray-500 px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {loading && (
                        <tr>
                            <td colSpan="4" className="text-center py-4">Loading...</td>
                        </tr>
                    )}
                    {error && (
                        <tr>
                            <td colSpan="4" className="text-center py-4">{error}</td>
                        </tr>
                    )}
                    {filteredOrders.map(order => (
                        <tr key={order._id}>
                            {order.buyerEmail === user.email &&
                                <>
                                    <td className="border border-gray-500 px-4 py-2 "><img src={order.food_image} alt={order.food_name} className="w-32 h-32" /></td>
                                    <td className="border border-gray-500 px-4 py-2">{order.food_name}</td>
                                    <td className="border border-gray-500 px-4 py-2">${order.price}</td>
                                    <td className="border border-gray-500 px-4 py-2 ">
                                        <Link to = {`/updateMyOrderItems/${order._id}`}>
                                            <button className="mr-10">Update</button>
                                        </Link>
                                        <button onClick={()=>handleDelete(order._id)}>Delete</button>
                                    </td>
                                </>
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyOrderdItems;





