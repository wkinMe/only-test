import { PeriodItem } from '../types';

export const useYears = (periodsArr: PeriodItem[], currentPeriodId: number) => {
    const years = periodsArr[currentPeriodId - 1].events.map((i) => i.year);
    const startDate = Math.min(...years);
    const endDate = Math.max(...years);

    return { startDate, endDate };
};
