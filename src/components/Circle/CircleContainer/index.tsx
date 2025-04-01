import styled from 'styled-components';

const CircleContainer = styled.div`
    position: absolute;
    z-index: 2;
    left: 50%;
    transform: translateX(-50%);
    width: 536px; // Увеличиваем ширину
    height: 536px; // Увеличиваем высоту

    @media screen and (max-width: 1000px) {
        display: none;
    }
`;

export default CircleContainer;
