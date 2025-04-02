import { useState } from 'react';

export const useSliderEvents = (initialEvents: any[]) => {
    const [sliderEvents, setSliderEvents] = useState(initialEvents);

    return { sliderEvents, setSliderEvents };
};
