import styled from 'styled-components';
import { CIRCLE_ROTATION_TIME } from '../../../config/constants/constants';

const PointContent = styled.div<{
    isActive: boolean;
    compensationAngle: number;
}>`
    transition: all ${CIRCLE_ROTATION_TIME} ease-in-out;
    transform: rotate(${(props) => props.compensationAngle + 45}deg);
    cursor: pointer;
`;

export default PointContent;
