import { EventItem } from '../../../config/types/types';
import styles from './styles.module.scss';

interface SlideProps {
    item: EventItem;
}

export default function Slide({ item }: SlideProps) {
    return (
        <div className={styles.slide}>
            <span className={styles.year}>{item.year}</span>
            <span className={styles.event}>{item.event}</span>
        </div>
    );
}
