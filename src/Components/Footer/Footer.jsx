import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Lottie from 'react-lottie';
import animationData from './logo.json';
import { Link } from 'react-router-dom';

const Footer = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <footer className="flex flex-col text-black bg-gradient-to-b from-gray-200 to-gray-100">
            {/* Contact Information */}
            <div className="bg-sky-100 py-5 text-center text-sm">
                <div className="flex justify-around items-center py-0">
                    <aside className="text-xl flex items-center">
                        {/* Website Logo */}
                        <div className="mb-6 md:mb-0">
                            <Lottie options={defaultOptions} height={150} width={150} />
                        </div>
                        {/* Website Name */}
                        <p className="font-bold text-2xl">TasteJourney</p>
                    </aside>
                    <nav className="flex flex-col gap-3 text-lg">
                        <ul className='flex gap-5'>
                            <li>
                                <Link to='/' className="cursor-pointer hover:underline">Home</Link>
                            </li>
                            <li>
                                <Link to='contactUs' className="cursor-pointer hover:underline">Contact</Link>
                            </li>
                            <li>
                                <Link to='/aboutUs' className="cursor-pointer hover:underline">About</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                {/* Copyright */}
                <p>&copy; 2024 TasteJourney. All Rights Reserved.</p>
                {/* Social Media Links */}
                <div className="flex justify-center gap-3 mt-3">
                    <a href="#" className="hover:opacity-80"><FaFacebook size={24} /></a>
                    <a href="#" className="hover:opacity-80"><FaTwitter size={24} /></a>
                    <a href="#" className="hover:opacity-80"><FaInstagram size={24} /></a>
                    <a href="#" className="hover:opacity-80"><FaLinkedin size={24} /></a>
                </div>
                {/* Address */}
                <p className="mt-3">123 Main Street, Cityville, Country</p>
                {/* Phone Number */}
                <p>Phone: +1 123 456 7890</p>
                {/* Email */}
                <p>Email: info@tastejourney.com</p>
            </div>
        </footer>
    );
};

export default Footer;
