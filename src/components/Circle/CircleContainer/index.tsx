import { CIRCLE_SIZE } from '@constants/constants';
import styled from 'styled-components';

const CircleContainer = styled.div`
    position: absolute;
    z-index: 2;
    left: 50%;
    transform: translateX(-50%);
    width: ${CIRCLE_SIZE}px; // Увеличиваем ширину
    height: ${CIRCLE_SIZE}px; // Увеличиваем высоту

    @media screen and (max-width: 1000px) {
        display: none;
    }
`;

export default CircleContainer;
