import { useState } from 'react';
import { PeriodItem } from '../types';

export const useCircle = (periodsArr: PeriodItem[], periodsCount: number, currentPeriodId: number) => {

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

    return {
        radius,
        points,
        rotationAngle,
        setRotationAngle
    };
};
