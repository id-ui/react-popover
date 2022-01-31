import {
  useMemo,
  useCallback,
  useRef,
  useEffect,
  MutableRefObject,
} from 'react';
import { isEqual } from 'lodash-es';
import { PopoverContentDimensionsRect } from '../usePosition/placementsConfig';

export const useElementMotion = (callback: () => void) => {
  const elementRef: MutableRefObject<HTMLElement> = useRef();
  const previousRect: MutableRefObject<PopoverContentDimensionsRect> = useRef();

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
