import styles from './style.module.scss';

import Slider from '../Slider';
import Circle from '../Circle';
import { usePeriod } from '../../hooks/usePeriod';
import { useCircle } from '../../hooks/useCircle';
import { useYears } from '../../hooks/useYears';
import Pagination from '../Pagination';
import DatesText from '../DatesText';

export default function Dates() {
    const { currentPeriodId, setCurrentPeriodId, periodsArr, periodsCount } =
        usePeriod();
    const { rotationAngle, setRotationAngle, points, radius } = useCircle(
        periodsArr,
        periodsCount,
        currentPeriodId,
    );
    const { startDate, endDate, setYearsBoundary } = useYears(
        periodsArr,
        currentPeriodId,
    );

    const changePoint = (selectedNum: number) => {
        const anglePerPoint = 360 / periodsCount;
        const steps = selectedNum - currentPeriodId;
        let newRotationAngle = rotationAngle - steps * anglePerPoint;

        setCurrentPeriodId(selectedNum);
        setRotationAngle(newRotationAngle);
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
            <Pagination
                current={currentPeriodId}
                length={periodsCount}
                handleNextClick={handleNextClick}
                handlePrevClick={handlePrevClick}
            />
            <Slider events={periodsArr[0].events} />
        </div>
    );
}
