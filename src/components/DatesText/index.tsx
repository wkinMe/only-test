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

    const isInitialRender = useRef(true);

    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }

        const animateNumber = (element: HTMLSpanElement, newValue: number) => {
            const currentValue = parseInt(element.textContent || '0');

            if (currentValue !== newValue) {
                gsap.fromTo(
                    element,
                    { textContent: currentValue },
                    {
                        textContent: newValue,
                        snap: { textContent: 1 },
                        duration: CIRCLE_ROTATION_TIME,
                        ease: EASE_FUNCTION,
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
            <span ref={startDateRef} className={styles.dateStart}></span>{' '}
            <span ref={endDateRef} className={styles.dateEnd}></span>
        </h1>
    );
}
