import styles from './style.module.scss';
import clsx from 'clsx';

import Slider from '../Slider';
import Circle from '../Circle';
import { usePeriod } from '../../hooks/usePeriod';
import { useCircle } from '../../hooks/useCircle';
import { useYears } from '../../hooks/useYears';

export default function Dates() {
    const { currentPeriodId, setCurrentPeriodId, periodsArr, periodsCount } =
        usePeriod();
    const {
        rotationAngle,
        setRotationAngle,
        points,
        radius,
        handlePointClick,
    } = useCircle();
    const { startDate, endDate, setYearsBoundary } = useYears();

    const prevButtonClass = clsx(currentPeriodId === 1 && styles.disabled);
    const nextButtonClass = clsx(
        currentPeriodId === periodsCount && styles.disabled,
    );

    const handlePrevClick = () => {
        if (currentPeriodId > 1) {
            setCurrentPeriodId((prev) => {
                setYearsBoundary(prev - 1);
                return prev - 1;
            });
            setRotationAngle((prev) => (prev + 360 / periodsCount) % 360);
        }
    };

    const handleNextClick = () => {
        if (currentPeriodId < periodsCount) {
            setCurrentPeriodId((prev) => {
                setYearsBoundary(prev + 1);
                return prev + 1;
            });
            setRotationAngle((prev) => (prev - 360 / periodsCount) % 360);
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
                    handlePointClick={handlePointClick}
                    currentPeriodId={currentPeriodId}
                />
                <h1>
                    <span className={styles.dateStart}>{startDate}</span>{' '}
                    <span className={styles.dateEnd}>{endDate}</span>
                </h1>
            </div>
            <div className={styles.periodsPagination}>
                <span className={styles.periodsCounter}>
                    0{currentPeriodId}/0{periodsCount}
                </span>
                <button onClick={handlePrevClick} className={prevButtonClass}>
                    {'<'}
                </button>
                <button onClick={handleNextClick} className={nextButtonClass}>
                    {'>'}
                </button>
            </div>
            <Slider events={periodsArr[0].events} />
        </div>
    );
}
