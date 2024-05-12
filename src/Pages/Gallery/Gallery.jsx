import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Lottie from "react-lottie";
import animationData from './feedback.json'
import Swal from "sweetalert2";

const Gallery = () => {
    const { user } = useContext(AuthContext);
    const [galleryAllData, setGalleryAllData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };


    const handleFeedback = (e, _id) => {
        e.preventDefault();
        const form = e.target;
        const feedback = form.feedback.value;
        const photoURL = form.photoURL.value
        const name = form.name.value;
        const email = form.email.value;
        const newFeedback = { feedback, photoURL, name, email }
        console.log(newFeedback)


        fetch('http://localhost:5000/GalleryData', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newFeedback)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
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
        fetch(`http://localhost:5000/GalleryData`,{credentials: 'include'})
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
        // <div className="relative bg-blue-50  w-full h-full" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 26%)" }}>
        <div className=" w-full h-full bg-[#f3f9fc]">
            <div className="carousel-item relative w-full mb-16">
                <div className="relative w-full">
                    <img src="https://i.ibb.co/YcHk0yf/man-mechanic-working-with-screwdriver-repair-motorcycle-detail-151013-39125.jpg" className="w-full h-60 object-cover" />
                </div>
                <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-center items-center rounded-xl bg-gradient-to-r from-[#151515] to-[rgb(21, 21, 21, 0)]">
                    <div className="text-white p-4 md:p-16 mt-auto text-center">
                        <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold mb-2 md:mb-0">Gallery</h1>
                        <div className="bg-[#45bfca] bottom-0 m-10 p-2 px-16 flex justify-center items-center" style={{ clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)" }}>
                            <NavLink to='/' className="text-white">Home | Gallery</NavLink>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className="text-5xl font-semibold text-[#52c9af] my-10 text-center font-dancing relative">
                Here you can post your feedback
                <span className="absolute left-1/2 transform -translate-x-1/2 h-px w-96 -bottom-4 bg-[#52c9af]"></span>
            </h1>





            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <div className="flex justify-center items-center">
                <button className="h-16 w-1/2 text-2xl text-center bg-[#45bfca] text-white font-extrabold" onClick={() => document.getElementById('my_modal_3').showModal()}>Click to Add your feedback</button>
            </div>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box w-full">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className="grid grid-cols-1 ">

                        <div>
                            <div className="mb-6 md:mb-0 flex-shrink-0 relative">
                                <Lottie options={defaultOptions} height={500} width={450} />
                            </div>
                        </div>
                        <div className="w-auto absolute flex justify-start items-start p-10 shadow-2xl rounded-xl  m-2">
                            <form className=" flex flex-col justify-center text-[#f53218] " onSubmit={handleFeedback}>
                                <label htmlFor="feedback" className="text-[#f53218]  font-extrabold text-2xl mb-2 bg-none">Your Feedback:</label>
                                <textarea
                                    id="feedback"
                                    name="feedback"
                                    rows="5"
                                    cols="50"
                                    className="border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:border-[#52c9af] w-full bg-transparent "
                                    placeholder="Write your feedback here..."
                                    required
                                ></textarea>


                                <label htmlFor="photoURL" className="text-[#f53218]  font-extrabold text-2xl mb-2">Upload an Image:</label>
                                <input 
                                type="text" 
                                id="photoURL" 
                                name="photoURL" 
                                className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full focus:outline-none focus:border-[#52c9af] bg-transparent" 
                                accept="photoURL/*" />

                                <label htmlFor="name" className="text-[#f53218]  font-extrabold text-2xl mb-2">Your Name:</label>
                                <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                value={user.displayName} 
                                className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full focus:outline-none focus:border-[#52c9af] bg-transparent" 
                                placeholder="Enter your name..." 
                                readOnly />

                                <label htmlFor="email" className="text-[#f53218] font-extrabold text-2xl mb-2">Your Email:</label>
                                <input 
                                type="email" 
                                id="email" 
                                value={user.email} 
                                name="email" 
                                className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full focus:outline-none focus:border-[#52c9af] bg-transparent " 
                                placeholder="Enter your email..." 
                                readOnly />

                                <button type="submit" className="bg-[#45bfca] text-white px-4 py-2 rounded-md hover:bg-[#33858d] transition-colors duration-200 ease-in-out">Submit</button>
                            </form>
                        </div>
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
                    <h1 className="text-5xl font-bold text-[#52c9af] my-10 text-center">Here our all User Feedback</h1>


                    {/* Displaying food cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {galleryAllData.map((galleryData, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md p-6">
                                <div className="relative">
                                    <img src={galleryData.photoURL} alt={galleryData.food_name} className="w-full h-72 md:h-60 object-cover mb-4 rounded-lg cursor-pointer" />
                                    <div className="absolute inset-0 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                        <div className="bg-black bg-opacity-75 p-4 rounded-md text-white text-center">
                                            <p className="text-lg font-semibold">User Name: {galleryData.name}</p>
                                            <p className="text-lg font-semibold">User Email: {galleryData.email}</p>
                                        </div>
                                    </div>
                                    <p>FeedBack: {galleryData.feedback}</p>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            )}






        </div>
        // </div>
    );
};

export default Gallery;
