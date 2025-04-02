import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './styles.module.scss';
import { CIRCLE_ROTATION_TIME, EASE_FUNCTION } from '@constants/constants';


interface DatesTextProps {
    startDate: number;
    endDate: number;
}

export default function DatesText({ startDate, endDate }: DatesTextProps) {
    const startDateRef = useRef<HTMLSpanElement | null>(null);
    const endDateRef = useRef<HTMLSpanElement | null>(null);

    const [displayedStartDate, setDisplayedStartDate] = useState<number>(0);
    const [displayedEndDate, setDisplayedEndDate] = useState<number>(0);

    useEffect(() => {
        setDisplayedStartDate(startDate);
        setDisplayedEndDate(endDate);

        const animateNumber = (element: HTMLSpanElement, newValue: number) => {
            const currentValue = parseInt(element.textContent || '0', 10);
            const duration = CIRCLE_ROTATION_TIME;
            const ease = EASE_FUNCTION;

            if (currentValue !== newValue) {
                gsap.fromTo(
                    element,
                    { textContent: currentValue },
                    {
                        textContent: newValue,
                        duration,
                        ease,
                        snap: { textContent: 1 },
                        onUpdate: () => {
                            element.textContent = Math.round(
                                parseFloat(element.textContent || '0'),
                            ).toString();
                        },
                    },
                );
            }
        };

        if (startDateRef.current && endDateRef.current) {
            animateNumber(startDateRef.current, startDate);
            animateNumber(endDateRef.current, endDate);
        }
    }, [startDate, endDate]);

    return (
        <h1>
            <span ref={startDateRef} className={styles.dateStart}>
                {displayedStartDate}
            </span>{' '}
            <span ref={endDateRef} className={styles.dateEnd}>
                {displayedEndDate}
            </span>
        </h1>
    );
}
