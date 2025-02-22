import { useEffect, useRef } from 'react';

import useIntersectionObserver from './useIntersectionObserver';

const useFadeInOnScroll = (ref, className) => {
  const hasSeen = useRef(false);
  const observer = useIntersectionObserver(ref, { threshold: 0.75 });
  const isVisible = !!observer?.isIntersecting;

  useEffect(() => {
    if (!ref?.current) return;

    if (isVisible && !hasSeen?.current) {
      hasSeen.current = true;
      ref.current.classList.add(className);
    }
  }, [isVisible, ref, hasSeen, className]);
};

export default useFadeInOnScroll;
