import { css } from 'styled-components';
import { ARROW_OFFSET, ARROW_SIZE, MIN_SPARE_SPACE } from './constants';
import { Inner } from './styled';

export const getDefaultOffset = (withArrow) => (withArrow ? ARROW_SIZE : 0) + 5;

export default {
  top: (
    { width, top, left },
    {
      offset,
      withArrow,
      animation,
      animationTranslateDistance,
      spaceBetweenPopoverAndTarget,
    }
  ) => ({
    style: css`
      top: ${top +
      offset[1] -
      getDefaultOffset(withArrow) -
      spaceBetweenPopoverAndTarget}px;
      left: ${left + width / 2 + offset[0]}px;
      ${Inner} {
        max-height: ${top +
        offset[1] -
        getDefaultOffset(withArrow) -
        spaceBetweenPopoverAndTarget -
        MIN_SPARE_SPACE}px;
        max-width: 99vw;
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
  topRight: (
    { top, right },
    {
      offset,
      withArrow,
      animation,
      animationTranslateDistance,
      spaceBetweenPopoverAndTarget,
    }
  ) => ({
    style: css`
      top: ${top +
      offset[1] -
      getDefaultOffset(withArrow) -
      spaceBetweenPopoverAndTarget}px;
      left: ${right + offset[0]}px;
      ${Inner} {
        max-height: ${top +
        offset[1] -
        getDefaultOffset(withArrow) -
        spaceBetweenPopoverAndTarget -
        MIN_SPARE_SPACE}px;
        max-width: ${right + offset[0] - MIN_SPARE_SPACE}px;
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
  topLeft: (
    { top, left },
    {
      offset,
      withArrow,
      animation,
      animationTranslateDistance,
      spaceBetweenPopoverAndTarget,
    }
  ) => ({
    style: css`
      top: ${top +
      offset[1] -
      getDefaultOffset(withArrow) -
      spaceBetweenPopoverAndTarget}px;
      left: ${left + offset[0]}px;
      ${Inner} {
        max-height: ${top +
        offset[1] -
        getDefaultOffset(withArrow) -
        spaceBetweenPopoverAndTarget -
        MIN_SPARE_SPACE}px;
        max-width: ${window.innerWidth -
        (MIN_SPARE_SPACE + left + offset[0])}px;
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
    {
      offset,
      withArrow,
      animation,
      animationTranslateDistance,
      spaceBetweenPopoverAndTarget,
    }
  ) => ({
    style: css`
      top: ${bottom +
      offset[1] +
      getDefaultOffset(withArrow) +
      spaceBetweenPopoverAndTarget}px;
      left: ${left + width / 2 + offset[0]}px;
      ${Inner} {
        max-height: ${window.innerHeight -
        (MIN_SPARE_SPACE +
          bottom +
          offset[1] +
          getDefaultOffset(withArrow) +
          spaceBetweenPopoverAndTarget)}px;
        max-width: 99vw;
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
  bottomRight: (
    { bottom, right },
    {
      offset,
      withArrow,
      animation,
      animationTranslateDistance,
      spaceBetweenPopoverAndTarget,
    }
  ) => ({
    style: css`
      top: ${bottom +
      offset[1] +
      getDefaultOffset(withArrow) +
      spaceBetweenPopoverAndTarget}px;
      left: ${right + offset[0]}px;
      ${Inner} {
        max-height: ${window.innerHeight -
        (MIN_SPARE_SPACE +
          bottom +
          offset[1] +
          getDefaultOffset(withArrow) +
          spaceBetweenPopoverAndTarget)}px;
        max-width: ${right + offset[0] - MIN_SPARE_SPACE}px;
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
  bottomLeft: (
    { bottom, left },
    {
      offset,
      withArrow,
      animation,
      animationTranslateDistance,
      spaceBetweenPopoverAndTarget,
    }
  ) => ({
    style: css`
      top: ${bottom +
      offset[1] +
      getDefaultOffset(withArrow) +
      spaceBetweenPopoverAndTarget}px;
      left: ${left + offset[0]}px;
      ${Inner} {
        max-height: ${window.innerHeight -
        (MIN_SPARE_SPACE +
          bottom +
          offset[1] +
          getDefaultOffset(withArrow) +
          spaceBetweenPopoverAndTarget)}px;
        max-width: ${window.innerWidth -
        (MIN_SPARE_SPACE + left + offset[0])}px;
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
    {
      offset,
      withArrow,
      animation,
      animationTranslateDistance,
      spaceBetweenPopoverAndTarget,
    }
  ) => ({
    style: css`
      left: ${left +
      offset[0] -
      getDefaultOffset(withArrow) -
      spaceBetweenPopoverAndTarget}px;
      top: ${top + height / 2 + offset[1]}px;
      ${Inner} {
        max-height: 99vh;
        max-width: ${left +
        offset[0] -
        getDefaultOffset(withArrow) -
        spaceBetweenPopoverAndTarget -
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
  leftBottom: (
    { bottom, left },
    {
      offset,
      withArrow,
      animation,
      animationTranslateDistance,
      spaceBetweenPopoverAndTarget,
    }
  ) => ({
    style: css`
      left: ${left +
      offset[0] -
      getDefaultOffset(withArrow) -
      spaceBetweenPopoverAndTarget}px;
      top: ${bottom + offset[1]}px;
      ${Inner} {
        max-height: ${bottom + offset[1] - MIN_SPARE_SPACE}px;
        max-width: ${left +
        offset[0] -
        getDefaultOffset(withArrow) -
        spaceBetweenPopoverAndTarget -
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
  leftTop: (
    { top, left },
    {
      offset,
      withArrow,
      animation,
      animationTranslateDistance,
      spaceBetweenPopoverAndTarget,
    }
  ) => ({
    style: css`
      left: ${left +
      offset[0] -
      getDefaultOffset(withArrow) -
      spaceBetweenPopoverAndTarget}px;
      top: ${top + offset[1]}px;
      ${Inner} {
        max-height: ${window.innerHeight -
        (MIN_SPARE_SPACE + top + offset[1])}px;
        max-width: ${left +
        offset[0] -
        getDefaultOffset(withArrow) -
        spaceBetweenPopoverAndTarget -
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
    {
      offset,
      withArrow,
      animation,
      animationTranslateDistance,
      spaceBetweenPopoverAndTarget,
    }
  ) => ({
    style: css`
      left: ${right +
      offset[0] +
      getDefaultOffset(withArrow) +
      spaceBetweenPopoverAndTarget}px;
      top: ${top + height / 2 + offset[1]}px;
      ${Inner} {
        max-height: 99vh;
        max-width: ${window.innerWidth -
        (MIN_SPARE_SPACE +
          right +
          offset[0] +
          getDefaultOffset(withArrow) +
          spaceBetweenPopoverAndTarget)}px;
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
  rightBottom: (
    { bottom, right },
    {
      offset,
      withArrow,
      animation,
      animationTranslateDistance,
      spaceBetweenPopoverAndTarget,
    }
  ) => ({
    style: css`
      left: ${right +
      offset[0] +
      getDefaultOffset(withArrow) +
      spaceBetweenPopoverAndTarget}px;
      top: ${bottom + offset[1]}px;
      ${Inner} {
        max-height: ${bottom + offset[1] - MIN_SPARE_SPACE}px;
        max-width: ${window.innerWidth -
        (MIN_SPARE_SPACE +
          right +
          offset[0] +
          getDefaultOffset(withArrow) +
          spaceBetweenPopoverAndTarget)}px;
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
  rightTop: (
    { top, right },
    {
      offset,
      withArrow,
      animation,
      animationTranslateDistance,
      spaceBetweenPopoverAndTarget,
    }
  ) => ({
    style: css`
      left: ${right +
      offset[0] +
      getDefaultOffset(withArrow) +
      spaceBetweenPopoverAndTarget}px;
      top: ${top + offset[1]}px;
      ${Inner} {
        max-height: ${window.innerHeight -
        (MIN_SPARE_SPACE + top + offset[1])}px;
        max-width: ${window.innerWidth -
        (MIN_SPARE_SPACE +
          right +
          offset[0] +
          getDefaultOffset(withArrow) +
          spaceBetweenPopoverAndTarget)}px;
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
