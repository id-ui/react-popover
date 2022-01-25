import { useCallback, useState } from 'react';
import { isFunction } from 'lodash';
import { useElementMotion } from '../useElementMotion';
import { useTriggerHandlers } from '../useTriggerHandlers';
import { useScrollHandler } from '../useScrollHandler';
import { UseTriggerProps } from './types';

export const useTrigger = ({
  ref,
  triggerElementRef,
  isOpen,
  toggle,
  mouseEnterDelay,
  mouseLeaveDelay,
  trigger,
  closeOnScroll,
  scrollHandlerMinDistance,
  updatePosition,
  considerTriggerMotion,
  triggerContainerDisplay,
  addTarget,
  usePortal,
  open,
  close,
}: UseTriggerProps) => {
  const [triggerDimensions, setTriggerDimensions] = useState({
    width: 0,
    height: 0,
  });

  const triggerHandlers = useTriggerHandlers({
    isOpen,
    open,
    close,
    toggle,
    mouseEnterDelay,
    mouseLeaveDelay,
    trigger,
  });

  const setScrollContainer = useScrollHandler({
    scrollHandlerMinDistance,
    closeOnScroll,
    close,
    isOpen,
    updatePosition,
  });

  const setupElementMotionObserver = useElementMotion(updatePosition);

  const setTriggerRef = useCallback(
    (node) => {
      if (node && node.children.length) {
        const child = node.children[0];

        if (usePortal && considerTriggerMotion) {
          setupElementMotionObserver(child);
        }

        triggerElementRef.current = child;

        if (triggerContainerDisplay) {
          node.style.display = triggerContainerDisplay;
        } else {
          const style = window.getComputedStyle(child);
          node.style.display = style.display;
        }
      } else {
        triggerElementRef.current = node;
      }

      if (triggerElementRef.current) {
        setTriggerDimensions({
          width: triggerElementRef.current.offsetWidth,
          height: triggerElementRef.current.offsetHeight,
        });
      }

      setScrollContainer(triggerElementRef.current);

      if (ref) {
        if (isFunction(ref)) {
          ref(node);
        } else {
          ref.current = node;
        }
      }

      addTarget('trigger', node);
    },
    [
      triggerElementRef,
      setScrollContainer,
      ref,
      addTarget,
      usePortal,
      considerTriggerMotion,
      triggerContainerDisplay,
      setupElementMotionObserver,
    ]
  );

  return {
    triggerDimensions,
    triggerHandlers,
    setTriggerRef,
  };
};
