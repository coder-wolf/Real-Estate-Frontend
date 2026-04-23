import React from 'react';
import EditButton from '../Shared/EditButton';
import CommonButton from '../Shared/CommonButton';
import { GiBed } from 'react-icons/gi';
import { BiArea, BiShower } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const FavListCard = ({ house }) => {
    const navigate = useNavigate();
    const {
        id,
        image_url,
        estate_title,
        price,
        location,
        bedrooms,
        bathrooms,
        area,
        buy_rent,
    } = house;

    const placeholderImages = [
        "https://calculatorexpress.com/API8/ryanamamoo/img.svg",
        // "https://cdn.trustedhousesitters.com/static/images/listings/listing-placeholder-mobile.svg",
        // "https://bearhomes.com/wp-content/uploads/2019/01/default-featured.png",
    ]

    const handleNavigate = () => {
        // navigate('/componentB', { state: { id: 1, name: 'sabaoon' } });
        navigate(`/details/${id}`, { state: house });
    }

    return (
        <div
            className='flex flex-col mb-4 p-3 border rounded-2xl shadow-xs bg-[#F9F9F9]'>
            <div className='flex flex-row gap-4 '>
                <div className="avatar">
                    <div className="w-24 h-24 rounded-xl">
                        <img
                            className='object-cover'
                            src={image_url}
                            onError={(e) => {
                                e.target.onerror = null;
                                // e.target.src = 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png';
                                e.target.src = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
                            }}
                        />

                    </div>
                </div>
                <div className='w-full'>
                    <p className='font-semibold text-xl '>{estate_title.slice(0, 15) + '...'}</p>
                    <div className='pb-1 pt-1'>
                        <span className='text-[#7065EF] font-semibold text-2xl'>${price}</span>
                        {
                            buy_rent == "Rent" ?
                                <span className='text-gray-400'>/month</span> : <span></span>
                        }
                    </div>
                    <div className='flex flex-row justify-between '>
                        <div className='flex gap-2 items-center'>
                            <GiBed className='text-[#7065EF]'></GiBed>
                            <span>{bedrooms}</span>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <BiShower className='text-[#7065EF]'></BiShower>
                            <span>{bathrooms} Bath</span>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <BiArea className='text-[#7065EF]'></BiArea>
                            <span>{area} <small>sqft</small></span>
                        </div>
                    </div>
                </div>
            </div>
            <div
                onClick={handleNavigate}
                className='flex justify-between items-center'>
                {/* <p className='text-gray-400 '>{location}</p>
                <CommonButton>Details</CommonButton> */}
            </div>
        </div>
    );
};

export default FavListCard;