import clsx from 'clsx';
import styles from './styles.module.scss';
import { MOBILE_BREAKPOINT } from '@constants/constants';

interface PaginationProps {
    current: number;
    length: number;
    handlePrevClick: () => void;
    handleNextClick: () => void;
    handleBulletClick: (num: number) => void;
}

export default function Pagination({
    current,
    length,
    handlePrevClick,
    handleNextClick,
    handleBulletClick,
}: PaginationProps) {
    const prevButtonClass = clsx(current === 1 && styles.disabled);
    const nextButtonClass = clsx(current === length && styles.disabled);

    const isBulletsShown = window.innerWidth < MOBILE_BREAKPOINT;

    return (
        <div className={styles.periodsPagination}>
            <span className={styles.periodsCounter}>
                0{current}/0{length}
            </span>
            <div className={styles.buttons}>
                <button onClick={handlePrevClick} className={prevButtonClass}>
                    {'<'}
                </button>
                <button onClick={handleNextClick} className={nextButtonClass}>
                    {'>'}
                </button>
            </div>

            {isBulletsShown && (
                <ul className={styles.bullets}>
                    {Array.from({ length }).map((_, idx) => {
                        const cn = clsx(
                            styles.bullet,
                            idx + 1 === current && styles.selected,
                        );
                        return (
                            <li
                                className={cn}
                                onClick={() => handleBulletClick(idx)}></li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
