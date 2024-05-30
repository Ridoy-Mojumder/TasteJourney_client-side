import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const Gallery = () => {
    const { user } = useContext(AuthContext);
    const [galleryAllData, setGalleryAllData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);



    const handleFeedback = (e, _id) => {
        e.preventDefault();
        const form = e.target;
        const feedback = form.feedback.value;
        const photoURL = form.photoURL.value
        const name = form.name.value;
        const email = form.email.value;
        const newFeedback = { feedback, photoURL, name, email }
        // console.log(newFeedback)


        fetch('https://taste-journey-server-side.vercel.app/GalleryData', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newFeedback)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your feedback Added Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    const remaining = galleryAllData.filter(data => data._id !== _id);
                    setGalleryAllData(remaining);
                }
            })
    };

    useEffect(() => {
        fetch(`https://taste-journey-server-side.vercel.app/GalleryData`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                setGalleryAllData(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching foods:", error);
                setIsLoading(false);
            });
    }, [user]);





    return (

        <div className=" w-full h-full bg-slate-50">
    <Helmet>
        <meta charSet="utf-8" />
        <title>Gallery</title>
        <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
    <div className="carousel-item relative w-full mb-16">
        <div className="relative w-full">
            <img src="https://i.ibb.co/YcHk0yf/man-mechanic-working-with-screwdriver-repair-motorcycle-detail-151013-39125.jpg" className="w-full h-60 object-cover" />
        </div>
        <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-center items-center bg-gradient-to-r from-gray-900 to-transparent rounded-xl">
            <div className="text-white p-4 md:p-16 mt-auto text-center">
                <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold mb-2 md:mb-0">Gallery</h1>
                <div className="bg-teal-500 bottom-0 m-10 p-2 px-16 flex justify-center items-center rounded-lg">
                    <NavLink to='/' className="text-white">Home | Gallery</NavLink>
                </div>
            </div>
        </div>
    </div>
    <h1 className="text-5xl font-semibold text-teal-600 my-10 text-center font-dancing relative">
        Here you can post your feedback
        <span className="absolute left-1/2 transform -translate-x-1/2 h-px w-96 -bottom-4 bg-teal-600"></span>
    </h1>

    <div className="flex justify-center items-center">
        <button className="h-16 w-1/2 text-2xl text-center bg-teal-500 text-white font-extrabold" onClick={() => document.getElementById('my_modal_3').showModal()}>Click to Add your feedback</button>
    </div>
    <dialog id="my_modal_3" className="modal">
        <div className="modal-box w-full">
            <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <div className="grid grid-cols-1 p-10">
                <form className=" flex flex-col text-teal-700" onSubmit={handleFeedback}>
                    <label htmlFor="feedback" className="font-bold text-xl mb-2">Your Feedback:</label>
                    <textarea
                        id="feedback"
                        name="feedback"
                        rows="2"
                        cols="20"
                        className="border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:border-teal-600 w-full"
                        placeholder="Write your feedback here..."
                        required
                    ></textarea>

                    <label htmlFor="photoURL" className="font-bold text-xl mb-2">Upload an Image:</label>
                    <input
                        type="text"
                        id="photoURL"
                        name="photoURL"
                        className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full focus:outline-none focus:border-teal-600"
                        accept="photoURL/*" />

                    <label htmlFor="name" className="font-bold text-xl mb-2">Your Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={user.displayName}
                        className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full focus:outline-none focus:border-teal-600"
                        placeholder="Enter your name..."
                        readOnly />

                    <label htmlFor="email" className="font-bold text-xl mb-2">Your Email:</label                    >
                        <input
                            type="email"
                            id="email"
                            value={user.email}
                            name="email"
                            className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full focus:outline-none focus:border-teal-600"
                            placeholder="Enter your email..."
                            readOnly
                        />

                    <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-colors duration-300">Submit</button>
                </form>
            </div>
        </div>
    </dialog>

    {isLoading ? (
        <div className="flex items-center justify-center h-screen">
            <div className="flex justify-center items-center my-32">
                <img src="https://i.ibb.co/ZSppyKq/Rotating-globe.gif" alt="" className="w-20" />
            </div>
        </div>
    ) : (
        <div className="food-card-container my-10">
            <h1 className="text-5xl font-bold text-teal-600 my-10 text-center">Here are all User Feedback</h1>

            {/* Displaying feedback cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-5">
                {galleryAllData.map((galleryData, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
                        <div className="relative group">
                            <img src={galleryData.photoURL} alt={galleryData.food_name} className="w-full h-72 md:h-60 object-cover mb-4 rounded-t-lg group-hover:opacity-75 transition-opacity duration-300" />
                            <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
                                <div className="text-center text-white p-4 rounded-lg">
                                    <p className="text-lg font-semibold">User Name: {galleryData.name}</p>
                                    <p className="text-lg font-semibold">Feedback: {galleryData.feedback}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-2">{galleryData.food_name}</h2>
                            <p className="text-sm text-gray-700 mb-4">Feedback: {galleryData.feedback}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )}
</div>


    );
};

export default Gallery;
