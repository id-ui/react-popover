import { css } from 'styled-components';
import { ARROW_OFFSET, SIDE_OVERFLOW, ARROW_SIZE } from './constants';

const initialMotionProps = {
  opacity: 0,
  scale: 0.5,
};

const animateMotionProps = {
  opacity: 1,
  scale: 1,
};

const exitMotionProps = {
  opacity: 0,
  scale: 0.5,
  transition: { duration: 0.2 },
};

export const getDefaultOffset = (withArrow) => (withArrow ? ARROW_SIZE : 0) + 5;

export default {
  top: ({ width, top, left }, { offset, withArrow }) => ({
    style: css`
      top: ${top + offset[1] - getDefaultOffset(withArrow)}px;
      left: ${left + width / 2 + offset[0]}px;
      &:before {
        top: calc(100% - 0.4rem);
        left: 50%;
        transform: translateX(-50%) rotate(-45deg);
      }
    `,
    initial: {
      ...initialMotionProps,
      y: '0',
      x: '-50%',
    },
    animate: {
      ...animateMotionProps,
      y: '-100%',
      x: '-50%',
    },
    exit: {
      ...exitMotionProps,
      x: '-50%',
    },
  }),
  topLeft: ({ top, left }, { offset, withArrow }) => ({
    style: css`
      top: ${top + offset[1] - getDefaultOffset(withArrow)}px;
      left: ${left + SIDE_OVERFLOW + offset[0]}px;
      &:before {
        top: calc(100% - 0.4rem);
        right: ${ARROW_OFFSET}px;
        transform: rotate(-45deg);
      }
    `,
    initial: {
      ...initialMotionProps,
      y: '-100%',
      x: 0,
    },
    animate: {
      ...animateMotionProps,
      y: '-100%',
      x: '-100%',
    },
    exit: {
      ...exitMotionProps,
      x: '-100%',
    },
  }),
  topRight: ({ top, right }, { offset, withArrow }) => ({
    style: css`
      top: ${top + offset[1] - getDefaultOffset(withArrow)}px;
      left: ${right - SIDE_OVERFLOW + offset[0]}px;
      &:before {
        top: calc(100% - 0.4rem);
        left: ${ARROW_OFFSET}px;
        transform: rotate(-45deg);
      }
    `,
    initial: {
      ...initialMotionProps,
      y: '-100%',
      x: '-100%',
    },
    animate: {
      ...animateMotionProps,
      y: '-100%',
      x: 0,
    },
    exit: {
      ...exitMotionProps,
      x: 0,
    },
  }),
  bottom: ({ bottom, left, width }, { offset, withArrow }) => ({
    style: css`
      top: ${bottom + offset[1] + getDefaultOffset(withArrow)}px;
      left: ${left + width / 2 + offset[0]}px;
      &:before {
        bottom: calc(100% - 0.4rem);
        left: 50%;
        transform: translateX(-50%) rotate(135deg);
      }
    `,
    initial: {
      ...initialMotionProps,
      y: '-100%',
      x: '-50%',
    },
    animate: {
      ...animateMotionProps,
      y: 0,
      x: '-50%',
    },
    exit: {
      ...exitMotionProps,
      x: '-50%',
    },
  }),
  bottomLeft: ({ bottom, left }, { offset, withArrow }) => ({
    style: css`
      top: ${bottom + offset[1] + getDefaultOffset(withArrow)}px;
      left: ${left + SIDE_OVERFLOW + offset[0]}px;
      &:before {
        bottom: calc(100% - 0.4rem);
        right: ${ARROW_OFFSET}px;
        transform: rotate(135deg);
      }
    `,
    initial: {
      ...initialMotionProps,
      y: '-100%',
      x: '-100%',
    },
    animate: {
      ...animateMotionProps,
      y: 0,
      x: '-100%',
    },
    exit: {
      ...exitMotionProps,
      x: '-100%',
    },
  }),
  bottomRight: ({ bottom, right }, { offset, withArrow }) => ({
    style: css`
      top: ${bottom + offset[1] + getDefaultOffset(withArrow)}px;
      left: ${right - SIDE_OVERFLOW + offset[0]}px;
      &:before {
        bottom: calc(100% - 0.4rem);
        left: ${ARROW_OFFSET}px;
        transform: rotate(135deg);
      }
    `,
    initial: {
      ...initialMotionProps,
      y: 0,
      x: '100%',
    },
    animate: {
      ...animateMotionProps,
      y: 0,
      x: 0,
    },
    exit: {
      ...exitMotionProps,
      x: 0,
    },
  }),
  left: ({ height, top, left }, { offset, withArrow }) => ({
    style: css`
      left: ${left + offset[0] - getDefaultOffset(withArrow)}px;
      top: ${top + height / 2 + offset[1]}px;
      &:before {
        top: 50%;
        left: calc(100% - 0.4rem);
        transform: translateY(-50%) rotate(-135deg);
      }
    `,
    initial: {
      ...initialMotionProps,
      y: '-50%',
      x: 0,
    },
    animate: {
      ...animateMotionProps,
      y: '-50%',
      x: '-100%',
    },
    exit: {
      ...exitMotionProps,
      y: '-50%',
    },
  }),
  leftTop: ({ top, left }, { offset, withArrow }) => ({
    style: css`
      left: ${left + offset[0] - getDefaultOffset(withArrow)}px;
      top: ${top + offset[1] + SIDE_OVERFLOW}px;
      &:before {
        bottom: ${ARROW_OFFSET}px;
        left: calc(100% - 0.4rem);
        transform: rotate(-135deg);
      }
    `,
    initial: {
      ...initialMotionProps,
      y: 0,
      x: 0,
    },
    animate: {
      ...animateMotionProps,
      y: '-100%',
      x: '-100%',
    },
    exit: {
      ...exitMotionProps,
      y: '-100%',
    },
  }),
  leftBottom: ({ bottom, left }, { offset, withArrow }) => ({
    style: css`
      left: ${left + offset[0] - getDefaultOffset(withArrow)}px;
      top: ${bottom + offset[1] - SIDE_OVERFLOW}px;
      &:before {
        top: ${ARROW_OFFSET}px;
        left: calc(100% - 0.4rem);
        transform: rotate(-135deg);
      }
    `,
    initial: {
      ...initialMotionProps,
      y: '0',
      x: 0,
    },
    animate: {
      ...animateMotionProps,
      y: '0',
      x: '-100%',
    },
    exit: {
      ...exitMotionProps,
      y: '0',
    },
  }),
  right: ({ height, top, right }, { offset, withArrow }) => ({
    style: css`
      left: ${right + offset[0] + getDefaultOffset(withArrow)}px;
      top: ${top + height / 2 + offset[1]}px;
      &:before {
        top: 50%;
        right: calc(100% - 0.4rem);
        transform: translateY(-50%) rotate(45deg);
      }
    `,
    initial: {
      ...initialMotionProps,
      y: '-50%',
      x: '-100%',
    },
    animate: {
      ...animateMotionProps,
      y: '-50%',
      x: 0,
    },
    exit: {
      ...exitMotionProps,
      y: '-50%',
    },
  }),
  rightTop: ({ top, right }, { offset, withArrow }) => ({
    style: css`
      left: ${right + offset[0] + getDefaultOffset(withArrow)}px;
      top: ${top + offset[1] + SIDE_OVERFLOW}px;
      &:before {
        bottom: ${ARROW_OFFSET}px;
        right: calc(100% - 0.4rem);
        transform: rotate(45deg);
      }
    `,
    initial: {
      ...initialMotionProps,
      y: 0,
      x: '-100%',
    },
    animate: {
      ...animateMotionProps,
      y: '-100%',
      x: '0',
    },
    exit: {
      ...exitMotionProps,
      y: '-100%',
    },
  }),
  rightBottom: ({ bottom, right }, { offset, withArrow }) => ({
    style: css`
      left: ${right + offset[0] + getDefaultOffset(withArrow)}px;
      top: ${bottom + offset[1] - SIDE_OVERFLOW}px;
      &:before {
        top: ${ARROW_OFFSET}px;
        right: calc(100% - 0.4rem);
        transform: rotate(45deg);
      }
    `,
    initial: {
      ...initialMotionProps,
      y: '0',
      x: '-100%',
    },
    animate: {
      ...animateMotionProps,
      y: '0',
      x: '0',
    },
    exit: {
      ...exitMotionProps,
      y: '0',
    },
  }),
};
