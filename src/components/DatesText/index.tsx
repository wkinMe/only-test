import styles from './styles.module.scss';

interface DatesTextProps {
    startDate: number;
    endDate: number;
}

export default function DatesText({ startDate, endDate }: DatesTextProps) {
    return (
        <h1>
            <span className={styles.dateStart}>{startDate}</span>{' '}
            <span className={styles.dateEnd}>{endDate}</span>
        </h1>
    );
}
