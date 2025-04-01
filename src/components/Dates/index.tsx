import { useState } from "react";
import styled from "styled-components";
import CirclePoint from "../CirclePoint";
import styles from "./style.module.scss";
import clsx from "clsx";
import periods from "../../db/periods.json";

import Slider from "../Slider";

const CircleContainer = styled.div`
  position: absolute;
  z-index: 2;
  left: 50%;
  transform: translateX(-50%);
  width: 536px; // Увеличиваем ширину
  height: 536px; // Увеличиваем высоту
`;

const StyledCircle = styled.div<{ rotationAngle: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 536px; // Исходный размер круга
  height: 536px; // Исходный размер круга
  border-radius: 50%;
  border: 1px solid #ccc;
  transform: translate(-50%, -50%) rotate(${(props) => props.rotationAngle}deg); // Центрируем и добавляем поворот
  transition: transform 0.5s ease-in-out;
  will-change: transform; // Оптимизация для анимации
`;

const PointWrapper = styled.div<{ angle: number; radius: number; isActive: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: rotate(${(props) => props.angle - 45}deg) translate(${(props) => props.radius}px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PointContent = styled.div<{ isActive: boolean; compensationAngle: number }>`
  transition: all 0.4s ease-in-out;
  transform: rotate(${(props) => props.compensationAngle + 45}deg);
  cursor: pointer;
`;

export default function Dates() {
  const [currentPeriodId, setCurrentPeriodId] = useState(1);
  const [rotationAngle, setRotationAngle] = useState(0);

  const periodsArr = periods.periods;
  const periodsCount = periodsArr.length;

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
        <CircleContainer>
          <StyledCircle rotationAngle={rotationAngle}>
            {points.map(({ num, description, isActive, angle }) => {
              const compensationAngle = (currentPeriodId - num) * 60;

              return (
                <PointWrapper key={num} angle={angle} radius={radius} isActive={isActive}>
                  <PointContent
                    isActive={isActive}
                    compensationAngle={compensationAngle}
                    onClick={() => handlePointClick(num)}
                  >
                    <CirclePoint num={num} description={description} isActive={isActive} />
                  </PointContent>
                </PointWrapper>
              );
            })}
          </StyledCircle>
        </CircleContainer>
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