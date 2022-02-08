import {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import debounce from 'debounce';
import { UseScrollHandlerProps } from './types';
import { findScrollContainer } from './helpers';

export const useScrollHandler = ({
  isOpen,
  closeOnScroll,
  scrollHandlerMinDistance,
  close,
  updatePosition,
}: UseScrollHandlerProps) => {
  const scrollContainer: MutableRefObject<HTMLElement> = useRef();

  const previousScrollPosition = useRef(0);

  const resetScrollPositionDebounced = useMemo(
    () =>
      debounce(() => {
        previousScrollPosition.current = 0;
      }, 1000),
    []
  );

  const handleScroll = useCallback(
    (e) => {
      if (!scrollHandlerMinDistance) {
        if (closeOnScroll) {
          close();
        } else {
          updatePosition();
        }

        return;
      }

      resetScrollPositionDebounced();

      const currentScrollPosition = e.currentTarget.scrollTop;

      if (!previousScrollPosition.current) {
        previousScrollPosition.current = currentScrollPosition;
        return;
      }

      if (
        Math.abs(previousScrollPosition.current - currentScrollPosition) >=
        scrollHandlerMinDistance
      ) {
        if (closeOnScroll) {
          close();
        } else {
          updatePosition();
        }

        previousScrollPosition.current = currentScrollPosition;
      }
    },
    [scrollHandlerMinDistance, closeOnScroll]
  );

  useEffect(() => {
    if (!scrollContainer.current) {
      return;
    }

    if (isOpen) {
      scrollContainer.current.addEventListener('scroll', handleScroll);
    } else {
      scrollContainer.current.removeEventListener('scroll', handleScroll);
    }
  }, [isOpen, handleScroll]);

  const removeScrollListener = useCallback(() => {
    if (scrollContainer.current) {
      scrollContainer.current.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  useEffect(() => {
    return removeScrollListener;
  }, [removeScrollListener]);

  return useCallback(
    (node) => {
      removeScrollListener();

      scrollContainer.current = findScrollContainer(node);
    },
    [handleScroll, removeScrollListener]
  );
};
