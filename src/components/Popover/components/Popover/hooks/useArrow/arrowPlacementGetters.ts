import { css, FlattenSimpleInterpolation } from 'styled-components';
import { ArrowPlacement, ArrowPlacementType } from '../../../../enums';

interface PopoverArrowPlacementGetterArgs {
  angle: number;
  arrowOffset?: number;
}

type PopoverArrowPlacementGetters = {
  [arrowPlacementType in ArrowPlacementType]: {
    [arrowPlacement in ArrowPlacement]?: (
      args: PopoverArrowPlacementGetterArgs
    ) => FlattenSimpleInterpolation;
  };
};

const arrowPlacementGetters: PopoverArrowPlacementGetters = {
  [ArrowPlacementType.vertical]: {
    [ArrowPlacement.center]: ({ angle }) => css`
      top: 50%;
      transform: translateY(-50%) rotate(${angle}deg);
    `,
    [ArrowPlacement.top]: ({ angle, arrowOffset }) => css`
      top: ${arrowOffset}px;
      transform: rotate(${angle}deg);
    `,
    [ArrowPlacement.bottom]: ({ angle, arrowOffset }) => css`
      bottom: ${arrowOffset}px;
      transform: rotate(${angle}deg);
    `,
  },
  [ArrowPlacementType.horizontal]: {
    [ArrowPlacement.center]: ({ angle }) => css`
      left: 50%;
      transform: translateX(-50%) rotate(${angle}deg);
    `,
    [ArrowPlacement.right]: ({ angle, arrowOffset }) => css`
      right: ${arrowOffset}px;
      transform: rotate(${angle}deg);
    `,
    [ArrowPlacement.left]: ({ angle, arrowOffset }) => css`
      left: ${arrowOffset}px;
      transform: rotate(${angle}deg);
    `,
  },
};

interface GetPopoverArrowPlacementArgs {
  type: ArrowPlacementType;
  angle: number;
  arrowPlacement: ArrowPlacement;
  arrowOffset: number;
  defaultPlacement: ArrowPlacement;
}

export const getArrowPlacement = ({
  type,
  angle,
  arrowPlacement,
  arrowOffset,
  defaultPlacement,
}: GetPopoverArrowPlacementArgs): FlattenSimpleInterpolation =>
  arrowPlacementGetters[type][
    arrowPlacementGetters[type][arrowPlacement]
      ? arrowPlacement
      : defaultPlacement
  ]({ angle, arrowOffset });
