import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { user, loading } = useContext(AuthContext);

    const path = location.pathname;

    if (loading) {
        return (
            <div className='w-full flex justify-center items-center py-56 bg-[#F1F1F8]'>
                <p className='font-bold text-4xl pr-8'>Loading {path.slice(1, 2).toUpperCase() + path.slice(2)}</p>
                <span className="loading loading-dots w-16"></span>
            </div>
        );
    }

    if (!user) return <Navigate to='/login' state={location.pathname}></Navigate>

    if (children) {
        return children;
    }

};

export default PrivateRoute;