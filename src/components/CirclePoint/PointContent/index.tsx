import styled from "styled-components";

const PointContent = styled.div<{ isActive: boolean; compensationAngle: number }>`
  transition: all 0.4s ease-in-out;
  transform: rotate(${(props) => props.compensationAngle + 45}deg);
  cursor: pointer;
`;

export default PointContent;