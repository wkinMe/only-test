import { CIRCLE_ROTATION_TIME, EASE_FUNCTION } from '@constants/constants';
import { gsap } from 'gsap/gsap-core';
import { EventItem, PeriodItem } from '../config/types/types';
import { SwiperRef } from 'swiper/react';
export const useCircleAnimation = (
    periodsArr: PeriodItem[],
    currentPeriodId: number,
    setCurrentPeriodId: (id: number) => void,
    rotationAngle: number,
    setRotationAngle: (angle: number) => void,
    setSliderEvents: (events: EventItem[]) => void,
    isMobile: boolean,
    sliderRef: React.RefObject<SwiperRef | null>,
    themeHeaderRef: React.RefObject<HTMLDivElement | null>,
) => {
    const changePoint = (selectedNum: number) => {
        const anglePerPoint = 360 / periodsArr.length;
        const steps = selectedNum - currentPeriodId;
        let newRotationAngle = rotationAngle - steps * anglePerPoint;
        if (!isMobile) {
            setCurrentPeriodId(selectedNum);
            setRotationAngle(newRotationAngle);
        }
        const duration = CIRCLE_ROTATION_TIME;
        const ease = EASE_FUNCTION;
        themeHeaderRef.current &&
            gsap.to(themeHeaderRef.current, {
                opacity: 0,
                duration,
                ease,
                onComplete: () => {
                    setCurrentPeriodId(selectedNum);
                    gsap.fromTo(
                        themeHeaderRef.current,
                        { opacity: 0 },
                        { opacity: 1, duration },
                    );
                },
            });
        gsap.to(sliderRef.current, {
            opacity: 0,
            top: 15,
            duration,
            ease,
            onComplete: () => {
                const newEvents = periodsArr[selectedNum - 1].events;
                setSliderEvents(newEvents);
                sliderRef.current?.swiper.slideTo(0, 0);
                gsap.fromTo(
                    sliderRef.current,
                    { opacity: 0, top: 15 },
                    { opacity: 1, top: 0, duration, ease },
                );
            },
        });
    };
    return { changePoint };
};
