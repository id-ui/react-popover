import { useCallback, useRef, useState } from 'react';
import { isBoolean } from 'lodash-es';
import { PopoverPlacement } from '../../../../enums';
import {
  useContentDimensions,
  PopoverContentDimensionsRefObject,
} from '../useContentDimensions';
import {
  placementPropsGetters,
  PopoverPlacementProps,
} from './placementsConfig';
import { UsePositionProps } from './types';
import {
  findScrollContainer,
  findFirstRelativeElement,
  fixPlacement,
} from './helpers';

export const usePosition = ({
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
}: UsePositionProps) => {
  const [containerProps, setContainerProps] = useState<PopoverPlacementProps>(
    {}
  );

  const contentDimensions: PopoverContentDimensionsRefObject = useRef();

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

    let actualPlacement: PopoverPlacement = placement;

    const scrollContainer = findScrollContainer(container);
    const scrollTop = scrollContainer.scrollTop;
    const scrollLeft = scrollContainer.scrollLeft;

    const offset = providedOffset;

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

      if (
        [PopoverPlacement.top, PopoverPlacement.bottom].includes(
          actualPlacement
        )
      ) {
        if (params.right < leftConstraint) {
          actualPlacement =
            actualPlacement === PopoverPlacement.top
              ? PopoverPlacement.topLeft
              : PopoverPlacement.bottomLeft;
        } else if (params.left > rightConstraint) {
          actualPlacement =
            actualPlacement === PopoverPlacement.top
              ? PopoverPlacement.topRight
              : PopoverPlacement.bottomRight;
        }
      } else if (
        [PopoverPlacement.right, PopoverPlacement.left].includes(
          actualPlacement
        )
      ) {
        if (params.bottom < topConstraint) {
          actualPlacement =
            actualPlacement === PopoverPlacement.left
              ? PopoverPlacement.leftTop
              : PopoverPlacement.rightTop;
        } else if (params.top > bottomConstraint) {
          actualPlacement =
            actualPlacement === PopoverPlacement.left
              ? PopoverPlacement.leftBottom
              : PopoverPlacement.rightBottom;
        }
      }

      if (
        [PopoverPlacement.top, PopoverPlacement.bottom].some((item) =>
          actualPlacement.startsWith(item)
        )
      ) {
        // two times to avoid wrong position replacement (second time returns old placement in wrong case)
        for (let i = 0; i < 2; i++) {
          actualPlacement = fixPlacement(
            actualPlacement,
            [PopoverPlacement.bottom, params.bottom, bottomConstraint],
            [PopoverPlacement.top, params.top, topConstraint]
          );
        }
      } else {
        for (let i = 0; i < 2; i++) {
          actualPlacement = fixPlacement(
            actualPlacement,
            [PopoverPlacement.top, params.top, bottomConstraint],
            [PopoverPlacement.bottom, params.bottom, topConstraint]
          );
        }
      }

      if (
        [PopoverPlacement.right, PopoverPlacement.left].some((item) =>
          actualPlacement.startsWith(item)
        )
      ) {
        for (let i = 0; i < 2; i++) {
          actualPlacement = fixPlacement(
            actualPlacement,
            [PopoverPlacement.right, params.right, rightConstraint],
            [PopoverPlacement.left, params.left, leftConstraint]
          );
        }
      } else {
        for (let i = 0; i < 2; i++) {
          actualPlacement = fixPlacement(
            actualPlacement,
            [PopoverPlacement.left, params.left, rightConstraint],
            [PopoverPlacement.right, params.right, leftConstraint]
          );
        }
      }

      if (
        [PopoverPlacement.top, PopoverPlacement.bottom].some(
          (item) =>
            placement.toLowerCase().indexOf(item) > -1 &&
            actualPlacement.toLowerCase().indexOf(item) === -1
        )
      ) {
        offset[1] = 0;
      }

      if (
        [PopoverPlacement.left, PopoverPlacement.right].some(
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
        fitMaxHeightToBounds: isBoolean(fitMaxHeightToBounds)
          ? fitMaxHeightToBounds
          : !maxHeight,
        fitMaxWidthToBounds: isBoolean(fitMaxWidthToBounds)
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
