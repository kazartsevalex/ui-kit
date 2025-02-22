import React, { useState, Children } from 'react';

import useFadeOutSlider from './utils';
import classes from './Slider.module.css';

const Gallery = ({ children }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slidesCount = Children.toArray(children).length;

  useFadeOutSlider({ activeSlide, setActiveSlide, slidesCount });

  return (
    <div className={classes.SliderSlides}>
      {Children.map(children, (child, index) =>
        React.cloneElement(child, {
          isActive: activeSlide === index,
        })
      )}
    </div>
  );
};

export default Gallery;
