import periods from '@db/periods.json';

export const periodService = {
    getPeriods() {
        return periods.periods;
    },
};
