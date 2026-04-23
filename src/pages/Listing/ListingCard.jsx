import { useContext, useEffect, useState } from 'react';
import { BiArea, BiShower } from 'react-icons/bi';
import { FaRegHeart } from 'react-icons/fa';
import { GiBed } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { toggleFavourite } from '../../utils/offlinestorage';
import { ApiContext } from '../../providers/ApiProvider';

const ListingCard = ({ house }) => {
    const [isFav, setIsFav] = useState(false);
    const navigate = useNavigate();
    const {
        favIds,
        updateFavHouses,
    } = useContext(ApiContext);

    const {
        id,
        estate_title,
        image_url,
        price,
        status,
        bedrooms,
        bathrooms,
        area,
        location,
        buy_rent,
    } = house;

    useEffect(() => {
        if (favIds.length == 0) updateFavHouses();
        if (favIds.includes((id))) {
            console.log("Fav = ", id);
            setIsFav(true);
        }
        else {
            console.log("Not found anything")
        }
    }, [favIds, isFav]);

    const handleToggleFavourite = e => {
        e.stopPropagation();
        toggleFavourite(id);
        updateFavHouses();
        setIsFav(!isFav);
    }

    const placeholderImages = [
        "https://calculatorexpress.com/API8/ryanamamoo/img.svg",
        // "https://cdn.trustedhousesitters.com/static/images/listings/listing-placeholder-mobile.svg",
        // "https://bearhomes.com/wp-content/uploads/2019/01/default-featured.png",
    ]

    const handleNavigate = () => {
        navigate(`/details/${id}`, { state: house });
    }

    return (
        <div onClick={handleNavigate} className='bg-white rounded-lg pb-5'>
            <img
                className='h-52 w-full rounded-t-lg object-cover'
                src={image_url}
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
                }}
            />
            <div className='p-5'>
                <div className=''>
                    <div className='flex justify-between'>
                        <div>
                            <p>
                                <span className='text-[#7065EF] font-semibold text-3xl'>${price}</span>
                                {
                                    buy_rent == "Rent" ?
                                        <span className='text-gray-400'>/month</span>
                                        : <span></span>
                                }
                            </p>
                            <p className='font-semibold text-3xl py-2'>{estate_title}</p>
                        </div>
                        <button
                            onClick={handleToggleFavourite}
                            className={`${isFav ? "bg-[#7065F0] text-white" : "text-[#7065EF]"} rounded-3xl border-2 w-12 h-12 p-1 justify-center items-center flex`}>
                            <FaRegHeart className=' text-xl'></FaRegHeart>
                        </button>
                    </div>
                    <p className='text-gray-400 text-lg'>{location}</p>
                    <div className='py-4'>
                        <hr />
                    </div>
                </div>
                <div className='flex flex-row justify-between'>
                    <div className='flex gap-2 items-center'>
                        <GiBed className='text-[#7065EF]'></GiBed>
                        <span>3 Beds</span>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <BiShower className='text-[#7065EF]'></BiShower>
                        <span>2 Bathrooms</span>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <BiArea className='text-[#7065EF]'></BiArea>
                        <span>5<small>x</small>7 m<sup>2</sup></span>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ListingCard;