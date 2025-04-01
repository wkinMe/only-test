import styles from './style.module.scss';

import { gsap } from 'gsap/gsap-core';
import Slider from '../Slider';
import Circle from '../Circle';
import { usePeriod } from '../../hooks/usePeriod';
import { useCircle } from '../../hooks/useCircle';
import { useYears } from '../../hooks/useYears';
import Pagination from '../Pagination';
import DatesText from '../DatesText';
import { useRef, useState } from 'react';

export default function Dates() {
    const { currentPeriodId, setCurrentPeriodId, periodsArr, periodsCount } =
        usePeriod();
    const { rotationAngle, setRotationAngle, points, radius } = useCircle(
        periodsArr,
        periodsCount,
        currentPeriodId,
    );
    const { startDate, endDate } = useYears(periodsArr, currentPeriodId);

    const currentPeriod = periodsArr[currentPeriodId - 1];
    const [sliderEvents, setSliderEvents] = useState(currentPeriod.events);
    const themeHeaderRef = useRef(null);
    const currentTheme = currentPeriod.theme;
    const isMobile = window.innerWidth < 1000;
    const sliderRef = useRef(null);

    const changePoint = (selectedNum: number) => {
        const anglePerPoint = 360 / periodsCount;
        const steps = selectedNum - currentPeriodId;
        let newRotationAngle = rotationAngle - steps * anglePerPoint;

        if (!isMobile) {
            setCurrentPeriodId(selectedNum);
            setRotationAngle(newRotationAngle);
        }

        const duration = 0.3;
        const ease = 'power2.inOut';

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
                console.log(selectedNum);
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
        if (currentPeriodId < periodsCount) {
            changePoint(currentPeriodId + 1);
        }
    };

    return (
        <div className={styles.datesContainer}>
            <h2>Исторические даты</h2>
            <div className={styles.content}>
                <Circle
                    points={points}
                    radius={radius}
                    rotationAngle={rotationAngle}
                    changePoint={changePoint}
                    currentPeriodId={currentPeriodId}
                />
                <DatesText startDate={startDate} endDate={endDate} />
            </div>
            <div className={styles.sliderPaginationContainer}>
                <Pagination
                    current={currentPeriodId}
                    length={periodsCount}
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
