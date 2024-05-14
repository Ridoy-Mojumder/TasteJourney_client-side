import { Link, useLoaderData } from "react-router-dom";

const ViewDetails = () => {
    const loadedData = useLoaderData();
    const {_id ,food_name, food_image, food_category, quantity, price, added_by, food_origin, description,orderCount } = loadedData;
    const { name, email } = added_by;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg overflow-hidden p-8 m-8 ">
            <img className="w-full h-auto rounded-lg object-cover" src={food_image} alt={food_name} />

            <div className="flex flex-col justify-center">
                <h2 className="text-[#45bfca] text-3xl font-bold mb-4">{food_name}</h2>
                <p className="text-gray-600 text-lg mb-2"><span className="font-bold">Category:</span> {food_category}</p>
                <p className="text-gray-600 text-lg mb-2"><span className="font-bold">Quantity:</span> {quantity}</p>
                <p className="text-gray-600 text-lg mb-2"><span className="font-bold">Price:</span> {price}</p>
                <p className="text-gray-600 text-lg mb-2"><span className="font-bold">OrderCount:</span> {orderCount}</p>
                <div className="flex items-center mb-2">
                    <span className="font-bold mr-2">Added By:</span><br />
                    <div className="flex flex-col">
                        <span className="text-gray-800">Name: {name}</span>
                        <span className="text-gray-800">Email: {email}</span>
                    </div>
                </div>
                <p className="text-gray-600 text-lg mb-2"><span className="font-bold">Origin:</span> {food_origin}</p>
                <p className="text-gray-600 text-lg mb-4">{description}</p>
                <Link to={`/purchesPage/${_id}`} className="w-full">
                    <button className="bg-[#45bfca] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#429b93] transition-colors duration-200 ease-in-out">
                        Purchase
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ViewDetails;
