import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';

import 'swiper/scss';
import 'swiper/css/navigation';
import './style.scss';

import { EventItem } from '../../types';
import Slide from './Slide';

interface SliderProps {
    events: EventItem[];
}

export default function Slider({ events }: SliderProps) {
    return (
        <div style={{ position: 'relative' }}>
            <Swiper
                slidesPerView={3}
                grabCursor={true}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                freeMode={{
                    enabled: true,
                    momentum: true,
                    momentumRatio: 0.5,
                    momentumVelocityRatio: 0.5,
                    momentumBounce: true,
                    sticky: false,
                }}
                modules={[Navigation, FreeMode]}>
                {events.map((item, index) => (
                    <SwiperSlide key={index}>
                        <Slide item={item}></Slide>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className='swiper-button-prev' />
            <div className='swiper-button-next' />
        </div>
    );
}
