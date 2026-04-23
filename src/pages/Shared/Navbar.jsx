import React, { useContext, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from './../../assets/logo.jpg';
import { ApiContext } from '../../providers/ApiProvider';
import { AuthContext } from '../../providers/AuthProvider';

const Navbar = () => {
    const navigate = useNavigate();
    const {
        favIds,
        updateFavHouses,
    } = useContext(ApiContext);
    const {
        user,
        logOut,
    } = useContext(AuthContext);

    const handleLogout = () => {
        logOut()
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        if (favIds.length == 0) updateFavHouses();
    }, [favIds])

    const navLinks = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/listing">All Properties</NavLink></li>
        <li><NavLink to="/favourites">Favourites ({favIds.length})</NavLink></li>
        <li><NavLink to="/profile">My Profile</NavLink></li>
        {/* <li><NavLink to="/update_profile">Update Profile</NavLink></li> */}
    </>;

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu bg-white menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {navLinks}
                        </ul>
                    </div>
                    <Link to="/" className="btn btn-ghost text-xl">
                        <img src={logo} alt="" className='h-10' />
                        <span>Estatery</span>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 font-semibold">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end ">
                    {
                        user ?
                            <div className='flex gap-3 items-center'>
                                {/* <div className='font-semibold text-sm'>{user.displayName || user.email}</div> */}
                                <Link to='/profile'>
                                    {
                                        user.photoURL ?
                                            <div className='avatar'>
                                                <div className="w-10 rounded-full border-2">
                                                    <img src={user.photoURL} title={user.displayName ? user.displayName : user.email} />
                                                </div>
                                            </div>
                                            :
                                            <div className="avatar placeholder">
                                                <div className="bg-[#2B323C] text-neutral-content w-10 rounded-full">
                                                    <span className="text-xl text-[#A6ADBB]" title={user.displayName ? user.displayName : user.email}>{user.displayName ? user.displayName[0] : user.email[0].toUpperCase()}</span>
                                                </div>
                                            </div>
                                    }
                                </Link>
                                <button onClick={handleLogout} className='border rounded-lg px-4 py-2 bg-[#7065F0] text-white'>Log Out</button>
                            </div>
                            :
                            <div className='flex gap-2'>
                                <button onClick={() => navigate('/login')} className='border rounded-lg px-4 py-2'>Login</button>
                                <button onClick={() => navigate('/register')} className='border rounded-lg px-4 py-2 bg-[#7065F0] text-white'>Sign Up</button>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;
