// Тип одного события
export interface EventItem {
    year: number;
    event: string;
};

export interface PeriodItem {
    theme: string;
    events: Event[];
};
