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
        fetch(`https://taste-journey-server-side.vercel.app/purchase`)
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

                fetch(`https://taste-journey-server-side.vercel.app/purchase/${_id}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
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
            <table className="min-w-full leading-normal">
                <thead>
                    <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">
                            Food Image
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Food Name
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Price
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Date
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {loading && (
                        <tr>
                            <td colSpan="4" className="text-center py-4 text-sm text-gray-900 bg-white">
                                Loading...
                            </td>
                        </tr>
                    )}
                    {error && (
                        <tr>
                            <td colSpan="4" className="text-center py-4 text-sm text-red-500 bg-white">
                                {error}
                            </td>
                        </tr>
                    )}
                    {filteredOrders.map(order => (
                        <tr key={order._id} className="hover:bg-gray-100">
                            {order.buyerEmail === user.email &&
                                <>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <div className="flex justify-center items-center">
                                            <img src={order.food_image} alt={order.food_name} className="w-32 h-32 object-cover" />
                                        </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {order.food_name}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        ${order.price}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {order.buyingDate}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <Link to={`/updateMyOrderItems/${order._id}`}>
                                            <button className="text-blue-500 hover:text-blue-800 px-4 py-2 rounded">Update</button>
                                        </Link>
                                        <button onClick={() => handleDelete(order._id)} className="text-red-500 hover:text-red-800 ml-4 px-4 py-2 rounded">Delete</button>
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





