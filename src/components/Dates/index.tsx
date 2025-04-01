import { useState } from "react";
import styled from "styled-components";
import CirclePoint from "../CirclePoint";
import styles from "./style.module.scss";
import clsx from "clsx";
import periods from "../../db/periods.json";

import Slider from "../Slider";
import Circle from "../Circle";

export default function Dates() {
  const [currentPeriodId, setCurrentPeriodId] = useState(1);
  const [rotationAngle, setRotationAngle] = useState(0);

  const periodsArr = periods.periods;
  const periodsCount = periodsArr.length;
  
  console.log(periodsArr[currentPeriodId - 1]);
  
  const years = periodsArr[currentPeriodId - 1].events.map(i => i.year);
  const [startDate, setStartDate] = useState(Math.min(...years));
  const [endDate, setEndDate] = useState(Math.max(...years));

  const prevButtonClass = clsx(currentPeriodId === 1 && styles.disabled);
  const nextButtonClass = clsx(currentPeriodId === periodsCount && styles.disabled);
  
  const setYearsBoundary = (periodId: number) => {
    const years = periodsArr[periodId - 1].events.map(i => i.year)
    setStartDate(Math.min(...years));
    setEndDate(Math.max(...years));
  }
  
  const handlePrevClick = () => {
    if (currentPeriodId > 1) {
      setCurrentPeriodId((prev) => {
        setYearsBoundary(prev - 1);
        return prev - 1
      });
      setRotationAngle((prev) => ((prev + 360 / periodsCount) % 360));
    }
  };

  const handleNextClick = () => {
    if (currentPeriodId < periodsCount) {
      setCurrentPeriodId((prev) => {
        setYearsBoundary(prev + 1);
        return prev + 1;
      });
      setRotationAngle((prev) => ((prev - 360 / periodsCount) % 360));
    }
  };

  const handlePointClick = (selectedNum: number) => {
    const anglePerPoint = 360 / periodsCount;
    const steps = selectedNum - currentPeriodId;
    let newRotationAngle = rotationAngle - steps * anglePerPoint;

    // Приводим угол к диапазону [0, 360)
    newRotationAngle = ((newRotationAngle % 360) + 360) % 360;

    setCurrentPeriodId(selectedNum);
    setRotationAngle(newRotationAngle);
  };

  const radius = 536 / 2; // Радиус круга

  const points = periodsArr.map((i, idx) => {
    const angle = (360 / periodsCount) * idx;
    return {
      num: idx + 1,
      description: i.theme,
      isActive: idx + 1 === currentPeriodId,
      angle,
    };
  })

  return (
    <div className={styles.datesContainer}>
      <h2>Исторические даты</h2>
      <div className={styles.content}>
        <Circle points={points} radius={radius} rotationAngle={rotationAngle} handlePointClick={handlePointClick} currentPeriodId={currentPeriodId}/>
        <h1>
          <span className={styles.dateStart}>{startDate}</span>{" "}
          <span className={styles.dateEnd}>{endDate}</span>
        </h1>
      </div>
      <div className={styles.periodsPagination}>
        <span className={styles.periodsCounter}>0{currentPeriodId}/0{periodsCount}</span>
        <button onClick={handlePrevClick} className={prevButtonClass}>
          {"<"}
        </button>
        <button onClick={handleNextClick} className={nextButtonClass}>
          {">"}
        </button>
      </div>
      <Slider events={periods.periods[0].events} />
    </div>
  );
}