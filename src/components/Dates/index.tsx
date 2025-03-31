import { useState } from "react"
import styles from "./style.module.scss"
import { clsx } from "clsx";
import CirclePoint from "../CirclePoint";

export default function Dates() {
    const [startDate, setStartDate] = useState(2015);
    const [endDate, setEndDate] = useState(2022);
    const [datesCount, setDatesCount] = useState(6);
    const [currentDate, setCurrentDate] = useState(1);

    const prevButtonClass = clsx(styles.prevButton, currentDate == 1 && styles.disabled)
    const nextButtonClass = clsx(styles.nextButton, datesCount == currentDate && styles.disabled)

    const handlePrevClick = () => {
        if (currentDate > 1) {
            setCurrentDate((prev) => prev - 1);
        }
    }

    const handleNextClick = () => {
        if (currentDate < datesCount) {
            setCurrentDate((prev) => prev + 1);
        }
    }
    
    return <div className={styles.datesContainer}>
        <CirclePoint num={1} description="test"/>
        <h2>Исторические даты</h2>
        <div className={styles.content}>
            <div className={styles.circle}></div>
            <h1><span className={styles.dateStart}>{startDate}</span> <span className={styles.dateEnd}>{endDate}</span></h1>
        </div>
        <div className={styles.datesPagination}>
            <span className={styles.datesCounter}>0{currentDate}/0{datesCount}</span>
            <button className={prevButtonClass} onClick={handlePrevClick}>{"<"}</button>
            <button className={nextButtonClass} onClick={handleNextClick}>{">"}</button>
        </div>
    </div>
}