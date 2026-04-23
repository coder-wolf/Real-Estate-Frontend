import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../pages/Shared/Navbar';
import Footer from '../../pages/Shared/Footer';
import { ToastContainer } from 'react-toastify';

const Root = () => {
    return (
        <div className=''>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
            <ToastContainer />
        </div>
    );
};

export default Root;