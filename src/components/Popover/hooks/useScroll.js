import { useCallback, useEffect, useRef } from 'react';

const findScrollContainer = (node) => {
  if (!node) {
    return window;
  }

  return node.scrollHeight > node.clientHeight
    ? node
    : findScrollContainer(node.parentNode);
};

export default ({ listener }) => {
  const scrollContainer = useRef();

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
