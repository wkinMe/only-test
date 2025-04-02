import { useState } from 'react';
import { periodService } from '@services/periodService';

export const usePeriod = () => {
    const [currentPeriodId, setCurrentPeriodId] = useState(1);
    const periodsArr = periodService.getPeriods();

    return { currentPeriodId, setCurrentPeriodId, periodsArr };
};
