import {
  ArrowPlacement,
  ArrowPlacementType,
  PopoverPlacement,
} from '../../../../enums';
import {
  ArrowPlacementStyles,
  getArrowPlacement,
} from './arrowPlacementGetters';

interface ArrowStyleGetterArgs {
  arrowSize: number;
  arrowPlacement: ArrowPlacement;
  arrowOffset: number;
}

type PopoverArrowStyleGetters = {
  [placement in PopoverPlacement]: (
    args: ArrowStyleGetterArgs
  ) => ArrowPlacementStyles;
};

export const arrowStyleGetters: PopoverArrowStyleGetters = {
  [PopoverPlacement.top]: ({ arrowSize, arrowPlacement, arrowOffset }) => ({
    top: `calc(100% - ${arrowSize / 2}px)`,
    ...getArrowPlacement({
      type: ArrowPlacementType.horizontal,
      arrowPlacement,
      arrowOffset,
      defaultPlacement: ArrowPlacement.center,
      angle: -45,
    }),
  }),
  [PopoverPlacement.topRight]: ({
    arrowSize,
    arrowPlacement,
    arrowOffset,
  }) => ({
    top: `calc(100% - ${arrowSize / 2}px)`,
    ...getArrowPlacement({
      type: ArrowPlacementType.horizontal,
      arrowPlacement,
      arrowOffset,
      defaultPlacement: ArrowPlacement.right,
      angle: -45,
    }),
  }),
  [PopoverPlacement.topLeft]: ({ arrowSize, arrowPlacement, arrowOffset }) => ({
    top: `calc(100% - ${arrowSize / 2}px)`,
    ...getArrowPlacement({
      type: ArrowPlacementType.horizontal,
      arrowPlacement,
      arrowOffset,
      defaultPlacement: ArrowPlacement.left,
      angle: -45,
    }),
  }),
  [PopoverPlacement.bottom]: ({ arrowSize, arrowPlacement, arrowOffset }) => ({
    bottom: `calc(100% - ${arrowSize / 2}px)`,
    ...getArrowPlacement({
      type: ArrowPlacementType.horizontal,
      arrowPlacement,
      arrowOffset,
      defaultPlacement: ArrowPlacement.center,
      angle: 135,
    }),
  }),
  [PopoverPlacement.bottomRight]: ({
    arrowSize,
    arrowPlacement,
    arrowOffset,
  }) => ({
    bottom: `calc(100% - ${arrowSize / 2}px)`,
    ...getArrowPlacement({
      type: ArrowPlacementType.horizontal,
      arrowPlacement,
      arrowOffset,
      defaultPlacement: ArrowPlacement.right,
      angle: 135,
    }),
  }),
  [PopoverPlacement.bottomLeft]: ({
    arrowSize,
    arrowPlacement,
    arrowOffset,
  }) => ({
    bottom: `calc(100% - ${arrowSize / 2}px)`,
    ...getArrowPlacement({
      type: ArrowPlacementType.horizontal,
      arrowPlacement,
      arrowOffset,
      defaultPlacement: ArrowPlacement.left,
      angle: 135,
    }),
  }),
  [PopoverPlacement.left]: ({ arrowSize, arrowPlacement, arrowOffset }) => ({
    left: `calc(100% - ${arrowSize / 2}px)`,
    ...getArrowPlacement({
      type: ArrowPlacementType.vertical,
      arrowPlacement,
      arrowOffset,
      defaultPlacement: ArrowPlacement.center,
      angle: -135,
    }),
  }),
  [PopoverPlacement.leftTop]: ({ arrowSize, arrowPlacement, arrowOffset }) => ({
    left: `calc(100% - ${arrowSize / 2}px)`,
    ...getArrowPlacement({
      type: ArrowPlacementType.vertical,
      arrowPlacement,
      arrowOffset,
      defaultPlacement: ArrowPlacement.top,
      angle: -135,
    }),
  }),
  [PopoverPlacement.leftBottom]: ({
    arrowSize,
    arrowPlacement,
    arrowOffset,
  }) => ({
    left: `calc(100% - ${arrowSize / 2}px)`,
    ...getArrowPlacement({
      type: ArrowPlacementType.vertical,
      arrowPlacement,
      arrowOffset,
      defaultPlacement: ArrowPlacement.bottom,
      angle: -135,
    }),
  }),
  [PopoverPlacement.right]: ({ arrowSize, arrowPlacement, arrowOffset }) => ({
    right: `calc(100% - ${arrowSize / 2}px)`,
    ...getArrowPlacement({
      type: ArrowPlacementType.vertical,
      arrowPlacement,
      arrowOffset,
      defaultPlacement: ArrowPlacement.center,
      angle: 45,
    }),
  }),
  [PopoverPlacement.rightTop]: ({
    arrowSize,
    arrowPlacement,
    arrowOffset,
  }) => ({
    right: `calc(100% - ${arrowSize / 2}px)`,
    ...getArrowPlacement({
      type: ArrowPlacementType.vertical,
      arrowPlacement,
      arrowOffset,
      defaultPlacement: ArrowPlacement.top,
      angle: 45,
    }),
  }),
  [PopoverPlacement.rightBottom]: ({
    arrowSize,
    arrowPlacement,
    arrowOffset,
  }) => ({
    right: `calc(100% - ${arrowSize / 2}px)`,
    ...getArrowPlacement({
      type: ArrowPlacementType.vertical,
      arrowPlacement,
      arrowOffset,
      defaultPlacement: ArrowPlacement.bottom,
      angle: 45,
    }),
  }),
};
