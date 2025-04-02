export const usePaginationHandlers = (
    currentPeriodId: number,
    periodsArr: any[],
    changePoint: (num: number) => void,
) => {
    const handlePrevClick = () => {
        if (currentPeriodId > 1) {
            changePoint(currentPeriodId - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPeriodId < periodsArr.length) {
            changePoint(currentPeriodId + 1);
        }
    };

    return { handlePrevClick, handleNextClick };
};
