import { useCallback, useRef, useState } from 'react';
import _ from 'lodash';
import { checkConstraints } from '../helpers';
import placementPropsGetters from '../placementsConfig';
import { useContentDimensions } from '.';

const findFirstRelativeElement = (element) => {
  if (element.tagName === 'BODY') {
    return element;
  }

  const style = window.getComputedStyle(element);
  if (style.position === 'static') {
    return element.offsetParent || element;
  }

  return element;
};

const findScrollContainer = (element) => {
  if (element.tagName === 'BODY') {
    return element;
  }

  if (element.scrollHeight > element.clientHeight) {
    return element;
  }

  return findScrollContainer(element.parentElement);
};

export default ({
  triggerElementRef,
  placement,
  offset: providedOffset,
  withArrow,
  guessBetterPosition,
  animation,
  openingAnimationTranslateDistance,
  closingAnimationTranslateDistance,
  spaceBetweenPopoverAndTarget,
  getContainer,
  arrowSize,
  setBetterPlacement,
  canUpdate,
  minSpaceBetweenPopoverAndContainer,
  avoidOverflowBounds,
  fitMaxHeightToBounds,
  fitMaxWidthToBounds,
  maxHeight,
  maxWidth,
  isOpen,
  considerContentResizing,
}) => {
  const [containerProps, setContainerProps] = useState({});

  const contentDimensions = useRef();

  const updatePosition = useCallback(() => {
    if (
      !canUpdate ||
      !triggerElementRef.current ||
      !contentDimensions.current
    ) {
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
      height: contentHeight,
      width: contentWidth,
      ...otherContentDimensions
    } = contentDimensions.current;

    const params = {
      bottom: rect.bottom,
      right: rect.right,
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    };

    let actualPlacement = placement;

    const scrollContainer = findScrollContainer(container);
    const scrollTop = scrollContainer.scrollTop;
    const scrollLeft = scrollContainer.scrollLeft;

    let offset = providedOffset;

    if (guessBetterPosition) {
      const containerRect = container.getBoundingClientRect();

      const topConstraint =
        containerRect.top +
        scrollTop +
        contentHeight +
        spaceBetweenPopoverAndTarget +
        minSpaceBetweenPopoverAndContainer;
      const bottomConstraint =
        containerRect.bottom -
        contentHeight -
        minSpaceBetweenPopoverAndContainer -
        spaceBetweenPopoverAndTarget;
      const leftConstraint =
        containerRect.left +
        contentWidth +
        minSpaceBetweenPopoverAndContainer +
        spaceBetweenPopoverAndTarget;
      const rightConstraint =
        containerRect.right -
        contentWidth -
        minSpaceBetweenPopoverAndContainer -
        spaceBetweenPopoverAndTarget;

      if (['top', 'bottom'].includes(actualPlacement)) {
        if (params.right < leftConstraint) {
          actualPlacement = `${actualPlacement}Left`;
        } else if (params.left > rightConstraint) {
          actualPlacement = `${actualPlacement}Right`;
        }
      } else if (['right', 'left'].includes(actualPlacement)) {
        if (params.bottom < topConstraint) {
          actualPlacement = `${actualPlacement}Top`;
        } else if (params.top > bottomConstraint) {
          actualPlacement = `${actualPlacement}Bottom`;
        }
      }

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

      if (
        ['top', 'bottom'].some(
          (item) =>
            placement.toLowerCase().indexOf(item) > -1 &&
            actualPlacement.toLowerCase().indexOf(item) === -1
        )
      ) {
        offset[1] = 0;
      }

      if (
        ['left', 'right'].some(
          (item) =>
            placement.toLowerCase().indexOf(item) > -1 &&
            actualPlacement.toLowerCase().indexOf(item) === -1
        )
      ) {
        offset[0] = 0;
      }
    }

    setBetterPlacement(actualPlacement);

    params.top -= offsetContainerRect.top - scrollTop;
    params.bottom -= offsetContainerRect.top - scrollTop;
    params.right -= offsetContainerRect.left - scrollLeft;
    params.left -= offsetContainerRect.left - scrollLeft;

    setContainerProps(
      placementPropsGetters[actualPlacement](params, {
        offset,
        withArrow,
        animation,
        openingAnimationTranslateDistance,
        closingAnimationTranslateDistance,
        spaceBetweenPopoverAndTarget,
        arrowSize,
        minSpaceBetweenPopoverAndContainer,
        avoidOverflowBounds,
        fitMaxHeightToBounds: _.isBoolean(fitMaxHeightToBounds)
          ? fitMaxHeightToBounds
          : !maxHeight,
        fitMaxWidthToBounds: _.isBoolean(fitMaxWidthToBounds)
          ? fitMaxWidthToBounds
          : !maxWidth,
        contentHeight,
        contentWidth,
        containerWidth: offsetContainerRect.width,
        containerHeight: offsetContainerRect.height,
        ...otherContentDimensions,
      })
    );
  }, [
    triggerElementRef,
    guessBetterPosition,
    providedOffset,
    placement,
    contentDimensions,
    withArrow,
    animation,
    openingAnimationTranslateDistance,
    closingAnimationTranslateDistance,
    spaceBetweenPopoverAndTarget,
    getContainer,
    arrowSize,
    canUpdate,
    setBetterPlacement,
    minSpaceBetweenPopoverAndContainer,
    fitMaxHeightToBounds,
    fitMaxWidthToBounds,
    maxHeight,
    maxWidth,
    avoidOverflowBounds,
  ]);

  const [setContentDimensions, contentRef] = useContentDimensions({
    onDimensionsChanged: updatePosition,
    dimensionsRef: contentDimensions,
    isOpen,
    considerContentResizing,
  });

  return {
    containerProps,
    updatePosition,
    contentRef,
    setContentDimensions,
    shouldCheckContentDimensions: !contentDimensions.current,
  };
};
