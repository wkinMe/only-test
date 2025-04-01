import styled from 'styled-components';

const StyledCircle = styled.div<{ rotationAngle: number }>`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 536px; // Исходный размер круга
    height: 536px; // Исходный размер круга
    border-radius: 50%;
    border: 1px solid #ccc;
    transform: translate(-50%, -50%)
        rotate(${(props) => props.rotationAngle}deg); // Центрируем и добавляем поворот
    transition: transform 0.5s ease-in-out;
    will-change: transform; // Оптимизация для анимации
`;

export default StyledCircle;
