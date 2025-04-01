import clsx from "clsx";
import styles from "./style.module.scss";

interface CirclePointProps {
    num: number;
    description: string;
    isActive: boolean
}

export default function CirclePoint({num, description, isActive}: CirclePointProps) {
    const className = clsx(styles.point, isActive && styles.active)
    return <div className={className}>
        <span className={styles.number}>{num}</span>
        <span className={styles.description}>{description}</span>
    </div>
}