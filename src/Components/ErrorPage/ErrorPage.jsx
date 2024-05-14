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
            <div className="mb-12">
                <Lottie options={defaultOptions} className="h-auto w-auto" />
            </div>
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops! Page Not Found</h1>
                <p className="text-lg text-gray-600 mb-8">The page you are looking for might have been removed or its name changed.</p>
                <Link to="/">
                    <button className="px-8 py-3 text-lg text-white bg-blue-500 rounded-md hover:bg-blue-700 transition duration-200">
                        Go Home
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
