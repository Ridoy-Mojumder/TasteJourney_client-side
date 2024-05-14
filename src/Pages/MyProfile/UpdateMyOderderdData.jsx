import { Helmet } from "react-helmet";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";


const UpdateMyOrderedData = () => {
    const loadedData = useLoaderData();
    const { _id,food_image, food_name, price, quantity } = loadedData;



    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const food_image = form.food_image.value;
        const food_name = form.food_name.value
        const price = form.price.value;
        const quantity = form.quantity.value;
        const newOrderedData = { food_image, food_name, price,quantity }
        console.log(newOrderedData)

        fetch(`http://localhost:5000/purchase/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newOrderedData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Update Successfully!",
                        text: "Your Coffee has been Updated.",
                        icon: "success"
                    });
                }
            })
    }


    return (
        <div className="p-20 flex justify-center items-center">
             <Helmet>
                <meta charSet="utf-8" />
                <title>Update my Order</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <form onSubmit={handleSubmit} className="p-4 w-1/2 border-2 border-orange-700 shadow-xl">
                <h2 className="text-3xl font-bold p-4">Update Order</h2>
                <div>
                    <label htmlFor="food_name" className="text-xl font-bold">Food Name:</label>
                    <input
                        type="text"
                        id="food_name"
                        name="food_name"
                        defaultValue={food_name}
                        className="w-full p-2 border rounded-lg"
                        readOnly
                    />
                </div>
                <div>
                    <label htmlFor="food_image" className="text-xl font-bold">Food Image:</label>
                    <input
                        type="text"
                        id="food_image"
                        name="food_image"
                        defaultValue={food_image}
                        className="w-full p-2 border rounded-lg"
                        readOnly
                    />
                </div>
                <div>
                    <label htmlFor="quantity" className="text-xl font-bold">Food Quantity:</label>
                    <input
                        type="text"
                        id="quantity"
                        name="quantity"
                        defaultValue={quantity}
                        className="w-full p-2 border rounded-lg"
                    />
                </div>
                <div>
                    <label htmlFor="price" className="text-xl font-bold">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        defaultValue={price}
                        className="w-full p-2 border rounded-lg"
                        readOnly
                    />
                </div>
                <div className="flex justify-center items-center py-5">
                    <button type="submit" className="text-xl font-bold btn text-center">Update</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateMyOrderedData;
