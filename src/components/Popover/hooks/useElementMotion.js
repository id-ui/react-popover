import { useMemo, useCallback, useRef, useEffect } from 'react';
import { isEqual } from 'lodash';

export default (callback) => {
  const elementRef = useRef();
  const previousRect = useRef();

  const observer = useMemo(() => {
    const checkElementMotion = () => {
      const {
        left,
        right,
        top,
        bottom,
        width,
        height,
      } = elementRef.current.getBoundingClientRect();

      const newRect = { left, right, top, bottom, width, height };

      if (!isEqual(previousRect.current, newRect)) {
        previousRect.current = newRect;
        callback();
      }
    };

    return new window.MutationObserver(checkElementMotion);
  }, [callback]);

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
