import { useState } from 'react';
import { periodService } from '@services/periodService';

export const usePeriod = () => {
    const [currentPeriodId, setCurrentPeriodId] = useState(1);
    const periodsArr = periodService.getPeriods();
    const currentPeriod = periodsArr[currentPeriodId - 1];

    return { currentPeriodId, currentPeriod, setCurrentPeriodId, periodsArr };
};
