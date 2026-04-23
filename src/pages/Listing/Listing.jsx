import ListingCard from './ListingCard';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { useContext, useEffect, useRef, useState } from 'react';
import { ApiContext } from '../../providers/ApiProvider';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';


const Listing = () => {
    const {
        housesData,
        updateHousesData,
        favHouses,
        updateFavHouses,
        favIds,
    } = useContext(ApiContext);

    const { state } = useLocation();

    // const {
    //     location, // TODO: set this up. The state variable, the display in jsx elements & other stuff.
    //     buyOrRent,
    //     startDate,
    // } = state;

    const [startDateSelected, setStartDateDisplay] = useState(new Date());

    const [filteredHouse, setFilteredHouse] = useState([]);
    const [showFilteredHouse, setShowFilteredHouse] = useState(false);

    // Input refs. 1. min, max price 2. estate type, 3. buy or sell.
    const minPriceRef = useRef(null);
    const maxPriceRef = useRef(null);
    const propertyTypeRef = useRef(null);
    const buyOrSellRef = useRef(null);

    // States: 1. min, max price, 2. estate type, 3. buy or sell
    const [selectedMinPrice, setSelectedMinPrice] = useState(0);
    const [selectedMaxPrice, setSelectedMaxPrice] = useState(0);
    const [selectedEstateType, setSelectedEstateType] = useState("Show All");
    const [selectedBuyOrRent, setSelectedBuyOrRent] = useState("Rent");

    // Toggle states: For showing/hiding the dropdown menu
    const [showSelectorPrice, setShowSelectorPrice] = useState(false);
    const [showSelectorEstateType, setShowSelectorEstateType] = useState(false);
    const [showSelectorBuyOrRent, setShowSelectorBuyOrRent] = useState(false);

    // List of states to select from
    const estateTypes = ["Show All", "Single-Family Home", "Condominium", "Apartment", "Townhouse", "Commercial Property"];
    const buyOrRentTypes = ["All", "Buy", "Rent"];

    useEffect(() => {
        // Only updates the values when the initial length is 0. Prevents unnecessary updates.
        // May need to change into a loading state based system.
        if (housesData.length == 0) updateHousesData();
        if (favHouses.length == 0) updateFavHouses();

        setStartDateDisplay(state?.startDate ?? (new Date()));

    }, [housesData, favHouses])

    const handleSelectEstateType = type => {
        setSelectedEstateType(type);
        setShowSelectorEstateType(false);
    }

    const handleSelectBuyOrSellType = type => {
        setSelectedBuyOrRent(type);
        setShowSelectorBuyOrRent(false);
    }

    const handleFilterByPropertyType = e => {

        const tempFilteredData = housesData.filter(house => {
            const houseAvailableFrom = new Date(house.available_date);

            console.log("DATE FORMAT (DOES IT WORK) : ");

            console.log("HOUSE AVAILABE DATE    : ", houseAvailableFrom);
            console.log("USER DESIRED START DATE: ", startDateSelected);

            console.log("MATCH RESULT: ", houseAvailableFrom >= startDateSelected);

            return (selectedEstateType == "Show All" || house.property_type == selectedEstateType)
                && houseAvailableFrom >= startDateSelected
                && (selectedBuyOrRent == 'All' || house.buy_rent == selectedBuyOrRent)
                && (house.price >= selectedMinPrice || selectedMinPrice == 0)
                && (house.price >= selectedMaxPrice || selectedMaxPrice == 0)
        });

        console.log("Total Len = ", housesData.length)
        console.log("Filtered Len = ", tempFilteredData.length)
        setFilteredHouse(tempFilteredData);
        setShowFilteredHouse(true);
    }

    return (
        <div className='lg:px-32 md:px-16 px-8 bg-[#F1F1F8] pb-32'>
            <Helmet>
                <title>Property Listing</title>
            </Helmet>
            <div className=''>
                <h2 className="text-3xl font-semibold pt-10 mb-6">Search properties to rent</h2>
                <div className='border w1/2 bg-white rounded-lg mb-6 p-6 lg:flex hidden gap-5 pr-12'>
                    <div className='w-20'>
                        <p className='text-gray-400 font-semibold '>Location</p>
                        <p className='font-semibold'>New York</p>
                    </div>
                    <div className='border-r-2 w-8'></div>
                    <div className='w-20'>
                        <p className='text-gray-400 font-semibold '>When</p>
                        {/* <p className='font-semibold'>{startDate ? "" : "No Date"}</p> */}
                        <DatePicker className='font-semibold' selected={startDateSelected} onChange={(date) => setStartDateDisplay(date)} />
                    </div>
                    <div className='border-r-2 w-8  '></div>
                    {/* ======== Input 1: Price Range ========= */}
                    <div
                        onClick={() => { setShowSelectorPrice(true); }}
                        className='dropdown dropdown-bottom dropdown-start w-48' tabIndex={0} role='button'>
                        <p className='text-gray-400 font-semibold'>Price Range</p>
                        <p className='font-semibold flex justify-between items-center gap-4'>
                            <span>${selectedMinPrice} - ${selectedMaxPrice}</span>
                            <IoIosArrowDropdownCircle className='text-[#F0EFFB] bg-[#7065F080] rounded-3xl border-none'></IoIosArrowDropdownCircle>
                        </p>
                        <div tabIndex={0} className={`dropdown-content menu bg-white rounded-box z-[1] w-72 p-3 shadow-3xl border ${showSelectorPrice ? "" : "hidden"}`}>
                            <div className='flex gap-2 mt-2'>
                                <input
                                    name='min_price'
                                    type="text"
                                    placeholder="Min price"
                                    ref={minPriceRef}
                                    className="input input-bordered border-none w-full bg-[#E8E8E8]" />
                                <input
                                    name='max_price'
                                    type="text"
                                    placeholder="Max price"
                                    ref={maxPriceRef}
                                    className="input input-bordered border-none w-full bg-[#E8E8E8]" />
                            </div>
                            <button
                                onClick={e => {
                                    e.stopPropagation();

                                    const inputMinPrice = Number(minPriceRef.current.value);
                                    const inputMaxPrice = Number(maxPriceRef.current.value);
                                    // minPriceRef.current.value = "";
                                    // maxPriceRef.current.value = "";
                                    minPriceRef.current.value = Math.min(inputMinPrice, inputMaxPrice);
                                    maxPriceRef.current.value = Math.max(inputMinPrice, inputMaxPrice);

                                    setSelectedMinPrice(Math.min(inputMinPrice, inputMaxPrice));
                                    setSelectedMaxPrice(Math.max(inputMinPrice, inputMaxPrice));
                                    setShowSelectorPrice(false);
                                }}
                                className='bg-[#7065F0] text-white px-6 py-2 rounded-lg text-lg mt-2'>Set Range</button>
                        </div>
                    </div>
                    <div className='border-r-2 w-8  '></div>
                    {/* ======== Input 2: Property Type ========= */}
                    <div
                        onClick={() => {
                            setShowSelectorEstateType(true);
                        }}
                        className='dropdown dropdown-bottom dropdown-start w-52' tabIndex={1} role='button'>
                        <p className='text-gray-400 font-semibold '>Property Type</p>
                        <p className='font-semibold flex justify-between items-center gap-4'>
                            <span>{selectedEstateType}</span>
                            <IoIosArrowDropdownCircle className='text-[#F0EFFB] bg-[#7065F080] rounded-3xl border-none'></IoIosArrowDropdownCircle>
                        </p>
                        <div tabIndex={1} className={`dropdown-content menu bg-white rounded-box z-[1] w-72 shadow-3xl py-3 pr-3 border ${showSelectorEstateType ? "" : "hidden"}`}>
                            {
                                estateTypes.map((type, index) =>
                                    <div
                                        onClick={e => { e.stopPropagation(); handleSelectEstateType(type) }}
                                        key={index}
                                        className={`text-lg py-1 px-1 ${selectedEstateType === type ? "font-bold bg-[#F0F1F6]" : ""} pl-5`}
                                    >
                                        {type}
                                    </div>)
                            }
                        </div>
                    </div>

                    <div className='border-r-2 w-8  ml-auto'></div>
                    {/* ======== Input 3: Buy / Sell ========= */}
                    <div
                        onClick={() => { setShowSelectorBuyOrRent(true); }}
                        className='dropdown dropdown-bottom dropdown-start w-24' tabIndex={2} role='button'>
                        <p className='text-gray-400 font-semibold '>Buy / Rent</p>
                        <p className='font-semibold flex justify-between items-center gap-4'>
                            <span>{selectedBuyOrRent}</span>
                            <IoIosArrowDropdownCircle className='text-[#F0EFFB] bg-[#7065F080] rounded-3xl border-none'></IoIosArrowDropdownCircle>
                        </p>
                        {/* Input items here. */}
                        <div tabIndex={2} className={`dropdown-content menu bg-white rounded-box z-[1] w-72 p-3 shadow-3xl border ${showSelectorBuyOrRent ? "" : "hidden"}`}>
                            {
                                buyOrRentTypes.map((type, index) =>
                                    <div
                                        onClick={e => { e.stopPropagation(); handleSelectBuyOrSellType(type) }}
                                        key={index}
                                        className={`text-lg py-1 px-1 ${selectedBuyOrRent === type ? "font-bold bg-[#F0F1F6]" : ""} pl-5`}
                                    >
                                        {type}
                                    </div>)
                            }
                        </div>
                    </div>
                    <div className='border-r-2 w-8 '></div>
                    <button onClick={handleFilterByPropertyType} className='text-white bg-[#7065F0] rounded-lg px-6 py-3 font-medium '>Search</button>
                </div>
            </div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-8'>
                {
                    showFilteredHouse ?
                        filteredHouse.map(house => <ListingCard
                            key={house.id}
                            house={house}
                        ></ListingCard>)
                        :
                        housesData.map(house => <ListingCard
                            key={house.id}
                            house={house}
                        ></ListingCard>)
                }
            </div>
        </div >
    );
};

export default Listing;