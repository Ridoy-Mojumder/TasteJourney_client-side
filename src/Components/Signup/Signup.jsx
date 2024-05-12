import { useContext, useState } from 'react';
import Lottie from 'react-lottie';
import { Link, useNavigate } from 'react-router-dom';
import animationData from './signUp.json';
import { AuthContext } from '../../Provider/AuthProvider';
import { updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup = () => {
    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [registerError, setRegisterError] = useState('');
    const [passwordShow, setPasswordShow] = useState(false);
    const [password, setPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        photoURL: '',
        email: '',
        password: ''
    });

    // Function to handle form submission

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordShow(newPassword !== '');
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSignUp = (e) => {
        e.preventDefault();

        const { name, photoURL, email, password } = formData;

        if (!name || !photoURL || !email || !password) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill in all fields.',
            });
            return;
        }




        if (password.length < 6) {
            setRegisterError('Password should be 6 characters or longer.');
            return;
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/.test(password)) {
            setRegisterError('Password must be at least 8 and at most 15 characters, and contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character.');
            return;
        }

        setRegisterError('');

        createUser(email, password, { displayName: name, photoURL: photoURL })
            .then(result => {
                setPasswordShow(false);
                setPassword(false)
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: photoURL
                })
                    .then(() => {
                        Swal.fire("Registration Successfully");
                        console.log("profile updated")
                    })
                    .catch(error => {
                        console.log(error);
                    })
                setFormData({
                    name: '',
                    photoURL: '',
                    email: '',
                    password: ''
                });
                navigate("/");
            })
            .catch(error => {
                console.error(error);
                setRegisterError(error.message);
            });
    };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-8 mx-8">
            <div className='flex min-h-screen w-full flex-col bg-[#edf7f8] md:flex-row items-center md:space-x-12 p-8 rounded-2xl shadow-2xl justify-center'>
                <div className="mb-6 md:mb-0 flex-shrink-0">
                    <Lottie options={defaultOptions} height={500} width={550} />
                </div>
                <form className="flex flex-col space-y-8 w-full max-w-md" onSubmit={handleSignUp}>
                    <h1 className="text-4xl font-bold text-[#45bfca] text-center">Sign Up</h1>
                    {registerError && <h1 className="text-xl font-bold mb-4 text-red-500 text-center">{registerError}</h1>}

                    <input
                        type="text"
                        placeholder="Name"
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#70abb1]"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#70abb1]"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Photo URL"
                        name='photoURL'
                        value={formData.photoURL}
                        onChange={handleChange}
                        className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#70abb1]"
                    />
                    <div className="relative w-[80%] md:w-[60%]">
                        <input
                            type={!passwordShow ? 'text' : 'password'}
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="p-4 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#70abb1]"
                            required
                        />
                        {password && (
                            <span
                                onClick={() => setPasswordShow(!passwordShow)}
                                className="absolute top-3 right-2 cursor-pointer text-[14px] text-black text-2xl "
                            >
                                {passwordShow ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="bg-[#54c3cf] text-white text-xl p-4 rounded-lg hover:bg-[#4fd2e0] transition-colors"
                    >
                        Sign Up
                    </button>
                    <Link to='/login' className="text-center text-gray-400">Already have an account? <span className="text-[#45bfca]">Log In</span></Link>
                </form>
            </div>
        </div>
    );
};

export default Signup;
