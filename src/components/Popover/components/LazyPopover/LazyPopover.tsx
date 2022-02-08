import React, {
  ForwardRefRenderFunction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { PopoverTriggerType } from '../../enums';
import { PopoverProps } from '../../types';
import Popover from '../Popover';
import LazyPopoverTrigger from './components/LazyPopoverTrigger';
import { isFunction } from '../../helpers';

const LazyPopover: ForwardRefRenderFunction<HTMLElement, PopoverProps> = (
  props,
  ref
) => {
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
    () => isOpen || isFunction(children) || trigger === PopoverTriggerType.focus
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
    <LazyPopoverTrigger
      triggerContainerTag={triggerContainerTag}
      trigger={trigger}
      triggerContainerDisplay={triggerContainerDisplay}
      initialize={initialize}
      mouseEnterDelay={mouseEnterDelay}
      ref={ref}
    >
      {children}
    </LazyPopoverTrigger>
  );
};

const LazyPopoverWithRef = React.forwardRef<HTMLElement>(LazyPopover);

export default LazyPopoverWithRef;
