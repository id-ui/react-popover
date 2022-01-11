import { MutableRefObject, RefCallback } from 'react';
import { useCallback, useLayoutEffect, useRef } from 'react';
import { UsePopoverContentDimensionsProps } from './types';

export const useContentDimensions = ({
  onDimensionsChanged,
  dimensionsRef,
  isOpen,
  considerContentResizing,
}: UsePopoverContentDimensionsProps): [
  RefCallback<HTMLDivElement>,
  MutableRefObject<HTMLDivElement>
] => {
  const contentRef: MutableRefObject<HTMLDivElement> = useRef();

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

  const setDimensions: RefCallback<HTMLDivElement> = useCallback(
    (node) => {
      if (node) {
        const { clientHeight, clientWidth, firstChild } = node;

        if (firstChild instanceof HTMLElement) {
          dimensionsRef.current = {
            height: clientHeight,
            width: clientWidth,
            verticalPadding: clientHeight - firstChild.clientHeight,
            horizontalPadding: clientWidth - firstChild.clientWidth,
          };
        }
      }
    },
    [dimensionsRef]
  );

  return [setDimensions, contentRef];
};
