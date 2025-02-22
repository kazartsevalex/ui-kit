import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';

import { useIntersectionObserver } from '../../utils/hooks';

import classes from './Counter.module.css';

const duration = 2;
const durInMSec = duration * 1000;
const incrementTime = 5;
const THRESHOLD = 1000;

const Counter = ({ target = 13666 }) => {
  const [count, setCount] = useState(0);

  const shouldShowCounter = useMemo(() => target >= THRESHOLD, [target]);

  const hasSeen = useRef(false);
  const counterRef = useRef();
  const observer = useIntersectionObserver(counterRef, { threshold: 0.5 });
  const isVisible = !!observer?.isIntersecting;

  const counter = useCallback((targetCount) => {
    let start = 0;

    if (start === targetCount) return;

    const inc = targetCount / (durInMSec / incrementTime);
    const timer = setInterval(() => {
      start += inc;
      setCount(start);

      if (start >= targetCount) {
        clearInterval(timer);
        setCount(targetCount);
      }
    }, incrementTime);
  }, []);

  useEffect(() => {
    if (isVisible && !hasSeen?.current && target) {
      hasSeen.current = true;
      counter(target);
    }
  }, [isVisible, hasSeen, counter, target]);

  const classNames = [classes.Counter];
  if (!shouldShowCounter) {
    classNames.push(classes.hidden);
  }

  return (
    <section className={classNames.join(' ')}>
      <div className={classes.CounterContent} ref={counterRef}>
        <div className={classes.CounterNumber}>
          {Math.ceil(count).toLocaleString()}
        </div>
      </div>
    </section>
  );
};

export default Counter;
