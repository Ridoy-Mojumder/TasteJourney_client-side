import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Lottie from 'react-lottie';
import animationData from './ContacctUs.json';
import 'animate.css';

const ContactUs = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4  animate__zoomIn">
            <div className="max-w-6xl mx-auto animate__zoomIn">
                <div className="flex flex-col md:flex-row items-center justify-around">
                    <div className="mb-6 md:mb-0">
                        <Lottie options={defaultOptions} className="h-auto w-auto" />
                    </div>
                    <div className="md:w-1/2">
                        <h1 className="text-4xl font-bold mb-4 text-[#45bfca] text-center">Contact Us</h1>
                        <p className="text-lg mb-6 text-center">We had love to hear from you! Feel free to reach out to us with any questions, feedback, or inquiries.</p>
                        {/* Contact Form */}
                        <form className="max-w-lg mx-auto">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <label htmlFor="name" className="block text-gray-600 font-bold my-4">Your Name</label>
                                    <input type="text" id="name" name="name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#45bfca]" placeholder="Enter your name" required />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-gray-600 font-bold my-4">Your Email</label>
                                    <input type="email" id="email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#45bfca]" placeholder="Enter your email" required />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="message" className="block text-gray-600 font-bold my-4">Message</label>
                                <textarea id="message" name="message" rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#45bfca]" placeholder="Write your message here" required></textarea>
                            </div>
                            <button type="submit" className="bg-[#45bfca] text-white px-6 py-3 rounded-lg hover:bg-[#3ea7b1] transition duration-300">Send Message</button>
                        </form>
                    </div>
                </div>
                {/* Contact Information */}
                <div className="mt-12">
                    <h2 className="text-3xl font-bold mb-4 text-[#45bfca]">Contact Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-lg mb-2"><strong>Address:</strong> 123 Main Street, Cityville, Country</p>
                            <p className="text-lg mb-2"><strong>Phone:</strong> +1 234 567 890</p>
                            <p className="text-lg mb-2"><strong>Email:</strong> info@example.com</p>
                            
                        </div>
                        <div>
                            <p className="text-lg mb-2"><strong>Follow Us:</strong></p>
                            <div className="flex items-center space-x-4">
                                <a href="#" className="text-blue-500 hover:text-blue-600" target="_blank" rel="noopener noreferrer"><FaFacebook size={24} /></a>
                                <a href="#" className="text-blue-400 hover:text-blue-500" target="_blank" rel="noopener noreferrer"><FaTwitter size={24} /></a>
                                <a href="#" className="text-red-500 hover:text-red-600" target="_blank" rel="noopener noreferrer"><FaInstagram size={24} /></a>
                                <a href="#" className="text-blue-700 hover:text-blue-800" target="_blank" rel="noopener noreferrer"><FaLinkedin size={24} /></a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Map (if applicable) */}
                <div className="mt-12">
                    <h2 className="text-3xl font-bold mb-4">Location</h2>
                    <div className="aspect-w-16 aspect-h-9">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.9310175372585!2d-122.08475368468335!3d37.422006979829646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808580a3cb6030e7%3A0x171fc04521f5f964!2sGoogleplex!5e0!3m2!1sen!2sus!4v1619121575647!5m2!1sen!2sus" className="w-full h-full rounded-lg" allowfullscreen="" loading="lazy"></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
