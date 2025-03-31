import { useState } from "react";
import styled from "styled-components";
import CirclePoint from "../CirclePoint";
import styles from "./style.module.scss";
import clsx from "clsx";

const CircleContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 536px;
  height: 530px;
`;

const StyledCircle = styled.div<{ rotationAngle: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid #ccc;
  transform: rotate(${(props) => props.rotationAngle}deg);
  transition: transform 0.5s ease-in-out; // Анимация вращения
`;

const PointWrapper = styled.div<{ angle: number; radius: number; isActive: boolean }>`
  position: absolute;
  z-index: 4;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(${(props) => props.angle}deg)
    translate(${(props) => props.radius}px)
    rotate(${(props) => props.angle}deg);
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* Обратное вращение только для активной точки */
  & > div {
    transform: ${(props) => (props.isActive ? `rotate(${-props.angle + 45}deg)` : "none")};
  }
`;

export default function Dates() {
  const [startDate, setStartDate] = useState(2015);
  const [endDate, setEndDate] = useState(2022);
  const [datesCount, setDatesCount] = useState(6);
  const [currentDate, setCurrentDate] = useState(1);

  // Состояние для угла поворота круга
  const [rotationAngle, setRotationAngle] = useState(0);

  const prevButtonClass = clsx(currentDate === 1 && styles.disabled);
  const nextButtonClass = clsx(currentDate === datesCount && styles.disabled);

  const handlePrevClick = () => {
    if (currentDate > 1) {
      setCurrentDate((prev) => prev - 1);
      setRotationAngle((prev) => prev + 360 / datesCount); // Поворачиваем круг против часовой стрелки
    }
  };

  const handleNextClick = () => {
    if (currentDate < datesCount) {
      setCurrentDate((prev) => prev + 1);
      setRotationAngle((prev) => prev - 360 / datesCount); // Поворачиваем круг по часовой стрелке
    }
  };

  const radius = 268;

  // Создаем массив точек
  const points = Array.from({ length: datesCount }, (_, index) => {
    const angle = (360 / datesCount) * index; // Угол для каждой точки
    return {
      num: index + 1,
      description: `description ${index + 1}`,
      isActive: index + 1 === currentDate,
      angle,
    };
  });

  // Корректировка угла поворота для активной точки (справа сверху)
  const adjustedRotationAngle = rotationAngle - 45;

  return (
    <div className={styles.datesContainer}>
      <h2>Исторические даты</h2>
      <div className={styles.content}>
        <CircleContainer>
          {/* Круг с анимацией поворота */}
          <StyledCircle rotationAngle={adjustedRotationAngle}>
            {points.map(({ num, description, isActive, angle }) => (
              <PointWrapper key={num} angle={angle} radius={radius} isActive={isActive}>
                <CirclePoint num={num} description={description} isActive={isActive} />
              </PointWrapper>
            ))}
          </StyledCircle>
        </CircleContainer>
        <h1>
          <span className={styles.dateStart}>{startDate}</span>{" "}
          <span className={styles.dateEnd}>{endDate}</span>
        </h1>
      </div>
      <div className={styles.datesPagination}>
        <span className={styles.datesCounter}>0{currentDate}/0{datesCount}</span>
        <button onClick={handlePrevClick} className={prevButtonClass}>
          {"<"}
        </button>
        <button onClick={handleNextClick} className={nextButtonClass}>
          {">"}
        </button>
      </div>
    </div>
  );
}