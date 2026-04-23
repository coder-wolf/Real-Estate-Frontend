import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Slider from '../Slider/Slider';

const Banner = () => {
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState(0);


    const [location, setLocation] = useState("");
    const [buyOrRent, setBuyOrRent] = useState("Rent");
    const [startDate, setStartDate] = useState(new Date());

    const buyOrRentItems = ["Rent", "Buy",]

    const handleChangeTab = tab => {
        setSelectedTab(tab);
        setBuyOrRent(buyOrRentItems[tab]);
    }

    return (
        <div className="bg-[#F4F4FB] pb-16 grid lg:grid-cols-6">
            <div className="flex-col lg:flex-row-reverse lg:px-32 md:px-16 px-8 lg:col-span-4 col-span-1">
                <img
                    src=""
                    className="w-1/2 rounded-lg shadow-2xl" />
                <div className='md:w-2/3  pt-32 pb-16 md:pr-10'>
                    <h1 className="text-5xl font-semibold">Buy, rent, or sell your property easily</h1>
                    <p className="py-6 font-medium">
                        A great platform to buy, sell or even rent your properties without any commisions.
                    </p>
                    <div className='flex gap-16 mb-10'>
                        <div className='flex flex-col border-l-2 pl-4'>
                            <span className='text-[#675AEF] text-4xl font-semibold'>50k+</span>
                            <span className='text-gray-500'>renters</span>
                        </div>
                        <div className='flex flex-col border-l-2 pl-4'>
                            <span className='text-[#675AEF] text-4xl font-semibold'>10k+</span>
                            <span className='text-gray-500'>buyers</span>
                        </div>
                    </div>
                    <div className=''>
                        <button onClick={() => handleChangeTab(0)} className={`bg-white p-2 px-6 ${selectedTab == 0 ? "border-b-2 border-[#7266F1]" : ""}`}>Rent</button>
                        <button onClick={() => handleChangeTab(1)} className={`bg-white p-2 px-6 ${selectedTab == 1 ? "border-b-2 border-[#7266F1]" : ""}`}>Buy</button>
                        {/* <button onClick={() => handleChangeTab(2)} className={`bg-white p-2 px-6 ${selectedTab == 2 ? "border-b-2 border-[#7266F1]" : ""}`}>Sell</button> */}
                    </div>
                    <div className='grid md:grid-cols-3 grid-cols-2 gap-4 bg-white shadow-xl rounded-lg p-4 md:w-max items-center'>
                        <div className='flex flex-col border-r-2 mr-5 '>
                            <span className='text-gray-400'>Location</span>
                            <span className='font-semibold'>Barcelona, Spain</span>
                        </div>
                        <div className='flex flex-col md:border-r-2 mr-3 pr-4 '>
                            <span className='text-gray-400'>When</span>
                            {/* <span className='font-semibold'>Select Move-in Date</span> */}
                            <DatePicker className='font-semibold' selected={startDate} onChange={(date) => setStartDate(date)} />
                        </div>
                        <div className='col-span-2 md:col-span-1 ml-auto bg-red'>
                            <button
                                onClick={() => navigate(
                                    '/listing',
                                    {
                                        state: {
                                            location,
                                            buyOrRent,
                                            startDate,
                                        }
                                    }
                                )}
                                className='bg-[#7065F0] text-white p-3 px-5 rounded-md'
                            >Browse Properties</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='lg:col-span-2 hidden lg:block my-auto mx-4'>
                <Slider></Slider>
            </div>
        </div>
    );
};

export default Banner;