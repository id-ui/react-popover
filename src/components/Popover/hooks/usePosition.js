import { useCallback, useState } from 'react';
import { EDGE_PADDING, MIN_SPARE_SPACE } from '../constants';
import { checkConstraints } from '../helpers';
import popoverPropsGetters from '../placementsConfig';

const findFirstRelativeElement = (element) => {
  if (element.tagName === 'BODY') {
    return element;
  }
  const style = window.getComputedStyle(element);
  if (style.position === 'static') {
    return findFirstRelativeElement(element.parentElement);
  }
  return element;
};

export default ({
  contentDimensions,
  triggerElementRef,
  placement,
  offset,
  withArrow,
  guessBetterPosition,
  animation,
  animationTranslateDistance,
  spaceBetweenPopoverAndTarget,
  getContainer,
}) => {
  const [containerProps, setContainerProps] = useState({});

  const updatePosition = useCallback(() => {
    if (!triggerElementRef.current || !contentDimensions.current) {
      return;
    }

    const container = getContainer();

    if (!container) {
      return;
    }

    const offsetContainer = findFirstRelativeElement(container);

    const rect = triggerElementRef.current.getBoundingClientRect();
    const offsetContainerRect = offsetContainer.getBoundingClientRect();

    const {
      height: targetHeight,
      width: targetWidth,
    } = contentDimensions.current;

    const params = {
      bottom: rect.bottom - offsetContainerRect.top,
      right: rect.right - offsetContainerRect.left,
      top: rect.top - offsetContainerRect.top,
      left: rect.left - offsetContainerRect.left,
      width: rect.width,
      height: rect.height,
    };

    let actualPlacement = placement;

    if (guessBetterPosition) {
      const containerRect = container.getBoundingClientRect();

      const topConstraint = MIN_SPARE_SPACE + EDGE_PADDING + targetHeight;
      const bottomConstraint =
        containerRect.height - targetHeight - MIN_SPARE_SPACE - EDGE_PADDING;
      const rightConstraint =
        containerRect.width - targetWidth - MIN_SPARE_SPACE - EDGE_PADDING;
      const leftConstraint = MIN_SPARE_SPACE + EDGE_PADDING + targetWidth;

      if (['top', 'bottom'].some((item) => actualPlacement.startsWith(item))) {
        // two times to avoid wrong position replacement (second time returns old placement in wrong case)
        for (let i = 0; i < 2; i++) {
          actualPlacement = checkConstraints(
            actualPlacement,
            ['bottom', params.bottom, bottomConstraint],
            ['top', params.top, topConstraint]
          );
        }
      } else {
        for (let i = 0; i < 2; i++) {
          actualPlacement = checkConstraints(
            actualPlacement,
            ['top', params.top, bottomConstraint],
            ['bottom', params.bottom, topConstraint]
          );
        }
      }

      if (['right', 'left'].some((item) => actualPlacement.startsWith(item))) {
        for (let i = 0; i < 2; i++) {
          actualPlacement = checkConstraints(
            actualPlacement,
            ['right', params.right, rightConstraint],
            ['left', params.left, leftConstraint]
          );
        }
      } else {
        for (let i = 0; i < 2; i++) {
          actualPlacement = checkConstraints(
            actualPlacement,
            ['left', params.left, rightConstraint],
            ['right', params.right, leftConstraint]
          );
        }
      }
    }

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;

    params.top += scrollTop;
    params.bottom += scrollTop;
    params.right += scrollLeft;
    params.left += scrollLeft;

    setContainerProps(
      popoverPropsGetters[actualPlacement](params, {
        offset,
        withArrow,
        animation,
        animationTranslateDistance,
        spaceBetweenPopoverAndTarget,
      })
    );
  }, [
    triggerElementRef,
    guessBetterPosition,
    offset,
    placement,
    contentDimensions,
    withArrow,
    animation,
    animationTranslateDistance,
    spaceBetweenPopoverAndTarget,
    getContainer,
  ]);

  return [containerProps, updatePosition];
};
