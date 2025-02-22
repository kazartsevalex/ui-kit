import { useEffect } from 'react';

export const SLIDER_TIMER_DURATION = 3400;

const useFadeOutSlider = ({ activeSlide, setActiveSlide, slidesCount }) => {
  let timer;

  const startSlide = () => {
    timer = setTimeout(() => {
      setActiveSlide(() => (activeSlide === slidesCount - 1 ? 0 : activeSlide + 1));
      startSlide();
    }, SLIDER_TIMER_DURATION);
  };

  useEffect(() => {
    startSlide();

    return () => {
      clearTimeout(timer);
    };
  });
};

export default useFadeOutSlider;
