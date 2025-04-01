import styled from 'styled-components';

const PointWrapper = styled.div<{
    angle: number;
    radius: number;
    isActive: boolean;
}>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: rotate(${(props) => props.angle - 45}deg) translate(${(props) => props.radius}px);
  display: flex;
  align-i
  
  items: center;
  justify-content: center;
`;

export default PointWrapper;
