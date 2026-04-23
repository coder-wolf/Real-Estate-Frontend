import Banner from '../Banner/Banner';
// import { IoIosArrowForward } from 'react-icons/io';
import { useContext, useEffect, useState } from 'react';
import { BsPlayBtn } from 'react-icons/bs';
import { ApiContext } from '../../providers/ApiProvider';
import FavListCard from '../UserProfile/FavListCard';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';

const Home = () => {
    const navigate = useNavigate();

    const [selectedTab, setSelectedTab] = useState(0);
    const [buyOrRent, setBuyOrRent] = useState("Buy")
    const {
        housesData,
        updateHousesData,
        favHouses,
        favIds,
        updateFavHouses,
    } = useContext(ApiContext);

    const handleChangeTab = tab => {
        setSelectedTab(tab);
        if (selectedTab == 0) setBuyOrRent("Buy");
        if (selectedTab == 0) setBuyOrRent("Rent");
    }

    // useEffect(() => {
    //     updateHousesData()
    // }, [housesData]);

    return (
        <div>
            <Helmet>
                <title>Estatery Home</title>
            </Helmet>
            <Banner></Banner>
            <div className='grid lg:grid-cols-2 gap-10 lg:px-32 md:px-16 px-8 pt-20 pb-5'>
                <div className='relative'>
                    <img
                        className='aspect-[1] object-cover w-10/12 md:w-full mx-auto'
                        src="https://cdn.houseplansservices.com/content/h0rig2dbr8vsg0fcgqco7acmul/w991x660.jpg?v=9"
                        alt="" />
                    <div className='absolute top-10 -left-10 bg-white p-5 px-8 rounded-lg shadow-xl flex gap-2 pl-4 '>
                        <div className='bg-[#F0EFFB] w-max p-3 border-[#7065F012] border-2 rounded-3xl'>
                            <BsPlayBtn className='text-[#5C4DEF] text-xl'></BsPlayBtn>
                        </div>
                        <div>
                            <p className="font-semibold">Virtual home tour</p>
                            <p className="text-gray-500">We provide you with virtual tour</p>
                        </div>
                    </div>

                </div>
                <div className='lg:px-20 pt-12'>
                    <div className='border bg-[#FAFAFE] flex w-max rounded-lg items-center font-semibold'>
                        <button onClick={() => { handleChangeTab(0) }} className={`px-8 m-2 p-2 ${selectedTab == 0 ? "bg-white rounded-md shadow-md text-[#7065F0]" : "text-gray-400"}`}>For buyers</button>
                        <button onClick={() => { handleChangeTab(1) }} className={`px-8 m-2 p-2 ${selectedTab == 1 ? "bg-white rounded-md shadow-md text-[#7065F0]" : "text-gray-400"}`}>For renters</button>
                    </div>
                    <h2 className="text-3xl font-semibold pt-10">We make it easy for tenants and landlords</h2>
                    <p className='text-gray-500 py-6'>Whether it's selling your current home, getting financing, or buying a new home, we make it easy and efficient. The best part? You'll save a bunch of money and time with our services.</p>
                    <button
                        onClick={() => {
                            navigate('/listing',
                                {
                                    state: {
                                        buyOrRent,
                                    }
                                })
                        }}
                        className='bg-[#7065F0] text-white font-medium px-6 py-2 rounded-lg flex gap-2 items-center'>
                        <span>Browse now</span>
                        <IoIosArrowForward></IoIosArrowForward>
                    </button>
                </div>
            </div>
            <div className='lg:px-32 md:px-16 px-8 mb-20'>
                <div>
                    <h2 className="text-3xl font-semibold pt-10 pb-8">Properties for rent</h2>
                    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-rows-2 lg:gap-8 gap-4'>
                        {
                            housesData
                                .filter(house => house.buy_rent == "Rent")
                                .slice(0, 6).map((house, index) => <FavListCard key={index} house={house}></FavListCard>)
                        }
                    </div>
                </div>
                <div>
                    <h2 className="text-3xl font-semibold pt-10 pb-8">Properties for sell</h2>
                    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-rows-2 lg:gap-8 gap-4'>
                        {

                            housesData
                                .filter(house => house.buy_rent == "Buy")
                                .slice(0, 6).map((house, index) => <FavListCard key={index} house={house}></FavListCard>)
                        }
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Home;
