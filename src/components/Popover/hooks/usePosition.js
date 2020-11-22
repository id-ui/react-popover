import { useCallback, useState } from 'react';
import { EDGE_PADDING } from '../constants';
import { checkConstraints } from '../helpers';
import popoverPropsGetters from '../placementsConfig';

export default ({
  targetDimensions,
  triggerElementRef,
  placement,
  offset,
  withArrow,
  guessBetterPosition,
}) => {
  const [containerProps, setContainerProps] = useState({});

  const updatePosition = useCallback(() => {
    if (!triggerElementRef.current || !targetDimensions.current) {
      return;
    }

    const rect = triggerElementRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;

    const {
      height: targetHeight,
      width: targetWidth,
    } = targetDimensions.current;

    const params = {
      bottom: scrollTop + rect.bottom,
      right: scrollLeft + rect.right,
      top: scrollTop + rect.top,
      left: scrollLeft + rect.left,
      width: rect.width,
      height: rect.height,
    };

    let actualPlacement = placement;

    if (guessBetterPosition) {
      const { scrollHeight, scrollWidth } = document.documentElement;
      const topConstraint = targetHeight;
      const bottomConstraint = scrollHeight - targetHeight - EDGE_PADDING;
      const rightConstraint = scrollWidth - targetWidth - EDGE_PADDING;
      const leftConstraint = targetWidth;

      actualPlacement = checkConstraints(
        placement,
        ['bottom', params.bottom, bottomConstraint],
        ['top', params.top, topConstraint]
      );
      actualPlacement = checkConstraints(
        actualPlacement,
        ['right', params.right, rightConstraint],
        ['left', params.left, leftConstraint]
      );
    }

    setContainerProps(
      popoverPropsGetters[actualPlacement](params, { offset, withArrow })
    );
  }, [
    triggerElementRef,
    guessBetterPosition,
    offset,
    placement,
    targetDimensions,
    withArrow,
  ]);

  return [containerProps, updatePosition];
};
