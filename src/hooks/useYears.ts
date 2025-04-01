import { useState } from "react";
import { usePeriod } from "./usePeriod";

export const useYears = () => {
    const {periodsArr, currentPeriodId} = usePeriod();
    
    const years = periodsArr[currentPeriodId - 1].events.map(i => i.year);
    const [startDate, setStartDate] = useState(Math.min(...years));
    const [endDate, setEndDate] = useState(Math.max(...years));

    const setYearsBoundary = (periodId: number) => {
        const years = periodsArr[periodId - 1].events.map(i => i.year)
        setStartDate(Math.min(...years));
        setEndDate(Math.max(...years));
      }

    return {startDate, endDate, setYearsBoundary}
}