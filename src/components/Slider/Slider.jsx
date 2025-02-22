import React from 'react';

import Slide from './Slide';
import Gallery from './Gallery';

import SlideImage from './components/SlideImage/SlideImage';
import classes from './Slider.module.css';

const Slider = () => {
  return (
    <div className={classes.Slider}>
      <Gallery>
        <Slide>
          <SlideImage
            webpSrc="https://media.licdn.com/dms/image/v2/C4E16AQGcEsIUI-PfTw/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1596563764635?e=1745452800&v=beta&t=y4A3dtxAc6_m5E5h9hVx5zlN1pYJb1WNXVoaTL004Ro"
            pngSrc="https://media.licdn.com/dms/image/v2/C4E16AQGcEsIUI-PfTw/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1596563764635?e=1745452800&v=beta&t=y4A3dtxAc6_m5E5h9hVx5zlN1pYJb1WNXVoaTL004Ro"
            alt="Slide 1 text"
          />
        </Slide>

        <Slide>
          <SlideImage
            webpSrc="https://media.licdn.com/dms/image/v2/C4E16AQGcEsIUI-PfTw/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1596563764635?e=1745452800&v=beta&t=y4A3dtxAc6_m5E5h9hVx5zlN1pYJb1WNXVoaTL004Ro"
            pngSrc="https://media.licdn.com/dms/image/v2/C4E16AQGcEsIUI-PfTw/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1596563764635?e=1745452800&v=beta&t=y4A3dtxAc6_m5E5h9hVx5zlN1pYJb1WNXVoaTL004Ro"
            alt="Slide 2 text"
          />
        </Slide>

        <Slide>
          <SlideImage
            webpSrc="https://media.licdn.com/dms/image/v2/C4E16AQGcEsIUI-PfTw/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1596563764635?e=1745452800&v=beta&t=y4A3dtxAc6_m5E5h9hVx5zlN1pYJb1WNXVoaTL004Ro"
            pngSrc="https://media.licdn.com/dms/image/v2/C4E16AQGcEsIUI-PfTw/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1596563764635?e=1745452800&v=beta&t=y4A3dtxAc6_m5E5h9hVx5zlN1pYJb1WNXVoaTL004Ro"
            alt="Slide 3 text"
          />
        </Slide>
      </Gallery>
    </div>
  );
};

export default Slider;
