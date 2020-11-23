import { useMemo, useCallback, useRef, useEffect } from 'react';
import _ from 'lodash';

export default (callback) => {
  const elementRef = useRef();
  const previousRect = useRef();

  const check = useCallback(() => {
    const {
      left,
      right,
      top,
      bottom,
      width,
      height,
    } = elementRef.current.getBoundingClientRect();
    const newRect = { left, right, top, bottom, width, height };
    if (!_.isEqual(previousRect.current, newRect)) {
      previousRect.current = newRect;
      callback();
    }
  }, [callback]);

  const observer = useMemo(() => new window.MutationObserver(check), [check]);

  const setupObserver = useCallback(
    (element) => {
      if (!element) return;
      elementRef.current = element;
      observer.disconnect();
      observer.observe(element, {
        attributes: true,
        attributeFilter: ['style', 'class'],
      });
    },
    [observer]
  );

  useEffect(() => {
    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line
  }, []);

  return setupObserver;
};
