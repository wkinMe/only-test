import { Point } from "../../types";
import CirclePoint from "../CirclePoint";
import PointContent from "../CirclePoint/PointContent";
import PointWrapper from "../CirclePoint/PointWrapper";
import CircleContainer from "./CircleContainer";
import StyledCircle from "./StyledCircle";

interface CircleProps {
    points: Point[],
    currentPeriodId: number;
    radius: number;
    rotationAngle: number;
    handlePointClick: (num: number) => void;
}

export default function Circle({points, currentPeriodId, radius, rotationAngle, handlePointClick}: CircleProps) {
    

    return <CircleContainer>
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
}