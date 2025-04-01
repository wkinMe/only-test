import clsx from 'clsx';
import styles from './styles.module.scss';

interface PaginationProps {
    current: number;
    length: number;
    handlePrevClick: () => void;
    handleNextClick: () => void;
}

export default function Pagination({
    current,
    length,
    handlePrevClick,
    handleNextClick,
}: PaginationProps) {
    const prevButtonClass = clsx(current === 1 && styles.disabled);
    const nextButtonClass = clsx(current === length && styles.disabled);

    return (
        <div className={styles.periodsPagination}>
            <span className={styles.periodsCounter}>
                0{current}/0{length}
            </span>
            <button onClick={handlePrevClick} className={prevButtonClass}>
                {'<'}
            </button>
            <button onClick={handleNextClick} className={nextButtonClass}>
                {'>'}
            </button>
        </div>
    );
}
