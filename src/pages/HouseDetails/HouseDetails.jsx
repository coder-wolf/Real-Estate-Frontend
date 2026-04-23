import { useContext, useEffect, useState } from 'react';
import { BiArea, BiBed, BiCalendar, BiHeart, BiSearch } from 'react-icons/bi';
import { BsHeart, BsHeartFill, BsHouse } from 'react-icons/bs';
import { CgHeart } from 'react-icons/cg';
import { FaQuestionCircle, FaShare, FaShower } from 'react-icons/fa';
import { HiCheckCircle } from 'react-icons/hi';
import { MdHomeRepairService, MdKeyboardArrowLeft, MdOutlineVideocam } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import { toggleFavourite } from '../../utils/offlinestorage';
import { ApiContext } from '../../providers/ApiProvider';

const HouseDetails = () => {
    const navigate = useNavigate();
    const house = useLocation().state;
    const {
        id,
        estate_title,
        image_url,
        price,
        buy_rent,
        bedrooms,
        bathrooms,
        area,
        property_type,
        location,
        description,
    } = house;

    const [isFav, setIsFav] = useState(false);

    const {
        favIds,
        updateFavHouses,
    } = useContext(ApiContext);

    const handleToggleFavourite = e => {
        // e.stopPropagation();
        toggleFavourite(id);
        updateFavHouses();
        setIsFav(!isFav);
    }

    useEffect(() => {
        if (favIds.includes((id))) {
            console.log("Fav = ", id);
            setIsFav(true);
        }
    }, []);

    return (
        <div className='lg:px-32 md:px-16 px-8 border-t mt-1 pt-8 mb-20'>
            <button
                onClick={() => { navigate('/listing'); }}
                className='flex gap-1 text-[#7065F0] items-center pb-3'
            >
                <MdKeyboardArrowLeft className='text-2xl'></MdKeyboardArrowLeft>
                <span className='font-semibold '>Back to listing</span>
            </button>
            <div>
                <div className='flex lg:flex-row flex-col gap-2 lg:justify-between lg:items-end'>
                    <div className='flex flex-col lg:gap-1 gap-1 items-start md:items-start'>
                        <h2 className='font-semibold text-3xl'>{estate_title}</h2>
                        <span className='text-gray-400'>{location}</span>
                    </div>
                    <div className='flex flex-row gap-2 '>
                        {/* <button className="btn border-[#7065F050] text-[#7065F0] bg-[#F7F7FC]"> <FaShare className='text-lg'></FaShare> Share</button> */}
                        <button
                            onClick={handleToggleFavourite}
                            className="btn border-[#7065F050] text-[#7065F0] bg-[#F7F7FC]">
                            {/* <CgHeart className='text-lg'></CgHeart> */}
                            {
                                isFav
                                    ? <BsHeartFill></BsHeartFill>
                                    : <BsHeart></BsHeart>
                            }
                            <span>Favourite</span>
                        </button>
                        <button
                            onClick={() => {
                                navigate("/listing");
                            }}
                            className="btn border-[#7065F050] text-[#7065F0] bg-[#F7F7FC]"> <BiSearch className='text-lg'></BiSearch> Browse nearby listings</button>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-3 grid-rows-2 gap-4 mt-8 mb-4'>
                <img
                    src={image_url}
                    alt=""
                    className='md:col-span-2 col-span-3 row-span-2 rounded-lg w-full object-cover md:aspect-[3/2.1] aspect-[3/2.3]'
                />
                <img
                    src="https://cdn.houseplansservices.com/content/h0rig2dbr8vsg0fcgqco7acmul/w991x660.jpg?v=9"
                    alt=""
                    className='col-span-1 row-span-1 rounded-lg h-full md:block hidden'
                />
                <img
                    src="https://cdn.houseplansservices.com/content/h0rig2dbr8vsg0fcgqco7acmul/w991x660.jpg?v=9"
                    alt=""
                    className='col-span-1 row-span-1 rounded-lg h-full md:block hidden'
                />
            </div>
            <div className='grid md:grid-cols-3  gap-4'>
                <div className='col-span-2'>
                    <div className='w-full lg:h-28 border rounded-lg items-center justify-between px-6 lg:flex lg:flex-row grid md:grid-cols-3 grid-cols-2 pr-16 gap-4 py-5'>
                        <div className='my-auto flex flex-col justify-center gap-1'>
                            <span className='text-gray-500 font-semibold'>Bedrooms</span>
                            <div className='flex text-gray-500 items-center gap-1'>
                                <BiBed></BiBed>
                                <span className='font-semibold text-black'>{bedrooms}</span>
                            </div>
                        </div>
                        <div className='my-auto flex flex-col justify-center gap-1'>
                            <span className='text-gray-500 font-semibold'>Bathrooms</span>
                            <div className='flex text-gray-500 items-center gap-1'>
                                <FaShower></FaShower>
                                <span className='font-semibold text-black'>{bathrooms}</span>
                            </div>
                        </div>
                        <div className='my-auto flex flex-col justify-center gap-1'>
                            <span className='text-gray-500 font-semibold'>Square Area</span>
                            <div className='flex text-gray-500 items-center gap-1'>
                                <BiArea></BiArea>
                                <span className='font-semibold text-black'>{area}<small>sqft</small></span>
                            </div>
                        </div>
                        <div className='my-auto flex flex-col justify-center gap-1'>
                            <span className='text-gray-500 font-semibold'>Status</span>
                            <div className='flex text-gray-500 items-center gap-1'>
                                <HiCheckCircle className='text-green-600'></HiCheckCircle>
                                <span className='font-semibold text-black'>Available</span>
                            </div>
                        </div>
                        <div className='my-auto flex flex-col justify-center gap-1 col-span-2'>
                            <span className='text-gray-500 font-semibold'>Repair Quality</span>
                            <div className='flex text-gray-500 items-center gap-1'>
                                <MdHomeRepairService></MdHomeRepairService>
                                <span className='font-semibold text-black'>{property_type}</span>
                            </div>
                        </div>
                    </div>
                    <h2 className='text-xl pt-8 pb-2 font-semibold '>About this home</h2>
                    <p className="text-gray-700">{description}</p>
                    {/* <p className='text-gray-700'>Check out that Custom Backyard Entertaining space! 3237sqft, 4 Bedrooms, 2 Bathrooms house on a
                        Lake Villa street in the Palm Harbor neighborhood of Texas. Well cared for with tons of upgrades! Newer
                        stainless steel appliances will stay with the unit, including dishwasher, fridge, stove, microwave, and
                        washer and dryer. Tenant pays electricity and gas bills. Water, Sewer, and Trash are covered by
                        Landlord. Tenant is responsible for lawncare and snow removal. Landlord provides lawn mower.
                        Minimum one year lease.</p> */}
                    <div className='bg-[#F7F7FC] gap-5 w-full border rounded-lg mt-10 p-5 pt-6 flex flex-col justify-between'>
                        <p className='text-gray-400 font-medium'>Listed by property owner</p>
                        <div className='md:flex grid gap-4 justify-between items-center'>
                            <div className='flex gap-2'>
                                <div className="avatar">
                                    <div className="w-12 rounded-full">
                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                    </div>
                                </div>
                                <div>
                                    <p className='font-bold '>Madina Aulia</p>
                                    <p className='text-gray-500'>Rich Capital Properties LLC</p>
                                </div>
                            </div>
                            <div className='flex gap-2 md:flex-col lg:flex-row'>
                                <button className='bg-[#E8E6F9] text-[#7065F0] font-semibold px-6 py-3 rounded-lg'>Ask a question</button>
                                <button className='bg-[#E8E6F9] text-[#7065F0] font-semibold px-6 py-3 rounded-lg flex items-center justify-center gap-2'>
                                    <FaQuestionCircle></FaQuestionCircle>
                                    <span>Get more info</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='border rounded-lg p-4 col-span-2 md:col-span-1'>
                    <div>
                        <p className='mb-2 text-gray-400'>{buy_rent} price</p>
                        <p>
                            <span className='text-[#7065EF] font-semibold text-3xl'>${price}</span>
                            <span className='text-gray-400'>{buy_rent == "Rent" ? "/month" : ""}</span>
                        </p>
                        <button className='w-full bg-[#7065EF] py-[10px] text-white rounded-lg flex flex-row items-center justify-center gap-1 mt-6 mb-4'>
                            <BiArea></BiArea>
                            <span>Apply now</span>
                        </button>
                        <hr />
                    </div>
                    <div>
                        <p className="font-semibold my-5 ml-1">Request a home tour</p>
                        <div className='flex flex-row gap-3 text-gray-500 mb-2 md:flex-col lg:flex-row'>
                            <button className='border py-2 justify-center rounded-md w-full flex flex-row gap-1 items-center'><BsHouse className='text-lg'></BsHouse> In person</button>
                            <button className='border py-2 justify-center rounded-md w-full flex flex-row gap-1 items-center'><MdOutlineVideocam className='text-xl'></MdOutlineVideocam> Virtual</button>
                        </div>
                        <button className='border py-2 justify-between rounded-md w-full flex flex-row gap-1 text-gray-500 items-center mt-3 px-3'>
                            <span className='flex flex-row gap-1 justify-center items-center'>
                                <BiCalendar></BiCalendar>
                                <span>Select tour date</span>
                            </span>
                        </button>
                        <button className='bg-[#100A55] w-full py-[10px] mt-4 rounded-md text-white flex flex-row gap-1 items-center justify-center'><BiArea></BiArea> Request a tour</button>
                        <p className='text-sm text-gray-400 mt-4 ml-1'>It's free with no obligation - cancel anytime.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HouseDetails;