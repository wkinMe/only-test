export interface EventItem {
    year: number;
    event: string;
};

export interface PeriodItem {
    theme: string;
    events: Event[];
};

export interface Point {
    num: number,
    description: string,
    isActive: boolean
    angle: number
}
