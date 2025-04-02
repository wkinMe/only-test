import styles from './style.module.scss';

import { gsap } from 'gsap/gsap-core';

import { useRef, useState } from 'react';
import { SwiperRef } from 'swiper/react';

import { usePeriod } from '@hooks/usePeriod';
import { useCircle } from '@hooks/useCircle';
import { useYears } from '@hooks/useYears';
import Circle from '@components/Circle';
import DatesText from '@components/DatesText';
import Pagination from '@components/Pagination';
import Slider from '@components/Slider';
import { CIRCLE_ROTATION_TIME, EASE_FUNCTION } from '@constants/constants';

export default function Dates() {
    const { currentPeriodId, setCurrentPeriodId, periodsArr } = usePeriod();
    const { rotationAngle, setRotationAngle, points, radius } = useCircle(
        periodsArr,
        currentPeriodId,
    );
    const { startDate, endDate } = useYears(periodsArr, currentPeriodId);

    const currentPeriod = periodsArr[currentPeriodId - 1];
    const [sliderEvents, setSliderEvents] = useState(currentPeriod.events);
    const themeHeaderRef = useRef(null);
    const currentTheme = currentPeriod.theme;
    const isMobile = window.innerWidth < 1000;
    const sliderRef = useRef<SwiperRef>(null);

    const changePoint = (selectedNum: number) => {
        const anglePerPoint = 360 / periodsArr.length;
        const steps = selectedNum - currentPeriodId;
        let newRotationAngle = rotationAngle - steps * anglePerPoint;

        if (!isMobile) {
            setCurrentPeriodId(selectedNum);
            setRotationAngle(newRotationAngle);
        }

        const swiperWrapper = sliderRef.current?.swiper.wrapperEl;

        const duration = CIRCLE_ROTATION_TIME;
        const ease = EASE_FUNCTION;

        swiperWrapper &&
            gsap.to(swiperWrapper, {
                transform: 'translateX(0)',
                delay: duration,
            });

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
                
                gsap.fromTo(
                    sliderRef.current,
                    { opacity: 0, top: 15 },
                    {
                        opacity: 1,
                        top: 0,
                        duration,
                        ease,
                    },
                );
            },
        });
    };

    const handlePrevClick = () => {
        if (currentPeriodId > 1) {
            changePoint(currentPeriodId - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPeriodId < periodsArr.length) {
            changePoint(currentPeriodId + 1);
        }
    };

    return (
        <div className={styles.datesContainer}>
            <div className={styles.content}>
                <h2>Исторические даты</h2>
                <div className={styles.contentContainer}>
                    <Circle
                        points={points}
                        radius={radius}
                        rotationAngle={rotationAngle}
                        changePoint={changePoint}
                        currentPeriodId={currentPeriodId}
                    />
                    <DatesText startDate={startDate} endDate={endDate} />
                </div>
            </div>
            <div className={styles.sliderPaginationContainer}>
                <Pagination
                    current={currentPeriodId}
                    length={periodsArr.length}
                    handleNextClick={handleNextClick}
                    handlePrevClick={handlePrevClick}
                    handleBulletClick={(num) => setCurrentPeriodId(num)}
                />
                <Slider events={sliderEvents} ref={sliderRef} />
                {isMobile && (
                    <div className={styles.themeHeader} ref={themeHeaderRef}>
                        <span>{currentTheme}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
