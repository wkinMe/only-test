import { usePeriod } from "@hooks/usePeriod";
import { useState } from "react";

export const useSlider = () => {
    const {currentPeriodId} = usePeriod();
    
    const [sliderEvents, setSliderEvents] = useState(currentPeriod.events);
}