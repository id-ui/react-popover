import { noop } from './helpers';
import { PopoverPlacement, PopoverTriggerType } from './enums';
import { PopoverProps } from './types';

export const defaultProps: Partial<PopoverProps> = {
  placement: PopoverPlacement.top,
  trigger: PopoverTriggerType.hover,
  withArrow: true,
  offset: [0, 0],
  onChangeOpen: noop,
  considerTriggerMotion: false,
  closeOnEscape: true,
  closeOnEnter: false,
  closeOnTab: false,
  closeOnScroll: true,
  scrollHandlerMinDistance: 0,
  getContainer: () => document.body,
  guessBetterPosition: false,
  mouseEnterDelay: 100,
  mouseLeaveDelay: 100,
  onFocus: noop,
  triggerContainerTag: 'span',
  animation: {
    initial: {
      opacity: 0,
      scale: 0.9,
    },

    animate: {
      opacity: 1,
      scale: 1,
    },

    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.1 },
    },
  },
  openingAnimationTranslateDistance: 30,
  closingAnimationTranslateDistance: 0,
  minSpaceBetweenPopoverAndContainer: 10,
  spaceBetweenPopoverAndTarget: 7,
  arrowSize: 8,
  arrowOffset: 10,
  useTriggerWidth: false,
  useTriggerHeight: false,
  width: 'unset',
  height: 'unset',
  usePortal: true,
  avoidOverflowBounds: true,
  considerContentResizing: false,
};
