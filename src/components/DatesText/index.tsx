import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './styles.module.scss';

interface DatesTextProps {
    startDate: number;
    endDate: number;
}

export default function DatesText({ startDate, endDate }: DatesTextProps) {
    const startDateRef = useRef<HTMLSpanElement | null>(null);
    const endDateRef = useRef<HTMLSpanElement | null>(null);

    // Инициализация состояния для отображаемых значений
    const [displayedStartDate, setDisplayedStartDate] = useState<number>(0);
    const [displayedEndDate, setDisplayedEndDate] = useState<number>(0);

    useEffect(() => {
        // Устанавливаем начальные значения в состояние
        setDisplayedStartDate(startDate);
        setDisplayedEndDate(endDate);

        // Функция для анимации чисел
        const animateNumber = (element: HTMLSpanElement, newValue: number) => {
            const currentValue = parseInt(element.textContent || '0', 10);
            const duration = 1; // Длительность анимации

            // Если текущее значение не совпадает с новым, выполняем анимацию
            if (currentValue !== newValue) {
                gsap.fromTo(
                    element,
                    { textContent: currentValue },
                    {
                        textContent: newValue,
                        duration: duration,
                        ease: 'power1.inOut',
                        snap: { textContent: 1 },
                        onUpdate: () => {
                            // Обновляем текст на каждом шаге анимации
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
            {/* Отображаем значения из состояния */}
            <span ref={startDateRef} className={styles.dateStart}>
                {displayedStartDate}
            </span>{' '}
            <span ref={endDateRef} className={styles.dateEnd}>
                {displayedEndDate}
            </span>
        </h1>
    );
}
