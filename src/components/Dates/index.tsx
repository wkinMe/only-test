import { useState } from "react"
import styles from "./style.module.scss"

export default function Home() {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    
    return <div className={styles.datesContainer}>
        <h1>Исторические даты</h1>
        <div className={styles.circle}></div>
        <h2>{startDate}</h2>
        <h2>{endDate}</h2>

    </div>
}