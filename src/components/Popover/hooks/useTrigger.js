import { useCallback, useState } from 'react';
import _ from 'lodash';
import useElementMotion from './useElementMotion';
import useTriggerHandlers from './useTriggerHandlers';
import useScroll from './useScroll';

export default ({
  ref,
  triggerElementRef,
  isOpen,
  toggle,
  mouseEnterDelay,
  mouseLeaveDelay,
  onFocus,
  trigger,
  closeOnScroll,
  updatePosition,
  considerTriggerMotion,
  triggerContainerDisplay,
  addTarget,
  usePortal,
  open,
  close,
}) => {
  const [triggerDimensions, setTriggerDimensions] = useState({});

  const triggerHandlers = useTriggerHandlers({
    isOpen,
    open,
    close,
    toggle,
    mouseEnterDelay,
    mouseLeaveDelay,
    onFocus,
    trigger,
  });

  const scrollListener = useCallback(() => {
    if (isOpen && closeOnScroll) {
      close();
    }
  }, [isOpen, close, closeOnScroll]);

  const setScrollContainer = useScroll({
    listener: scrollListener,
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
        if (_.isFunction(ref)) {
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
