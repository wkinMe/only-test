export interface EventItem {
    year: number;
    event: string;
}

export interface PeriodItem {
    theme: string;
    events: EventItem[];
}

export interface Point {
    num: number;
    description: string;
    isActive: boolean;
    angle: number;
}
