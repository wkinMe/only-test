import { useState } from "react";
import periods from "../db/periods.json";

export const usePeriod  = () => {
    const [currentPeriodId, setCurrentPeriodId] = useState(1);
    const periodsArr = periods.periods;
    const periodsCount = periodsArr.length;

    return {currentPeriodId, setCurrentPeriodId, periodsArr, periodsCount}
}