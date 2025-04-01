import { useState } from 'react';
import { usePeriod } from './usePeriod';

export const useCircle = () => {
    const { periodsArr, periodsCount, currentPeriodId, setCurrentPeriodId } =
        usePeriod();

    const [rotationAngle, setRotationAngle] = useState(0);
    const radius = 536 / 2; // Радиус круга

    const points = periodsArr.map((i, idx) => {
        const angle = (360 / periodsCount) * idx;
        return {
            num: idx + 1,
            description: i.theme,
            isActive: idx + 1 === currentPeriodId,
            angle,
        };
    });

    const handlePointClick = (selectedNum: number) => {
        const anglePerPoint = 360 / periodsCount;
        const steps = selectedNum - currentPeriodId;
        let newRotationAngle = rotationAngle - steps * anglePerPoint;

        // Приводим угол к диапазону [0, 360)
        newRotationAngle = ((newRotationAngle % 360) + 360) % 360;

        setCurrentPeriodId(selectedNum);
        setRotationAngle(newRotationAngle);
    };

    return {
        radius,
        points,
        rotationAngle,
        setRotationAngle,
        handlePointClick,
    };
};
