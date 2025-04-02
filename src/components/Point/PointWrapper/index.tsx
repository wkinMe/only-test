import styled from 'styled-components';

const PointWrapper = styled.div<{
    angle: number;
    radius: number;
    isActive: boolean;
}>`
    position: absolute;
    top: 49.3%;
    left: 49.3%;
    transform: rotate(${(props) => props.angle - 45}deg)
        translate(${(props) => props.radius}px);
    display: flex;

    align-items: center;
    justify-content: center;
`;

export default PointWrapper;
