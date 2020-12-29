import { useCallback, useLayoutEffect, useRef } from 'react';

export default ({ updatePosition, ref: dimensionsRef, isOpen }) => {
  const contentRef = useRef();

  useLayoutEffect(() => {
    if (isOpen && contentRef.current && dimensionsRef.current) {
      const { clientHeight, clientWidth } = contentRef.current;
      if (
        dimensionsRef.current.height !== clientHeight ||
        dimensionsRef.current.width !== clientWidth
      ) {
        dimensionsRef.current.height = clientHeight;
        dimensionsRef.current.width = clientWidth;
        updatePosition();
      }
    }
  });

  const checkDimensions = useCallback((node) => {
    if (node) {
      const { clientHeight, clientWidth, firstChild } = node;

      dimensionsRef.current = {
        height: clientHeight,
        width: clientWidth,
        verticalPadding: clientHeight - firstChild.clientHeight,
        horizontalPadding: clientWidth - firstChild.clientWidth,
      };
    }
  }, []);

  return [checkDimensions, contentRef];
};
