import React from 'react';

import classes from './Slider.module.css';

const Slide = ({ children, isActive }) => {
  const classNames = [classes.Slide];

  if (isActive) {
    classNames.push(classes.AnimateAppear);
  }

  return (
    <div
      data-testid="slide"
      className={classNames.join(' ')}
    >
      {children}
    </div>
  );
};

export default Slide;
