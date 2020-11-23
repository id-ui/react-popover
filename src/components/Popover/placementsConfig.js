import { css } from 'styled-components';
import {
  ARROW_OFFSET,
  SIDE_OVERFLOW,
  ARROW_SIZE,
  MIN_SPARE_SPACE,
} from './constants';
import { Inner } from './styled';

export const getDefaultOffset = (withArrow) => (withArrow ? ARROW_SIZE : 0) + 5;

export default {
  top: (
    { width, top, left },
    { offset, withArrow, animation, animationTranslateDistance }
  ) => ({
    style: css`
      top: ${top + offset[1] - getDefaultOffset(withArrow)}px;
      left: ${left + width / 2 + offset[0]}px;
      ${Inner} {
        max-height: ${top +
        offset[1] -
        getDefaultOffset(withArrow) -
        MIN_SPARE_SPACE}px;
        max-width: 99%;
      }
      &:before {
        top: calc(100% - 0.4rem);
        left: 50%;
        transform: translateX(-50%) rotate(-45deg);
      }
    `,
    initial: {
      ...animation.initial,
      y: `-${100 - animationTranslateDistance}%`,
      x: '-50%',
    },
    animate: {
      ...animation.animate,
      y: '-100%',
      x: '-50%',
    },
    exit: {
      ...animation.exit,
      x: '-50%',
    },
  }),
  topLeft: (
    { top, left },
    { offset, withArrow, animation, animationTranslateDistance }
  ) => ({
    style: css`
      top: ${top + offset[1] - getDefaultOffset(withArrow)}px;
      left: ${left + SIDE_OVERFLOW + offset[0]}px;
      ${Inner} {
        max-height: ${top +
        offset[1] -
        getDefaultOffset(withArrow) -
        MIN_SPARE_SPACE}px;
        max-width: ${left + SIDE_OVERFLOW + offset[0] - MIN_SPARE_SPACE}px;
      }
      &:before {
        top: calc(100% - 0.4rem);
        right: ${ARROW_OFFSET}px;
        transform: rotate(-45deg);
      }
    `,
    initial: {
      ...animation.initial,
      y: '-100%',
      x: `-${100 - animationTranslateDistance}%`,
    },
    animate: {
      ...animation.animate,
      y: '-100%',
      x: '-100%',
    },
    exit: {
      ...animation.exit,
      x: '-100%',
    },
  }),
  topRight: (
    { top, right },
    { offset, withArrow, animation, animationTranslateDistance }
  ) => ({
    style: css`
      top: ${top + offset[1] - getDefaultOffset(withArrow)}px;
      left: ${right - SIDE_OVERFLOW + offset[0]}px;
      ${Inner} {
        max-height: ${top +
        offset[1] -
        getDefaultOffset(withArrow) -
        MIN_SPARE_SPACE}px;
        max-width: ${window.innerWidth -
        (MIN_SPARE_SPACE + right - SIDE_OVERFLOW + offset[0])}px;
      }
      &:before {
        top: calc(100% - 0.4rem);
        left: ${ARROW_OFFSET}px;
        transform: rotate(-45deg);
      }
    `,
    initial: {
      ...animation.initial,
      y: '-100%',
      x: `-${animationTranslateDistance}%`,
    },
    animate: {
      ...animation.animate,
      y: '-100%',
      x: 0,
    },
    exit: {
      ...animation.exit,
      x: 0,
    },
  }),
  bottom: (
    { bottom, left, width },
    { offset, withArrow, animation, animationTranslateDistance }
  ) => ({
    style: css`
      top: ${bottom + offset[1] + getDefaultOffset(withArrow)}px;
      left: ${left + width / 2 + offset[0]}px;
      ${Inner} {
        max-height: ${window.innerHeight -
        (MIN_SPARE_SPACE + bottom + offset[1] + getDefaultOffset(withArrow))}px;
        max-width: 99%;
      }
      &:before {
        bottom: calc(100% - 0.4rem);
        left: 50%;
        transform: translateX(-50%) rotate(135deg);
      }
    `,
    initial: {
      ...animation.initial,
      y: `-${animationTranslateDistance}%`,
      x: '-50%',
    },
    animate: {
      ...animation.animate,
      y: 0,
      x: '-50%',
    },
    exit: {
      ...animation.exit,
      x: '-50%',
    },
  }),
  bottomLeft: (
    { bottom, left },
    { offset, withArrow, animation, animationTranslateDistance }
  ) => ({
    style: css`
      top: ${bottom + offset[1] + getDefaultOffset(withArrow)}px;
      left: ${left + SIDE_OVERFLOW + offset[0]}px;
      ${Inner} {
        max-height: ${window.innerHeight -
        (MIN_SPARE_SPACE + bottom + offset[1] + getDefaultOffset(withArrow))}px;
        max-width: ${left + SIDE_OVERFLOW + offset[0] - MIN_SPARE_SPACE}px;
      }
      &:before {
        bottom: calc(100% - 0.4rem);
        right: ${ARROW_OFFSET}px;
        transform: rotate(135deg);
      }
    `,
    initial: {
      ...animation.initial,
      y: 0,
      x: `-${100 - animationTranslateDistance}%`,
    },
    animate: {
      ...animation.animate,
      y: 0,
      x: '-100%',
    },
    exit: {
      ...animation.exit,
      x: '-100%',
    },
  }),
  bottomRight: (
    { bottom, right },
    { offset, withArrow, animation, animationTranslateDistance }
  ) => ({
    style: css`
      top: ${bottom + offset[1] + getDefaultOffset(withArrow)}px;
      left: ${right - SIDE_OVERFLOW + offset[0]}px;
      ${Inner} {
        max-height: ${window.innerHeight -
        (MIN_SPARE_SPACE + bottom + offset[1] + getDefaultOffset(withArrow))}px;
        max-width: ${window.innerWidth -
        (MIN_SPARE_SPACE + right - SIDE_OVERFLOW + offset[0])}px;
      }
      &:before {
        bottom: calc(100% - 0.4rem);
        left: ${ARROW_OFFSET}px;
        transform: rotate(135deg);
      }
    `,
    initial: {
      ...animation.initial,
      y: 0,
      x: `-${animationTranslateDistance}%`,
    },
    animate: {
      ...animation.animate,
      y: 0,
      x: 0,
    },
    exit: {
      ...animation.exit,
      x: 0,
    },
  }),
  left: (
    { height, top, left },
    { offset, withArrow, animation, animationTranslateDistance }
  ) => ({
    style: css`
      left: ${left + offset[0] - getDefaultOffset(withArrow)}px;
      top: ${top + height / 2 + offset[1]}px;
      ${Inner} {
        max-height: 99%;
        max-width: ${left +
        offset[0] -
        getDefaultOffset(withArrow) -
        MIN_SPARE_SPACE}px;
      }
      &:before {
        top: 50%;
        left: calc(100% - 0.4rem);
        transform: translateY(-50%) rotate(-135deg);
      }
    `,
    initial: {
      ...animation.initial,
      y: '-50%',
      x: `-${100 - animationTranslateDistance}%`,
    },
    animate: {
      ...animation.animate,
      y: '-50%',
      x: '-100%',
    },
    exit: {
      ...animation.exit,
      y: '-50%',
    },
  }),
  leftTop: (
    { top, left },
    { offset, withArrow, animation, animationTranslateDistance }
  ) => ({
    style: css`
      left: ${left + offset[0] - getDefaultOffset(withArrow)}px;
      top: ${top + offset[1] + SIDE_OVERFLOW}px;
      ${Inner} {
        max-height: ${top + offset[1] + SIDE_OVERFLOW - MIN_SPARE_SPACE}px;
        max-width: ${left +
        offset[0] -
        getDefaultOffset(withArrow) -
        MIN_SPARE_SPACE}px;
      }
      &:before {
        bottom: ${ARROW_OFFSET}px;
        left: calc(100% - 0.4rem);
        transform: rotate(-135deg);
      }
    `,
    initial: {
      ...animation.initial,
      y: '-100%',
      x: `-${100 - animationTranslateDistance}%`,
    },
    animate: {
      ...animation.animate,
      y: '-100%',
      x: '-100%',
    },
    exit: {
      ...animation.exit,
      y: '-100%',
    },
  }),
  leftBottom: (
    { bottom, left },
    { offset, withArrow, animation, animationTranslateDistance }
  ) => ({
    style: css`
      left: ${left + offset[0] - getDefaultOffset(withArrow)}px;
      top: ${bottom + offset[1] - SIDE_OVERFLOW}px;
      ${Inner} {
        max-height: ${window.innerHeight -
        (MIN_SPARE_SPACE + bottom + offset[1] - SIDE_OVERFLOW)}px;
        max-width: ${left +
        offset[0] -
        getDefaultOffset(withArrow) -
        MIN_SPARE_SPACE}px;
      }
      &:before {
        top: ${ARROW_OFFSET}px;
        left: calc(100% - 0.4rem);
        transform: rotate(-135deg);
      }
    `,
    initial: {
      ...animation.initial,
      y: 0,
      x: `-${100 - animationTranslateDistance}%`,
    },
    animate: {
      ...animation.animate,
      y: 0,
      x: '-100%',
    },
    exit: {
      ...animation.exit,
      y: 0,
    },
  }),
  right: (
    { height, top, right },
    { offset, withArrow, animation, animationTranslateDistance }
  ) => ({
    style: css`
      left: ${right + offset[0] + getDefaultOffset(withArrow)}px;
      top: ${top + height / 2 + offset[1]}px;
      ${Inner} {
        max-height: 99%;
        max-width: ${window.innerWidth -
        (MIN_SPARE_SPACE + right + offset[0] + getDefaultOffset(withArrow))}px;
      }
      &:before {
        top: 50%;
        right: calc(100% - 0.4rem);
        transform: translateY(-50%) rotate(45deg);
      }
    `,
    initial: {
      ...animation.initial,
      y: '-50%',
      x: `-${animationTranslateDistance}%`,
    },
    animate: {
      ...animation.animate,
      y: '-50%',
      x: 0,
    },
    exit: {
      ...animation.exit,
      y: '-50%',
    },
  }),
  rightTop: (
    { top, right },
    { offset, withArrow, animation, animationTranslateDistance }
  ) => ({
    style: css`
      left: ${right + offset[0] + getDefaultOffset(withArrow)}px;
      top: ${top + offset[1] + SIDE_OVERFLOW}px;
      ${Inner} {
        max-height: ${top + offset[1] + SIDE_OVERFLOW - MIN_SPARE_SPACE}px;
        max-width: ${window.innerWidth -
        (MIN_SPARE_SPACE + right + offset[0] + getDefaultOffset(withArrow))}px;
      }
      &:before {
        bottom: ${ARROW_OFFSET}px;
        right: calc(100% - 0.4rem);
        transform: rotate(45deg);
      }
    `,
    initial: {
      ...animation.initial,
      y: '-100%',
      x: `-${animationTranslateDistance}%`,
    },
    animate: {
      ...animation.animate,
      y: '-100%',
      x: 0,
    },
    exit: {
      ...animation.exit,
      y: '-100%',
    },
  }),
  rightBottom: (
    { bottom, right },
    { offset, withArrow, animation, animationTranslateDistance }
  ) => ({
    style: css`
      left: ${right + offset[0] + getDefaultOffset(withArrow)}px;
      top: ${bottom + offset[1] - SIDE_OVERFLOW}px;
      ${Inner} {
        max-height: ${window.innerHeight -
        (MIN_SPARE_SPACE + bottom + offset[1] - SIDE_OVERFLOW)}px;
        max-width: ${window.innerWidth -
        (MIN_SPARE_SPACE + right + offset[0] + getDefaultOffset(withArrow))}px;
      }
      &:before {
        top: ${ARROW_OFFSET}px;
        right: calc(100% - 0.4rem);
        transform: rotate(45deg);
      }
    `,
    initial: {
      ...animation.initial,
      y: 0,
      x: `-${animationTranslateDistance}%`,
    },
    animate: {
      ...animation.animate,
      y: 0,
      x: 0,
    },
    exit: {
      ...animation.exit,
      y: 0,
    },
  }),
};
