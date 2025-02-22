import React from 'react';

import classes from './SlideImage.module.css';

const SlideImage = ({ webpSrc, pngSrc, alt }) => (
  <div className={classes.SlideImage}>
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img src={pngSrc} alt={alt} className={classes.SlideImagePicture} />
    </picture>
  </div>
);

export default SlideImage;
