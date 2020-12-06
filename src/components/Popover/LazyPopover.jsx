import React, { useCallback, useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import { POPOVER_TRIGGER_TYPES } from './constants';
import Popover from './Popover';

function LazyPopover(props, ref) {
  const {
    isOpen: providedIsOpen,
    onChangeOpen,
    triggerContainerTag,
    children,
    trigger,
    isOpenControlled,
    triggerContainerDisplay,
    mouseEnterDelay,
  } = props;

  const [isInitialized, setInitialized] = useState(
    () => providedIsOpen || _.isFunction(children)
  );
  const [isOpen, setOpen] = useState(providedIsOpen);

  const handleChangeOpen = useCallback(
    (value) => {
      if (!isOpenControlled) {
        setOpen(value);
      }
      onChangeOpen(value);
    },
    [onChangeOpen, isOpenControlled]
  );

  const initialize = useCallback(() => {
    if (isOpenControlled) {
      onChangeOpen(true);
    } else {
      setOpen(true);
      setInitialized(true);
    }
  }, [isOpenControlled, onChangeOpen]);

  useEffect(() => {
    setOpen(providedIsOpen);
    if (providedIsOpen && isOpenControlled) {
      setInitialized(true);
    }
  }, [providedIsOpen, isOpenControlled]);

  if (isInitialized) {
    return (
      <Popover
        {...props}
        ref={ref}
        isOpen={isOpen}
        onChangeOpen={handleChangeOpen}
      >
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
        if (_.isFunction(ref)) {
          ref(node);
        } else {
          ref.current = node;
        }
      }
    },
    [triggerContainerDisplay, ref]
  );

  const TriggerContainer = triggerContainerTag;

  const triggerProps = useMemo(() => {
    if (trigger === POPOVER_TRIGGER_TYPES.hover) {
      const initializeDebounced = _.debounce(initialize, mouseEnterDelay);
      return {
        onMouseEnter: initializeDebounced,
        onMouseLeave: initializeDebounced.cancel,
      };
    }

    return {
      [`on${_.upperFirst(trigger)}`]: initialize,
    };
  }, [initialize, mouseEnterDelay, trigger]);

  return trigger === POPOVER_TRIGGER_TYPES.focus ? (
    React.cloneElement(React.Children.only(children), {
      ...triggerProps,
      ref: triggerRef,
    })
  ) : (
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
