import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/autoplay';
import SliderCard from './SliderCard';
import { useContext } from 'react';
import { ApiContext } from '../../providers/ApiProvider';

const Slider = () => {
    const {
        housesData,
        updateHousesData,
        favHouses,
        favIds,
        updateFavHouses,
    } = useContext(ApiContext);

    if (!housesData) return <div></div>

    return (
        <div className=''>
            <Swiper
                modules={[EffectCards]}
                effect="cards"
                spaceBetween={50}
                slidesPerView={1}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {
                    housesData.slice(0, 3).map(
                        (house, index) => <SwiperSlide key={index}><SliderCard house={house}></SliderCard></SwiperSlide>
                    )
                }

            </Swiper>
        </div>
    );
};

export default Slider;