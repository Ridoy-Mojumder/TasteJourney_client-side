import { useContext, useState } from 'react';
import Lottie from 'react-lottie';
import animationData from './Login.json';
import animationData2 from './google.json';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaGithub } from 'react-icons/fa';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

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
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });


    const { signIn, signInWithGoogle } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState('');
    const [password, setPassword] = useState(false);
    const navigate = useNavigate();
    const [passwordShow, setPasswordShow] = useState(false);

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

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = formData;
        setLoading(true);
        setErrors('');

        await signIn(email, password)
            .then(() => {
                Swal.fire("LogIn Successfully");
                setFormData({ email: '', password: '' });
                navigate("/");
            })
            .catch(error => {
                console.error(error);
                setErrors('Invalid email or password. Please try again.');
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Invalid email or password. Please try again.',
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                Swal.fire("LogIn Successfully");
                console.log(result.user)
                navigate("/");
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-8 mx-8">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Login</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div className='flex min-h-screen w-full flex-col bg-[#edf7f8] md:flex-row items-center md:space-x-12  p-8 rounded-2xl shadow-2xl  justify-center'>
                <div className="mb-6 md:mb-0 flex-shrink-0">
                    <Lottie options={defaultOptions} height={500} width={550} />
                </div>
                <form className="flex flex-col space-y-8 w-full max-w-md" onSubmit={handleLogin}>
                    <h1 className="text-4xl font-bold text-[#45bfca] text-center">Login</h1>
                    {errors && <h1 className="text-xl font-bold mb-4 text-red-500 text-center">{errors}</h1>}
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={formData.name}
                        name= "email"
                        onChange={handleChange}
                        className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#70abb1]"
                        required
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
                        disabled={loading}
                        className={`bg-[#54c3cf] text-white text-xl p-4 rounded-lg hover:bg-[#4fd2e0] transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}

                    >
                        {loading ? 'Login In...' : 'Log In'}
                    </button>

                    <div className="flex justify-center space-x-4">
                        <button onClick={handleGoogleSignIn} className="bg-[#f1f1f1] text-black text-xl p-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-300 transition-colors">

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
