import { css } from 'styled-components';
import { useMemo } from 'react';
import { ARROW_PLACEMENT_TYPES, ARROW_PLACEMENTS } from '../constants';

const arrowPlacementGetters = {
  [ARROW_PLACEMENT_TYPES.vertical]: {
    [ARROW_PLACEMENTS.center]: ({ angle }) => css`
      top: 50%;
      transform: translateY(-50%) rotate(${angle}deg);
    `,
    [ARROW_PLACEMENTS.top]: ({ angle, arrowOffset }) => css`
      top: ${arrowOffset}px;
      transform: rotate(${angle}deg);
    `,
    [ARROW_PLACEMENTS.bottom]: ({ angle, arrowOffset }) => css`
      bottom: ${arrowOffset}px;
      transform: rotate(${angle}deg);
    `,
  },
  [ARROW_PLACEMENT_TYPES.horizontal]: {
    [ARROW_PLACEMENTS.center]: ({ angle }) => css`
      left: 50%;
      transform: translateX(-50%) rotate(${angle}deg);
    `,
    [ARROW_PLACEMENTS.right]: ({ angle, arrowOffset }) => css`
      right: ${arrowOffset}px;
      transform: rotate(${angle}deg);
    `,
    [ARROW_PLACEMENTS.left]: ({ angle, arrowOffset }) => css`
      left: ${arrowOffset}px;
      transform: rotate(${angle}deg);
    `,
  },
};

const getArrowPlacement = ({
  type,
  angle,
  arrowPlacement,
  arrowOffset,
  defaultPlacement,
}) =>
  arrowPlacementGetters[type][
    arrowPlacementGetters[type][arrowPlacement]
      ? arrowPlacement
      : defaultPlacement
  ]({ angle, arrowOffset });

const arrowStyleGetters = {
  top: ({ arrowSize, arrowPlacement, arrowOffset }) => css`
    top: calc(100% - ${arrowSize / 2}px);
    ${getArrowPlacement({
      type: ARROW_PLACEMENT_TYPES.horizontal,
      arrowPlacement,
      arrowOffset,
      defaultPlacement: ARROW_PLACEMENTS.center,
      angle: -45,
    })};
  `,
  topRight: ({ arrowSize, arrowPlacement, arrowOffset }) => css`
    top: calc(100% - ${arrowSize / 2}px);
    ${getArrowPlacement({
      type: ARROW_PLACEMENT_TYPES.horizontal,
      arrowPlacement,
      arrowOffset,
      defaultPlacement: ARROW_PLACEMENTS.right,
      angle: -45,
    })};
  `,
  topLeft: ({ arrowSize, arrowPlacement, arrowOffset }) => css`
    top: calc(100% - ${arrowSize / 2}px);
    ${getArrowPlacement({
      type: ARROW_PLACEMENT_TYPES.horizontal,
      arrowPlacement,
      arrowOffset,
      defaultPlacement: ARROW_PLACEMENTS.left,
      angle: -45,
    })};
  `,
  bottom: ({ arrowSize, arrowPlacement, arrowOffset }) => css`
    bottom: calc(100% - ${arrowSize / 2}px);
    ${getArrowPlacement({
      type: ARROW_PLACEMENT_TYPES.horizontal,
      arrowPlacement,
      arrowOffset,
      defaultPlacement: ARROW_PLACEMENTS.center,
      angle: 135,
    })};
  `,
  bottomRight: ({ arrowSize, arrowPlacement, arrowOffset }) => css`
    bottom: calc(100% - ${arrowSize / 2}px);
    ${getArrowPlacement({
      type: ARROW_PLACEMENT_TYPES.horizontal,
      arrowPlacement,
      arrowOffset,
      defaultPlacement: ARROW_PLACEMENTS.right,
      angle: 135,
    })};
  `,
  bottomLeft: ({ arrowSize, arrowPlacement, arrowOffset }) => css`
    bottom: calc(100% - ${arrowSize / 2}px);
    ${getArrowPlacement({
      type: ARROW_PLACEMENT_TYPES.horizontal,
      arrowPlacement,
      arrowOffset,
      defaultPlacement: ARROW_PLACEMENTS.left,
      angle: 135,
    })};
  `,
  left: ({ arrowSize, arrowPlacement, arrowOffset }) => css`
    left: calc(100% - ${arrowSize / 2}px);
    ${getArrowPlacement({
      type: ARROW_PLACEMENT_TYPES.vertical,
      arrowPlacement,
      arrowOffset,
      defaultPlacement: ARROW_PLACEMENTS.center,
      angle: -135,
    })};
  `,
  leftTop: ({ arrowSize, arrowPlacement, arrowOffset }) => css`
    left: calc(100% - ${arrowSize / 2}px);
    ${getArrowPlacement({
      type: ARROW_PLACEMENT_TYPES.vertical,
      arrowPlacement,
      arrowOffset,
      defaultPlacement: ARROW_PLACEMENTS.top,
      angle: -135,
    })};
  `,
  leftBottom: ({ arrowSize, arrowPlacement, arrowOffset }) => css`
    left: calc(100% - ${arrowSize / 2}px);
    ${getArrowPlacement({
      type: ARROW_PLACEMENT_TYPES.vertical,
      arrowPlacement,
      arrowOffset,
      defaultPlacement: ARROW_PLACEMENTS.bottom,
      angle: -135,
    })};
  `,
  right: ({ arrowSize, arrowPlacement, arrowOffset }) => css`
    right: calc(100% - ${arrowSize / 2}px);
    ${getArrowPlacement({
      type: ARROW_PLACEMENT_TYPES.vertical,
      arrowPlacement,
      arrowOffset,
      defaultPlacement: ARROW_PLACEMENTS.center,
      angle: 45,
    })};
  `,
  rightTop: ({ arrowSize, arrowPlacement, arrowOffset }) => css`
    right: calc(100% - ${arrowSize / 2}px);
    ${getArrowPlacement({
      type: ARROW_PLACEMENT_TYPES.vertical,
      arrowPlacement,
      arrowOffset,
      defaultPlacement: ARROW_PLACEMENTS.top,
      angle: 45,
    })};
  `,
  rightBottom: ({ arrowSize, arrowPlacement, arrowOffset }) => css`
    right: calc(100% - ${arrowSize / 2}px);
    ${getArrowPlacement({
      type: ARROW_PLACEMENT_TYPES.vertical,
      arrowPlacement,
      arrowOffset,
      defaultPlacement: ARROW_PLACEMENTS.bottom,
      angle: 45,
    })};
  `,
};

export default ({ placement, arrowSize, arrowPlacement, arrowOffset }) => {
  return useMemo(
    () =>
      arrowStyleGetters[placement]({ arrowSize, arrowPlacement, arrowOffset }),
    [placement, arrowSize, arrowPlacement, arrowOffset]
  );
};
