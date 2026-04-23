import { useContext, useEffect } from 'react';
import ListingCard from '../Listing/ListingCard';
import { ApiContext } from '../../providers/ApiProvider';
import { Helmet } from 'react-helmet-async';

const Favourites = () => {
    const {
        favHouses,
        updateFavHouses,

    } = useContext(ApiContext);

    useEffect(() => {
        if (favHouses.length == 0) updateFavHouses();
    }, [favHouses]);

    return (
        <div className='lg:px-32 md:px-16 px-8 bg-[#F1F1F8] pb-32'>
            <Helmet>
                <title>Favourites</title>
            </Helmet>
            <h2 className="text-3xl font-semibold pt-10 pb-8">Favourites ({favHouses.length})</h2>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-5'>
                {
                    favHouses.map((house, index) => <ListingCard key={index} house={house}></ListingCard>)
                }
            </div>
        </div>
    );
};

export default Favourites;