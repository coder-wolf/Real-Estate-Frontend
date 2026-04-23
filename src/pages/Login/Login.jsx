import googleLogo from './../../assets/google.png';
import githubLogo from './../../assets/github.png';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet-async';


const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const {
        user,
        loading,
        createUser,
        signIn,
        signInWithGoogle,
        signInWithGithub,
        logOut,
    } = useContext(AuthContext);

    const handleSignIn = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);

        const email = form.get('email');
        const password = form.get('password');

        signIn(email, password)
            .then(() => {
                toast.success("Login successful!");
                navigate((location?.state ? location.state : '/'));

            })
            .catch(error => {
                toast.error("Login failed. Please try again.");
                console.log(error);
            })
    }
    const handleSignInWithGoogle = e => {
        e.preventDefault();
        signInWithGoogle()
            .then(result => {
                console.log(result);
                navigate(location?.state ? location.state : '/');
            })
            .catch(error => {
                console.log(error);
            })
    }
    const handleSignInWithGithub = e => {
        e.preventDefault();
        signInWithGithub()
            .then(result => {
                console.log(result);
                navigate(location?.state ? location.state : '/');
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className='grid lg:grid-cols-7 text-black'>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className='lg:pl-32 lg:pt-20 lg:pr-16 lg:col-span-3 p-10 md:px-32'>
                <h2 className='text-4xl font-semibold'>Welcome back!</h2>
                <p className='text-gray-500 mt-2 mb-3'>Let's find your next dream house!</p>
                <div className='lg:mt-5 lg:mb-10'>
                    <form
                        onSubmit={handleSignIn}
                        action=""
                    >
                        <label className="form-control w-full mb-2">
                            <div className="label">
                                <span className="label-text">Email <span className='text-red-500 text-lg'>*</span></span>
                            </div>
                            <input name='email' type="email" placeholder="Enter your email address" className="input input-bordered w-full border-gray-400" />
                        </label>
                        <label className="form-control w-full mb-2">
                            <div className="label">
                                <span className="label-text">Password <span className='text-red-500 text-lg'>*</span></span>
                            </div>
                            <input name='password' type="password" placeholder="Enter password" className="input input-bordered w-full border-gray-400" />
                        </label>
                        <div className='flex justify-between py-2 my-2 text-sm px-2'>
                            {/* <span className='flex items-center'>
                                <input type="checkbox" name="remember" id="remember" className='mr-2 accent-[#7065F0] ' />
                                <label htmlFor="remember">Remember me</label>
                            </span> */}
                            <span></span>
                            <span>
                                Don't have an account?
                                <Link
                                    to="/register"
                                    className='text-[#7065F0] pl-2 font-bold'>Register</Link>
                            </span>
                        </div>
                        <button className='mb-2 bg-[#7065F0] mt-1 py-3 px-6 text-white w-full rounded-lg'>Log in</button>
                        <div className="divider ">OR</div>
                    </form>
                    <button
                        onClick={handleSignInWithGoogle}
                        className='mb-2 flex items-center justify-center gap-4 bg-white border-2 mt-1 py-3 px-6 text-black w-full rounded-lg font-medium'>
                        <img src={googleLogo} className='h-6' alt="" />
                        Sign in with Google</button>
                    <button
                        onClick={handleSignInWithGithub}
                        className='mb-2 flex items-center justify-center gap-4 bg-white border-2 mt-1 py-3 px-6 text-black w-full rounded-lg font-medium'>
                        <img src={githubLogo} className='h-6' alt="" />
                        Sign in with Github</button>
                </div>
            </div>
            <div className='lg:col-span-3 hidden justify-end lg:block'>
                <img
                    src="https://static.vecteezy.com/system/resources/previews/032/469/692/non_2x/hand-drawn-real-estate-agent-character-in-flat-style-vector.jpg"
                    alt=""
                    className='lg:ml-32 lg:pl-20 lg:mt-40 object-cover'
                />
            </div>
        </div>
    );
};

export default Login;