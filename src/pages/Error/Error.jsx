import React from 'react';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
import { useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Navbar></Navbar>
            <div className='grid grid-cols-2'>
                <div className='py-48 pt-64 px-24 pl-40 mx-auto'>
                    <h2 className="text-5xl font-bold">Page not found</h2>
                    <p className='text-xl pt-5'>This page you are looking for isn't in the market yet.</p>
                    <div className=''>
                        <button onClick={() => { navigate('/') }} className='bg-[#7065F0] text-white p-12 py-3 rounded-xl text-lg font-semibold shadow mt-7'>Go home</button>
                    </div>
                </div>
                <img className='' src="https://i.ibb.co/HxDwRr9/6333064.jpg" alt="6333064" border="0"></img>

            </div>
            <Footer></Footer>
        </div >
    );
};

export default Error;