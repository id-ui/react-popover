import { FlattenSimpleInterpolation } from 'styled-components';
import { PopoverProps } from '../../../../../types';

export interface GetDefaultOffsetArgs {
  withArrow: boolean;
  arrowSize: number;
  spaceBetweenPopoverAndTarget: number;
}

export interface ConfigProps
  extends Pick<
    PopoverProps,
    | 'withArrow'
    | 'animation'
    | 'openingAnimationTranslateDistance'
    | 'closingAnimationTranslateDistance'
    | 'spaceBetweenPopoverAndTarget'
    | 'arrowSize'
    | 'minSpaceBetweenPopoverAndContainer'
    | 'avoidOverflowBounds'
    | 'fitMaxHeightToBounds'
    | 'fitMaxWidthToBounds'
  > {
  offset: [number, number];
  verticalPadding: number;
  horizontalPadding: number;
  contentHeight: number;
  contentWidth: number;
  containerWidth: number;
  containerHeight: number;
  animation: {
    [key: string]: object;
  };
}

export interface PopoverPlacementProps {
  style?: FlattenSimpleInterpolation;
  initial?: object;
  animate?: object;
  exit?: object;
}

export type PopoverContentDimensionsRect = Pick<
  DOMRect,
  'left' | 'right' | 'top' | 'bottom' | 'width' | 'height'
>;
