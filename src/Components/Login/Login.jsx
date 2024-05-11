import { useState } from 'react';
import Lottie from 'react-lottie';
import animationData from './Login.json';
import animationData2 from './google.json';
import { Link } from 'react-router-dom';
import {  FaGithub } from 'react-icons/fa';

const Login = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    const defaultOptions2 = {
        loop: true,
        autoplay: true,
        animationData: animationData2,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Function to handle form submission
    const handleLogin = (event) => {
        event.preventDefault();
        console.log("Login attempt with", username, password);
        // Add login logic here
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-8 mx-8">
            <div className='flex min-h-screen w-full flex-col bg-[#edf7f8] md:flex-row items-center md:space-x-12  p-8 rounded-2xl shadow-2xl  justify-center'>
                <div className="mb-6 md:mb-0 flex-shrink-0">
                    <Lottie options={defaultOptions} height={500} width={550} />
                </div>
                <form className="flex flex-col space-y-8 w-full max-w-md" onSubmit={handleLogin}>
                    <h1 className="text-4xl font-bold text-[#45bfca] text-center">Login</h1>
                    <input
                        type="text"
                        placeholder="Username"
                        className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#70abb1]"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#70abb1]"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="bg-[#54c3cf] text-white text-xl p-4 rounded-lg hover:bg-[#4fd2e0] transition-colors"
                    >
                        Log In
                    </button>
                    <div className="flex justify-center space-x-4">
                    <button className="bg-[#f1f1f1] text-black text-xl p-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-300 transition-colors">
                            
                            <Lottie options={defaultOptions2} height={50} width={55} />
                            Google Login
                        </button>
                        <button className="bg-gray-900 text-white text-xl p-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
                            <FaGithub />
                            GitHub Login
                        </button>
                    </div>
                    <Link to='/signUp' className="text-center text-gray-400">Do not have an account? <span className="text-[#45bfca]">Create one</span></Link>
                </form>
            </div>
        </div>
    );
};

export default Login;
