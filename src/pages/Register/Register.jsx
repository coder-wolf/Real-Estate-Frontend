import googleLogo from './../../assets/google.png';
import githubLogo from './../../assets/github.png';
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet-async';

const Register = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const {
        user,
        loading,
        createUser,
        updateName,
        updatePhotoURL,
        signIn,
        signInWithGoogle,
        signInWithGithub,
        logOut,
    } = useContext(AuthContext);

    const handleRegister = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);

        const name = form.get('name');
        const email = form.get('email');
        const photo = form.get('photo');
        const password = form.get('password');

        // password verification
        if (password.length < 6) {
            toast.error("Password can't be less than 6 charecters.");
            return;
        }

        if (!/^(?=.*[a-z])(?=.*[A-Z]).+$/.test(password)) {
            toast.error("Password must have at least one uppercase and one lowercase charecter.");
            return;
        }

        createUser(email, password)
            .then(result => {
                console.log(result)
                toast.success("Registration successful!");
                updateName(name)
                    .then(result => {
                        console.log("Name Updated", result);
                    })
                    .catch(error => {
                        console.log("Update Name Error: ", error)
                    });

                updatePhotoURL(photo)
                    .then(result => {
                        console.log("Photo updated", result)
                    })
                    .catch(error => {
                        console.log("Photo Update Error", error);
                    })
                navigate("/");
            })
            .catch(error => {
                toast.error("Registration failed!");
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
                <title>Register</title>
            </Helmet>
            <div className='lg:pl-32 lg:pt-20 lg:col-span-3 lg:pr-16 p-10 md:px-32'>
                <h2 className='text-4xl font-semibold'>Welcome!</h2>
                <p className='text-gray-500 mt-2 mb-3'>Let's find your next dream house!</p>
                <div className='mt-5 mb-10'>
                    <form
                        onSubmit={handleRegister}
                        action=""
                        className="font-medium"
                    >
                        <label className="form-control w-full mb-2">
                            <div className="label">
                                <span className="label-text">Name</span>
                            </div>
                            <input name='name' type="text" placeholder="Enter your name" className="input input-bordered w-full border-gray-400" />
                        </label>
                        <label className="form-control w-full mb-2">
                            <div className="label">
                                <span className="label-text">Email <span className='text-red-500 text-lg'>*</span></span>
                            </div>
                            <input name='email' type="email" placeholder="Enter your email address" className="input input-bordered w-full border-gray-400" />
                        </label>
                        <label className="form-control w-full mb-2">
                            <div className="label">
                                <span className="label-text">Photo URL<span className='text-red-500 text-lg'>*</span></span>
                            </div>
                            <input name='photo' type="text" placeholder="Enter your profile photo URL" className="input input-bordered w-full border-gray-400" />
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
                            <span className='text-black'>Already have an account?
                                <Link to='/login' className="font-bold text-[#7065F0] pl-1"> Login</Link>
                            </span>
                        </div>
                        <button className='mb-2 bg-[#7065F0] mt-1 py-3 px-6 text-white w-full rounded-lg'>Register</button>
                    </form>
                    <div className="divider ">OR</div>
                    <button
                        onClick={handleSignInWithGoogle}
                        className='mb-2 flex items-center justify-center gap-4 bg-white border-2 mt-1 py-3 px-6 text-black w-full rounded-lg font-medium'>
                        <img src={googleLogo} className='h-6' alt="" />
                        Sign up with Google</button>
                    <button
                        onClick={handleSignInWithGithub}
                        className='mb-2 flex items-center justify-center gap-4 bg-white border-2 mt-1 py-3 px-6 text-black w-full rounded-lg font-medium'>
                        <img src={githubLogo} className='h-6' alt="" />
                        Sign up with Github</button>
                </div>
            </div>
            <div className='col-span-3 hidden lg:block'>
                <img
                    src="https://static.vecteezy.com/system/resources/previews/032/469/692/non_2x/hand-drawn-real-estate-agent-character-in-flat-style-vector.jpg"
                    alt=""
                    className='ml-32 pl-20 mt-40 object-cover'
                />
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;