import { css, FlattenSimpleInterpolation } from 'styled-components';
import {
  ArrowPlacement,
  ArrowPlacementType,
  PopoverPlacement,
} from '../../../../enums';
import { getArrowPlacement } from './arrowPlacementGetters';

interface ArrowStyleGetterArgs {
  arrowSize: number;
  arrowPlacement: ArrowPlacement;
  arrowOffset: number;
}

type PopoverArrowStyleGetters = {
  [placement in PopoverPlacement]: (
    args: ArrowStyleGetterArgs
  ) => FlattenSimpleInterpolation;
};

export const arrowStyleGetters: PopoverArrowStyleGetters = {
  [PopoverPlacement.top]: ({ arrowSize, arrowPlacement, arrowOffset }) => css`
    top: calc(100% - ${arrowSize / 2}px);
    ${getArrowPlacement({
      type: ArrowPlacementType.horizontal,
      arrowPlacement,
      arrowOffset,
      defaultPlacement: ArrowPlacement.center,
      angle: -45,
    })};
  `,
  [PopoverPlacement.topRight]: ({
    arrowSize,
    arrowPlacement,
    arrowOffset,
  }) => css`
    top: calc(100% - ${arrowSize / 2}px);
    ${getArrowPlacement({
      type: ArrowPlacementType.horizontal,
      arrowPlacement,
      arrowOffset,
      defaultPlacement: ArrowPlacement.right,
      angle: -45,
    })};
  `,
  [PopoverPlacement.topLeft]: ({
    arrowSize,
    arrowPlacement,
    arrowOffset,
  }) => css`
    top: calc(100% - ${arrowSize / 2}px);
    ${getArrowPlacement({
      type: ArrowPlacementType.horizontal,
      arrowPlacement,
      arrowOffset,
      defaultPlacement: ArrowPlacement.left,
      angle: -45,
    })};
  `,
  [PopoverPlacement.bottom]: ({
    arrowSize,
    arrowPlacement,
    arrowOffset,
  }) => css`
    bottom: calc(100% - ${arrowSize / 2}px);
    ${getArrowPlacement({
      type: ArrowPlacementType.horizontal,
      arrowPlacement,
      arrowOffset,
      defaultPlacement: ArrowPlacement.center,
      angle: 135,
    })};
  `,
  [PopoverPlacement.bottomRight]: ({
    arrowSize,
    arrowPlacement,
    arrowOffset,
  }) => css`
    bottom: calc(100% - ${arrowSize / 2}px);
    ${getArrowPlacement({
      type: ArrowPlacementType.horizontal,
      arrowPlacement,
      arrowOffset,
      defaultPlacement: ArrowPlacement.right,
      angle: 135,
    })};
  `,
  [PopoverPlacement.bottomLeft]: ({
    arrowSize,
    arrowPlacement,
    arrowOffset,
  }) => css`
    bottom: calc(100% - ${arrowSize / 2}px);
    ${getArrowPlacement({
      type: ArrowPlacementType.horizontal,
      arrowPlacement,
      arrowOffset,
      defaultPlacement: ArrowPlacement.left,
      angle: 135,
    })};
  `,
  [PopoverPlacement.left]: ({ arrowSize, arrowPlacement, arrowOffset }) => css`
    left: calc(100% - ${arrowSize / 2}px);
    ${getArrowPlacement({
      type: ArrowPlacementType.vertical,
      arrowPlacement,
      arrowOffset,
      defaultPlacement: ArrowPlacement.center,
      angle: -135,
    })};
  `,
  [PopoverPlacement.leftTop]: ({
    arrowSize,
    arrowPlacement,
    arrowOffset,
  }) => css`
    left: calc(100% - ${arrowSize / 2}px);
    ${getArrowPlacement({
      type: ArrowPlacementType.vertical,
      arrowPlacement,
      arrowOffset,
      defaultPlacement: ArrowPlacement.top,
      angle: -135,
    })};
  `,
  [PopoverPlacement.leftBottom]: ({
    arrowSize,
    arrowPlacement,
    arrowOffset,
  }) => css`
    left: calc(100% - ${arrowSize / 2}px);
    ${getArrowPlacement({
      type: ArrowPlacementType.vertical,
      arrowPlacement,
      arrowOffset,
      defaultPlacement: ArrowPlacement.bottom,
      angle: -135,
    })};
  `,
  [PopoverPlacement.right]: ({ arrowSize, arrowPlacement, arrowOffset }) => css`
    right: calc(100% - ${arrowSize / 2}px);
    ${getArrowPlacement({
      type: ArrowPlacementType.vertical,
      arrowPlacement,
      arrowOffset,
      defaultPlacement: ArrowPlacement.center,
      angle: 45,
    })};
  `,
  [PopoverPlacement.rightTop]: ({
    arrowSize,
    arrowPlacement,
    arrowOffset,
  }) => css`
    right: calc(100% - ${arrowSize / 2}px);
    ${getArrowPlacement({
      type: ArrowPlacementType.vertical,
      arrowPlacement,
      arrowOffset,
      defaultPlacement: ArrowPlacement.top,
      angle: 45,
    })};
  `,
  [PopoverPlacement.rightBottom]: ({
    arrowSize,
    arrowPlacement,
    arrowOffset,
  }) => css`
    right: calc(100% - ${arrowSize / 2}px);
    ${getArrowPlacement({
      type: ArrowPlacementType.vertical,
      arrowPlacement,
      arrowOffset,
      defaultPlacement: ArrowPlacement.bottom,
      angle: 45,
    })};
  `,
};
