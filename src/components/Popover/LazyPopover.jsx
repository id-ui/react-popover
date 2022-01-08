import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { isFunction, debounce, upperFirst } from 'lodash';
import { POPOVER_TRIGGER_TYPES } from './constants';
import Popover from './Popover';

function LazyPopover(props, ref) {
  const {
    isOpen,
    onChangeOpen,
    triggerContainerTag,
    children,
    trigger,
    triggerContainerDisplay,
    mouseEnterDelay,
  } = props;

  const [isInitialized, setInitialized] = useState(
    () =>
      isOpen || isFunction(children) || trigger === POPOVER_TRIGGER_TYPES.focus
  );

  const initialize = useCallback(() => {
    onChangeOpen(true);
  }, [onChangeOpen]);

  useEffect(() => {
    if (isOpen) {
      setInitialized(true);
    }
  }, [isOpen]);

  if (isInitialized) {
    return (
      <Popover {...props} ref={ref} isOpen={isOpen} onChangeOpen={onChangeOpen}>
        {children}
      </Popover>
    );
  }

  return (
    <TriggerWithRef
      triggerContainerTag={triggerContainerTag}
      trigger={trigger}
      triggerContainerDisplay={triggerContainerDisplay}
      initialize={initialize}
      mouseEnterDelay={mouseEnterDelay}
      ref={ref}
    >
      {children}
    </TriggerWithRef>
  );
}

function Trigger(
  {
    triggerContainerTag,
    children,
    trigger,
    triggerContainerDisplay,
    initialize,
    mouseEnterDelay,
  },
  ref
) {
  const triggerRef = useCallback(
    (node) => {
      if (node && node.children.length) {
        const child = node.children[0];
        if (triggerContainerDisplay) {
          node.style.display = triggerContainerDisplay;
        } else {
          const style = window.getComputedStyle(child);
          node.style.display = style.display;
        }
      }

      if (ref) {
        if (isFunction(ref)) {
          ref(node);
        } else {
          ref.current = node;
        }
      }
    },
    [triggerContainerDisplay, ref]
  );

  const TriggerContainer = triggerContainerTag;

  const initializeDebounced = useMemo(
    () => debounce(initialize, mouseEnterDelay),
    [initialize, mouseEnterDelay]
  );

  useEffect(() => {
    return () => {
      initializeDebounced.cancel();
    };
  }, [initializeDebounced]);

  let triggerProps;

  if (trigger === POPOVER_TRIGGER_TYPES.hover) {
    triggerProps = {
      onMouseEnter: initializeDebounced,
      onMouseLeave: initializeDebounced.cancel,
    };
  } else {
    triggerProps = {
      [`on${upperFirst(trigger)}`]: (e) => {
        e.preventDefault();
        initialize();
      },
    };
  }

  if (trigger === POPOVER_TRIGGER_TYPES.focus) {
    return React.cloneElement(React.Children.only(children), {
      ...triggerProps,
      ref: triggerRef,
    });
  }

  return (
    <TriggerContainer {...triggerProps} ref={triggerRef}>
      {children}
    </TriggerContainer>
  );
}

const TriggerWithRef = React.forwardRef(Trigger);
const LazyPopoverWithRef = React.forwardRef(LazyPopover);

LazyPopoverWithRef.propTypes = Popover.propTypes;
LazyPopoverWithRef.defaultProps = Popover.defaultProps;

export default LazyPopoverWithRef;
