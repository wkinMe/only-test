import styles from "./style.module.scss";

interface CirclePointProps {
    num: number;
    description: string;
}

export default function CirclePoint({num, description}: CirclePointProps) {

    return <div className={styles.point}>
        <span className={styles.number}>{num}</span>
    </div>
}