import { useCallback, useLayoutEffect, useRef } from 'react';

export default ({
  onDimensionsChanged,
  dimensionsRef,
  isOpen,
  considerContentResizing,
}) => {
  const contentRef = useRef();

  useLayoutEffect(() => {
    if (
      considerContentResizing &&
      isOpen &&
      contentRef.current &&
      dimensionsRef.current
    ) {
      const { clientHeight, clientWidth } = contentRef.current;
      if (
        dimensionsRef.current.height !== clientHeight ||
        dimensionsRef.current.width !== clientWidth
      ) {
        dimensionsRef.current.height = clientHeight;
        dimensionsRef.current.width = clientWidth;
        onDimensionsChanged();
      }
    }
  });

  const setDimensions = useCallback(
    (node) => {
      if (node) {
        const { clientHeight, clientWidth, firstChild } = node;

        dimensionsRef.current = {
          height: clientHeight,
          width: clientWidth,
          verticalPadding: clientHeight - firstChild.clientHeight,
          horizontalPadding: clientWidth - firstChild.clientWidth,
        };
      }
    },
    [dimensionsRef]
  );

  return [setDimensions, contentRef];
};
