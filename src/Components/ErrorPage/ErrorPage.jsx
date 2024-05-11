
import Lottie from 'react-lottie';
import animationData from './404error.json';
import { Link } from 'react-router-dom';

const ErrorPage = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="mb-6 md:mb-0">
                <Lottie options={defaultOptions} className="h-auto w-auto" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">This is an error page</h1>
            <p className="text-lg text-gray-600">Sorry, the page you are looking for cannot be found.</p>
            <Link to='/'> 
                <button
                    className="mt-4 px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 transition duration-200"
                >
                    Go Home
                </button>
            </Link>
        </div>
    );
};

export default ErrorPage;
