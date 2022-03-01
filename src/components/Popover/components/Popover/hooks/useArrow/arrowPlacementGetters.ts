import { ArrowPlacement, ArrowPlacementType } from '../../../../enums';

interface PopoverArrowPlacementGetterArgs {
  angle: number;
  arrowOffset?: number;
}

type PopoverArrowPlacementGetters = {
  [arrowPlacementType in ArrowPlacementType]: {
    [arrowPlacement in ArrowPlacement]?: (
      args: PopoverArrowPlacementGetterArgs
    ) => ArrowPlacementStyles;
  };
};

const arrowPlacementGetters: PopoverArrowPlacementGetters = {
  [ArrowPlacementType.vertical]: {
    [ArrowPlacement.center]: ({ angle }) => ({
      top: '50%',
      transform: `translateY(-50%) rotate(${angle}deg)`,
    }),
    [ArrowPlacement.top]: ({ angle, arrowOffset }) => ({
      top: `${arrowOffset}px`,
      transform: `rotate(${angle}deg)`,
    }),
    [ArrowPlacement.bottom]: ({ angle, arrowOffset }) => ({
      bottom: `${arrowOffset}px`,
      transform: `rotate(${angle}deg)`,
    }),
  },
  [ArrowPlacementType.horizontal]: {
    [ArrowPlacement.center]: ({ angle }) => ({
      left: '50%',
      transform: `translateX(-50%) rotate(${angle}deg)`,
    }),
    [ArrowPlacement.right]: ({ angle, arrowOffset }) => ({
      right: `${arrowOffset}px`,
      transform: `rotate(${angle}deg)`,
    }),
    [ArrowPlacement.left]: ({ angle, arrowOffset }) => ({
      left: `${arrowOffset}px`,
      transform: `rotate(${angle}deg)`,
    }),
  },
};

interface GetPopoverArrowPlacementArgs {
  type: ArrowPlacementType;
  angle: number;
  arrowPlacement: ArrowPlacement;
  arrowOffset: number;
  defaultPlacement: ArrowPlacement;
}

export interface ArrowPlacementStyles {
  top?: string;
  bottom?: string;
  right?: string;
  left?: string;
  transform?: string;
}

export const getArrowPlacement = ({
  type,
  angle,
  arrowPlacement,
  arrowOffset,
  defaultPlacement,
}: GetPopoverArrowPlacementArgs): ArrowPlacementStyles =>
  arrowPlacementGetters[type][
    arrowPlacementGetters[type][arrowPlacement]
      ? arrowPlacement
      : defaultPlacement
  ]({ angle, arrowOffset });
