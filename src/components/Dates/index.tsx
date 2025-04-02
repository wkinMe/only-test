import styles from './style.module.scss';

import { useRef, useState } from 'react';
import { SwiperRef } from 'swiper/react';

import { usePeriod } from '@hooks/usePeriod';
import { useCircle } from '@hooks/useCircle';
import { useYears } from '@hooks/useYears';
import { useCircleAnimation } from '@hooks/useCircleAnimation';
import { usePaginationHandlers } from '@hooks/usePaginationHandlers';
import { useSliderEvents } from '@hooks/useSliderEvents';

import Circle from '@components/Circle';
import DatesText from '@components/DatesText';
import Pagination from '@components/Pagination';
import Slider from '@components/Slider';

export default function Dates() {
    const themeHeaderRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<SwiperRef>(null);
    const isMobile = window.innerWidth < 1000;

    const { currentPeriod, currentPeriodId, setCurrentPeriodId, periodsArr } =
        usePeriod();

    const { rotationAngle, setRotationAngle, points, radius } = useCircle(
        periodsArr,
        currentPeriodId,
    );

    const { startDate, endDate } = useYears(periodsArr, currentPeriodId);

    const { sliderEvents, setSliderEvents } = useSliderEvents(
        currentPeriod.events,
    );

    const { changePoint } = useCircleAnimation(
        periodsArr,
        currentPeriodId,
        setCurrentPeriodId,
        rotationAngle,
        setRotationAngle,
        setSliderEvents,
        isMobile,
        sliderRef,
        themeHeaderRef,
    );

    const { handlePrevClick, handleNextClick } = usePaginationHandlers(
        currentPeriodId,
        periodsArr,
        changePoint,
    );

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
                        <span>{currentPeriod.theme}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
