import { useState } from 'react';
import { PeriodItem } from '../config/types/types';
import { CIRCLE_SIZE } from '@constants/constants';

export const useCircle = (
    periodsArr: PeriodItem[],
    currentPeriodId: number,
) => {
    const [rotationAngle, setRotationAngle] = useState(0);
    const radius = CIRCLE_SIZE / 2; // Радиус круга

    const points = periodsArr.map((i, idx) => {
        const angle = (360 / periodsArr.length) * idx;
        return {
            num: idx + 1,
            description: i.theme,
            isActive: idx + 1 === currentPeriodId,
            angle,
        };
    });

    return {
        radius,
        points,
        rotationAngle,
        setRotationAngle,
    };
};
