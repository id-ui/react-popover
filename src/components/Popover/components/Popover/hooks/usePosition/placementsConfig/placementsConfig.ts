import { css } from 'styled-components';
import { PopoverPlacement } from '../../../../../enums';
import { Inner } from '../../../styled';
import { PopoverContentDimensionsRect } from './types';
import {
  ConfigProps,
  GetDefaultOffsetArgs,
  PopoverPlacementProps,
} from './types';

const getDefaultOffset = ({
  withArrow,
  arrowSize,
  spaceBetweenPopoverAndTarget,
}: GetDefaultOffsetArgs): number =>
  spaceBetweenPopoverAndTarget + (withArrow ? arrowSize / 2 : 0);

export const placementPropsGetters: {
  [placement in PopoverPlacement]: (
    rect: PopoverContentDimensionsRect,
    props: ConfigProps
  ) => PopoverPlacementProps;
} = {
  [PopoverPlacement.top]: (
    { width, top, left },
    {
      offset,
      withArrow,
      animation,
      openingAnimationTranslateDistance,
      closingAnimationTranslateDistance,
      minSpaceBetweenPopoverAndContainer,
      spaceBetweenPopoverAndTarget,
      arrowSize,
      fitMaxHeightToBounds,
      fitMaxWidthToBounds,
      verticalPadding,
      horizontalPadding,
      avoidOverflowBounds,
      contentHeight,
      contentWidth,
      containerWidth,
    }
  ) => {
    const fullYOffset =
      offset[1] -
      getDefaultOffset({ withArrow, arrowSize, spaceBetweenPopoverAndTarget });

    const maxContentHeight = fitMaxHeightToBounds
      ? top + fullYOffset - minSpaceBetweenPopoverAndContainer
      : contentHeight;
    const maxContentWidth = fitMaxWidthToBounds
      ? containerWidth - minSpaceBetweenPopoverAndContainer * 2
      : contentWidth;

    return {
      style: css`
        top: ${fitMaxHeightToBounds || !avoidOverflowBounds
          ? top + fullYOffset
          : Math.max(
              top + fullYOffset,
              contentHeight + minSpaceBetweenPopoverAndContainer
            )}px;
        left: ${left + width / 2 + offset[0]}px;
        ${Inner} {
          max-height: ${maxContentHeight - verticalPadding}px;
          max-width: ${maxContentWidth - horizontalPadding}px;
          min-width: ${Math.min(maxContentWidth, contentWidth) -
          horizontalPadding}px;
        }
      `,
      initial: {
        ...animation.initial,
        y: `-${100 - openingAnimationTranslateDistance}%`,
        x: '-50%',
      },
      animate: {
        ...animation.animate,
        y: '-100%',
        x: '-50%',
      },
      exit: {
        ...animation.exit,
        y: `-${100 - closingAnimationTranslateDistance}%`,
        x: '-50%',
      },
    };
  },
  [PopoverPlacement.topRight]: (
    { top, right },
    {
      offset,
      withArrow,
      animation,
      openingAnimationTranslateDistance,
      closingAnimationTranslateDistance,
      minSpaceBetweenPopoverAndContainer,
      spaceBetweenPopoverAndTarget,
      arrowSize,
      fitMaxHeightToBounds,
      fitMaxWidthToBounds,
      verticalPadding,
      horizontalPadding,
      avoidOverflowBounds,
      contentHeight,
      contentWidth,
    }
  ) => {
    const fullYOffset =
      offset[1] -
      getDefaultOffset({ withArrow, arrowSize, spaceBetweenPopoverAndTarget });

    const maxContentHeight = fitMaxHeightToBounds
      ? top + fullYOffset - minSpaceBetweenPopoverAndContainer
      : contentHeight;
    const maxContentWidth = fitMaxWidthToBounds
      ? right + offset[0] - minSpaceBetweenPopoverAndContainer
      : contentWidth;

    return {
      style: css`
        top: ${fitMaxHeightToBounds || !avoidOverflowBounds
          ? top + fullYOffset
          : Math.max(
              top + fullYOffset,
              contentHeight + minSpaceBetweenPopoverAndContainer
            )}px;
        left: ${fitMaxWidthToBounds || !avoidOverflowBounds
          ? right + offset[0]
          : Math.max(
              right + offset[0],
              contentWidth + minSpaceBetweenPopoverAndContainer
            )}px;
        ${Inner} {
          max-height: ${maxContentHeight - verticalPadding}px;
          max-width: ${maxContentWidth - horizontalPadding}px;
          min-width: ${Math.min(maxContentWidth, contentWidth) -
          horizontalPadding}px;
        }
      `,
      initial: {
        ...animation.initial,
        x: `-${100 - openingAnimationTranslateDistance}%`,
        y: '-100%',
      },
      animate: {
        ...animation.animate,
        x: '-100%',
        y: '-100%',
      },
      exit: {
        ...animation.exit,
        x: `-${100 - closingAnimationTranslateDistance}%`,
        y: '-100%',
      },
    };
  },
  [PopoverPlacement.topLeft]: (
    { top, left },
    {
      offset,
      withArrow,
      animation,
      openingAnimationTranslateDistance,
      closingAnimationTranslateDistance,
      minSpaceBetweenPopoverAndContainer,
      spaceBetweenPopoverAndTarget,
      arrowSize,
      fitMaxHeightToBounds,
      fitMaxWidthToBounds,
      verticalPadding,
      horizontalPadding,
      avoidOverflowBounds,
      contentHeight,
      contentWidth,
      containerWidth,
    }
  ) => {
    const fullYOffset =
      offset[1] -
      getDefaultOffset({ withArrow, arrowSize, spaceBetweenPopoverAndTarget });

    const maxContentHeight = fitMaxHeightToBounds
      ? top + fullYOffset - minSpaceBetweenPopoverAndContainer
      : contentHeight;
    const maxContentWidth = fitMaxWidthToBounds
      ? containerWidth - (left + offset[0] + minSpaceBetweenPopoverAndContainer)
      : contentWidth;

    return {
      style: css`
        top: ${fitMaxHeightToBounds || !avoidOverflowBounds
          ? top + fullYOffset
          : Math.max(
              top + fullYOffset,
              contentHeight + minSpaceBetweenPopoverAndContainer
            )}px;
        left: ${fitMaxWidthToBounds || !avoidOverflowBounds
          ? left + offset[0]
          : Math.min(
              left + offset[0],
              containerWidth - contentWidth - minSpaceBetweenPopoverAndContainer
            )}px;
        ${Inner} {
          max-height: ${maxContentHeight - verticalPadding}px;
          max-width: ${maxContentWidth - horizontalPadding}px;
        }
      `,
      initial: {
        ...animation.initial,
        x: `-${openingAnimationTranslateDistance}%`,
        y: '-100%',
      },
      animate: {
        ...animation.animate,
        x: 0,
        y: '-100%',
      },
      exit: {
        ...animation.exit,
        x: `-${closingAnimationTranslateDistance}%`,
        y: '-100%',
      },
    };
  },
  [PopoverPlacement.bottom]: (
    { bottom, left, width },
    {
      offset,
      withArrow,
      animation,
      openingAnimationTranslateDistance,
      closingAnimationTranslateDistance,
      minSpaceBetweenPopoverAndContainer,
      spaceBetweenPopoverAndTarget,
      arrowSize,
      fitMaxHeightToBounds,
      fitMaxWidthToBounds,
      verticalPadding,
      horizontalPadding,
      avoidOverflowBounds,
      contentHeight,
      contentWidth,
      containerHeight,
      containerWidth,
    }
  ) => {
    const fullYOffset =
      offset[1] +
      getDefaultOffset({ withArrow, arrowSize, spaceBetweenPopoverAndTarget });

    const maxContentHeight = fitMaxHeightToBounds
      ? containerHeight -
        (bottom + fullYOffset + minSpaceBetweenPopoverAndContainer)
      : contentHeight;
    const maxContentWidth = fitMaxWidthToBounds
      ? containerWidth - minSpaceBetweenPopoverAndContainer * 2
      : contentWidth;

    return {
      style: css`
        top: ${fitMaxHeightToBounds || !avoidOverflowBounds
          ? bottom + fullYOffset
          : Math.min(
              bottom + fullYOffset,
              containerHeight -
                contentHeight -
                minSpaceBetweenPopoverAndContainer
            )}px;
        left: ${left + width / 2 + offset[0]}px;
        ${Inner} {
          max-height: ${maxContentHeight - verticalPadding}px;
          max-width: ${maxContentWidth - horizontalPadding}px;
          min-width: ${Math.min(maxContentWidth, contentWidth) -
          horizontalPadding}px;
        }
      `,
      initial: {
        ...animation.initial,
        y: `-${openingAnimationTranslateDistance}%`,
        x: '-50%',
      },
      animate: {
        ...animation.animate,
        y: 0,
        x: '-50%',
      },
      exit: {
        ...animation.exit,
        y: `-${closingAnimationTranslateDistance}%`,
        x: '-50%',
      },
    };
  },
  [PopoverPlacement.bottomRight]: (
    { bottom, right },
    {
      offset,
      withArrow,
      animation,
      openingAnimationTranslateDistance,
      closingAnimationTranslateDistance,
      minSpaceBetweenPopoverAndContainer,
      spaceBetweenPopoverAndTarget,
      arrowSize,
      fitMaxHeightToBounds,
      fitMaxWidthToBounds,
      verticalPadding,
      horizontalPadding,
      avoidOverflowBounds,
      contentHeight,
      contentWidth,
      containerHeight,
    }
  ) => {
    const fullYOffset =
      offset[1] +
      getDefaultOffset({ withArrow, arrowSize, spaceBetweenPopoverAndTarget });

    const maxContentHeight = fitMaxHeightToBounds
      ? containerHeight -
        (bottom + fullYOffset + minSpaceBetweenPopoverAndContainer)
      : contentHeight;
    const maxContentWidth = fitMaxWidthToBounds
      ? right + offset[0] - minSpaceBetweenPopoverAndContainer
      : contentWidth;

    return {
      style: css`
        top: ${fitMaxHeightToBounds || !avoidOverflowBounds
          ? bottom + fullYOffset
          : Math.min(
              bottom + fullYOffset,
              containerHeight -
                contentHeight -
                minSpaceBetweenPopoverAndContainer
            )}px;
        left: ${fitMaxWidthToBounds || !avoidOverflowBounds
          ? right + offset[0]
          : Math.max(
              right + offset[0],
              contentWidth + minSpaceBetweenPopoverAndContainer
            )}px;
        ${Inner} {
          max-height: ${maxContentHeight - verticalPadding}px;
          max-width: ${maxContentWidth - horizontalPadding}px;
          min-width: ${Math.min(maxContentWidth, contentWidth) -
          horizontalPadding}px;
        }
      `,
      initial: {
        ...animation.initial,
        x: `-${100 - openingAnimationTranslateDistance}%`,
      },
      animate: {
        ...animation.animate,
        x: '-100%',
      },
      exit: {
        ...animation.exit,
        x: `-${100 - closingAnimationTranslateDistance}%`,
      },
    };
  },
  [PopoverPlacement.bottomLeft]: (
    { bottom, left },
    {
      offset,
      withArrow,
      animation,
      openingAnimationTranslateDistance,
      closingAnimationTranslateDistance,
      minSpaceBetweenPopoverAndContainer,
      spaceBetweenPopoverAndTarget,
      arrowSize,
      fitMaxHeightToBounds,
      fitMaxWidthToBounds,
      verticalPadding,
      horizontalPadding,
      avoidOverflowBounds,
      contentHeight,
      contentWidth,
      containerHeight,
      containerWidth,
    }
  ) => {
    const fullYOffset =
      offset[1] +
      getDefaultOffset({ withArrow, arrowSize, spaceBetweenPopoverAndTarget });

    const maxContentHeight = fitMaxHeightToBounds
      ? containerHeight -
        (bottom + fullYOffset + minSpaceBetweenPopoverAndContainer)
      : contentHeight;
    const maxContentWidth = fitMaxWidthToBounds
      ? containerWidth - (left + offset[0] + minSpaceBetweenPopoverAndContainer)
      : contentWidth;

    return {
      style: css`
        top: ${fitMaxHeightToBounds || !avoidOverflowBounds
          ? bottom + fullYOffset
          : Math.min(
              bottom + fullYOffset,
              containerHeight -
                contentHeight -
                minSpaceBetweenPopoverAndContainer
            )}px;
        left: ${fitMaxWidthToBounds || !avoidOverflowBounds
          ? left + offset[0]
          : Math.min(
              left + offset[0],
              containerWidth - contentWidth - minSpaceBetweenPopoverAndContainer
            )}px;
        ${Inner} {
          max-height: ${maxContentHeight - verticalPadding}px;
          max-width: ${maxContentWidth - horizontalPadding}px;
        }
      `,
      initial: {
        ...animation.initial,
        x: `-${openingAnimationTranslateDistance}%`,
      },
      animate: {
        ...animation.animate,
        x: 0,
      },
      exit: {
        ...animation.exit,
        x: `-${closingAnimationTranslateDistance}%`,
      },
    };
  },
  [PopoverPlacement.left]: (
    { height, top, left },
    {
      offset,
      withArrow,
      animation,
      openingAnimationTranslateDistance,
      closingAnimationTranslateDistance,
      minSpaceBetweenPopoverAndContainer,
      spaceBetweenPopoverAndTarget,
      arrowSize,
      fitMaxHeightToBounds,
      fitMaxWidthToBounds,
      verticalPadding,
      horizontalPadding,
      avoidOverflowBounds,
      contentHeight,
      contentWidth,
      containerHeight,
      containerWidth,
    }
  ) => {
    const fullXOffset =
      offset[0] -
      getDefaultOffset({ withArrow, arrowSize, spaceBetweenPopoverAndTarget });

    const maxContentHeight = fitMaxHeightToBounds
      ? containerHeight - minSpaceBetweenPopoverAndContainer * 2
      : contentHeight;
    const maxContentWidth = fitMaxWidthToBounds
      ? left + fullXOffset - minSpaceBetweenPopoverAndContainer
      : contentWidth;

    return {
      style: css`
        left: ${fitMaxWidthToBounds || !avoidOverflowBounds
          ? left + fullXOffset
          : left + fullXOffset >
            containerWidth - contentWidth - minSpaceBetweenPopoverAndContainer
          ? minSpaceBetweenPopoverAndContainer + contentWidth
          : left + fullXOffset}px;
        top: ${top + height / 2 + offset[1]}px;
        ${Inner} {
          max-height: ${maxContentHeight - verticalPadding}px;
          max-width: ${maxContentWidth - horizontalPadding}px;
          min-width: ${Math.min(maxContentWidth, contentWidth) -
          horizontalPadding}px;
        }
      `,
      initial: {
        ...animation.initial,
        x: `-${100 - openingAnimationTranslateDistance}%`,
        y: '-50%',
      },
      animate: {
        ...animation.animate,
        x: '-100%',
        y: '-50%',
      },
      exit: {
        ...animation.exit,
        x: `-${100 - closingAnimationTranslateDistance}%`,
        y: '-50%',
      },
    };
  },
  [PopoverPlacement.leftBottom]: (
    { bottom, left },
    {
      offset,
      withArrow,
      animation,
      openingAnimationTranslateDistance,
      closingAnimationTranslateDistance,
      minSpaceBetweenPopoverAndContainer,
      spaceBetweenPopoverAndTarget,
      arrowSize,
      fitMaxHeightToBounds,
      fitMaxWidthToBounds,
      verticalPadding,
      horizontalPadding,
      avoidOverflowBounds,
      contentHeight,
      contentWidth,
      containerWidth,
    }
  ) => {
    const fullXOffset =
      offset[0] -
      getDefaultOffset({ withArrow, arrowSize, spaceBetweenPopoverAndTarget });

    const maxContentHeight = fitMaxHeightToBounds
      ? bottom + offset[1] - minSpaceBetweenPopoverAndContainer
      : contentHeight;
    const maxContentWidth = fitMaxWidthToBounds
      ? left + fullXOffset - minSpaceBetweenPopoverAndContainer
      : contentWidth;

    return {
      style: css`
        left: ${fitMaxWidthToBounds || !avoidOverflowBounds
          ? left + fullXOffset
          : left + fullXOffset >
            containerWidth - contentWidth - minSpaceBetweenPopoverAndContainer
          ? minSpaceBetweenPopoverAndContainer + contentWidth
          : left + fullXOffset}px;
        top: ${fitMaxHeightToBounds || !avoidOverflowBounds
          ? bottom + offset[1]
          : Math.max(
              bottom + offset[1],
              contentHeight + minSpaceBetweenPopoverAndContainer
            )}px;
        ${Inner} {
          max-height: ${maxContentHeight - verticalPadding}px;
          max-width: ${maxContentWidth - horizontalPadding}px;
          min-width: ${Math.min(maxContentWidth, contentWidth) -
          horizontalPadding}px;
        }
      `,
      initial: {
        ...animation.initial,
        x: `-${100 - openingAnimationTranslateDistance}%`,
        y: '-100%',
      },
      animate: {
        ...animation.animate,
        x: '-100%',
        y: '-100%',
      },
      exit: {
        ...animation.exit,
        x: `-${100 - closingAnimationTranslateDistance}%`,
        y: '-100%',
      },
    };
  },
  [PopoverPlacement.leftTop]: (
    { top, left },
    {
      offset,
      withArrow,
      animation,
      openingAnimationTranslateDistance,
      closingAnimationTranslateDistance,
      minSpaceBetweenPopoverAndContainer,
      spaceBetweenPopoverAndTarget,
      arrowSize,
      fitMaxHeightToBounds,
      fitMaxWidthToBounds,
      verticalPadding,
      horizontalPadding,
      avoidOverflowBounds,
      contentHeight,
      contentWidth,
      containerHeight,
      containerWidth,
    }
  ) => {
    const fullXOffset =
      offset[0] -
      getDefaultOffset({ withArrow, arrowSize, spaceBetweenPopoverAndTarget });

    const maxContentHeight = fitMaxHeightToBounds
      ? containerHeight - (minSpaceBetweenPopoverAndContainer + top + offset[1])
      : contentHeight;
    const maxContentWidth = fitMaxWidthToBounds
      ? left + fullXOffset - minSpaceBetweenPopoverAndContainer
      : contentWidth;

    return {
      style: css`
        left: ${fitMaxWidthToBounds || !avoidOverflowBounds
          ? left + fullXOffset
          : left + fullXOffset >
            containerWidth - contentWidth - minSpaceBetweenPopoverAndContainer
          ? minSpaceBetweenPopoverAndContainer + contentWidth
          : left + fullXOffset}px;
        top: ${fitMaxHeightToBounds || !avoidOverflowBounds
          ? top + offset[1]
          : Math.min(
              top + offset[1],
              containerHeight -
                contentHeight -
                minSpaceBetweenPopoverAndContainer
            )}px;
        ${Inner} {
          max-height: ${maxContentHeight - verticalPadding}px;
          max-width: ${maxContentWidth - horizontalPadding}px;
          min-width: ${Math.min(maxContentWidth, contentWidth) -
          horizontalPadding}px;
        }
      `,
      initial: {
        ...animation.initial,
        x: `-${100 - openingAnimationTranslateDistance}%`,
      },
      animate: {
        ...animation.animate,
        x: '-100%',
      },
      exit: {
        ...animation.exit,
        x: `-${100 - closingAnimationTranslateDistance}%`,
      },
    };
  },
  [PopoverPlacement.right]: (
    { height, top, right },
    {
      offset,
      withArrow,
      animation,
      openingAnimationTranslateDistance,
      closingAnimationTranslateDistance,
      minSpaceBetweenPopoverAndContainer,
      spaceBetweenPopoverAndTarget,
      arrowSize,
      fitMaxHeightToBounds,
      fitMaxWidthToBounds,
      verticalPadding,
      horizontalPadding,
      avoidOverflowBounds,
      contentHeight,
      contentWidth,
      containerHeight,
      containerWidth,
    }
  ) => {
    const fullXOffset =
      offset[0] +
      getDefaultOffset({ withArrow, arrowSize, spaceBetweenPopoverAndTarget });

    const maxContentHeight = fitMaxHeightToBounds
      ? containerHeight - minSpaceBetweenPopoverAndContainer * 2
      : contentHeight;
    const maxContentWidth = fitMaxWidthToBounds
      ? containerWidth -
        right -
        fullXOffset -
        minSpaceBetweenPopoverAndContainer
      : contentWidth;

    return {
      style: css`
        left: ${fitMaxWidthToBounds || !avoidOverflowBounds
          ? right + fullXOffset
          : Math.min(
              right + fullXOffset,
              containerWidth - contentWidth - minSpaceBetweenPopoverAndContainer
            )}px;
        top: ${top + height / 2 + offset[1]}px;
        ${Inner} {
          max-height: ${maxContentHeight - verticalPadding}px;
          max-width: ${maxContentWidth - horizontalPadding}px;
        }
      `,
      initial: {
        ...animation.initial,
        x: `-${openingAnimationTranslateDistance}%`,
        y: '-50%',
      },
      animate: {
        ...animation.animate,
        x: 0,
        y: '-50%',
      },
      exit: {
        ...animation.exit,
        x: `-${closingAnimationTranslateDistance}%`,
        y: '-50%',
      },
    };
  },
  [PopoverPlacement.rightBottom]: (
    { bottom, right },
    {
      offset,
      withArrow,
      animation,
      openingAnimationTranslateDistance,
      closingAnimationTranslateDistance,
      minSpaceBetweenPopoverAndContainer,
      spaceBetweenPopoverAndTarget,
      arrowSize,
      fitMaxHeightToBounds,
      fitMaxWidthToBounds,
      verticalPadding,
      horizontalPadding,
      avoidOverflowBounds,
      contentHeight,
      contentWidth,
      containerWidth,
    }
  ) => {
    const fullXOffset =
      offset[0] +
      getDefaultOffset({ withArrow, arrowSize, spaceBetweenPopoverAndTarget });

    const maxContentHeight = fitMaxHeightToBounds
      ? bottom + offset[1] - minSpaceBetweenPopoverAndContainer
      : contentHeight;
    const maxContentWidth = fitMaxWidthToBounds
      ? containerWidth -
        right -
        fullXOffset -
        minSpaceBetweenPopoverAndContainer
      : contentWidth;

    return {
      style: css`
        left: ${fitMaxWidthToBounds || !avoidOverflowBounds
          ? right + fullXOffset
          : Math.min(
              right + fullXOffset,
              containerWidth - contentWidth - minSpaceBetweenPopoverAndContainer
            )}px;
        top: ${fitMaxHeightToBounds || !avoidOverflowBounds
          ? bottom + offset[1]
          : Math.max(
              bottom + offset[1],
              contentHeight + minSpaceBetweenPopoverAndContainer
            )}px;
        ${Inner} {
          max-height: ${maxContentHeight - verticalPadding}px;
          max-width: ${maxContentWidth - horizontalPadding}px;
        }
      `,
      initial: {
        ...animation.initial,
        x: `-${openingAnimationTranslateDistance}%`,
        y: '-100%',
      },
      animate: {
        ...animation.animate,
        x: 0,
        y: '-100%',
      },
      exit: {
        ...animation.exit,
        x: `-${closingAnimationTranslateDistance}%`,
        y: '-100%',
      },
    };
  },
  [PopoverPlacement.rightTop]: (
    { top, right },
    {
      offset,
      withArrow,
      animation,
      openingAnimationTranslateDistance,
      closingAnimationTranslateDistance,
      minSpaceBetweenPopoverAndContainer,
      spaceBetweenPopoverAndTarget,
      arrowSize,
      fitMaxHeightToBounds,
      fitMaxWidthToBounds,
      verticalPadding,
      horizontalPadding,
      avoidOverflowBounds,
      contentHeight,
      contentWidth,
      containerHeight,
      containerWidth,
    }
  ) => {
    const fullXOffset =
      offset[0] +
      getDefaultOffset({ withArrow, arrowSize, spaceBetweenPopoverAndTarget });

    const maxContentHeight = fitMaxHeightToBounds
      ? containerHeight - (minSpaceBetweenPopoverAndContainer + top + offset[1])
      : contentHeight;
    const maxContentWidth = fitMaxWidthToBounds
      ? containerWidth -
        right -
        fullXOffset -
        minSpaceBetweenPopoverAndContainer
      : contentWidth;
    return {
      style: css`
        left: ${fitMaxWidthToBounds || !avoidOverflowBounds
          ? right + fullXOffset
          : Math.min(
              right + fullXOffset,
              containerWidth - contentWidth - minSpaceBetweenPopoverAndContainer
            )}px;
        top: ${fitMaxHeightToBounds || !avoidOverflowBounds
          ? top + offset[1]
          : Math.min(
              top + offset[1],
              containerHeight -
                contentHeight -
                minSpaceBetweenPopoverAndContainer
            )}px;
        ${Inner} {
          max-height: ${maxContentHeight - verticalPadding}px;
          max-width: ${maxContentWidth - horizontalPadding}px;
          min-width: ${Math.min(maxContentWidth, contentWidth) -
          horizontalPadding}px;
        }
      `,
      initial: {
        ...animation.initial,
        x: `-${openingAnimationTranslateDistance}%`,
      },
      animate: {
        ...animation.animate,
        x: 0,
      },
      exit: {
        ...animation.exit,
        x: `-${closingAnimationTranslateDistance}%`,
      },
    };
  },
};
