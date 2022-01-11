import { MutableRefObject, useCallback, useEffect, useRef } from 'react';
import { UseScrollProps } from './types';
import { findScrollContainer } from './helpers';

export const useScroll = ({ listener }: UseScrollProps) => {
  const scrollContainer: MutableRefObject<HTMLElement | Window> = useRef();

  const removeScrollListener = useCallback(() => {
    if (scrollContainer.current) {
      scrollContainer.current.removeEventListener('scroll', listener);
    }
  }, [listener]);

  useEffect(() => {
    return removeScrollListener;
  }, [removeScrollListener]);

  return useCallback(
    (node) => {
      removeScrollListener();

      scrollContainer.current = findScrollContainer(node);

      scrollContainer.current.addEventListener('scroll', listener);
    },
    [listener, removeScrollListener]
  );
};
