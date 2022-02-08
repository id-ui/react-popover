import { useEffect, useMemo } from 'react';
import debounce from 'debounce';
import { TriggerHandlers, UseTriggerHandlersProps } from './types';

export const useHoverTriggerHandlers = ({
  mouseEnterDelay,
  mouseLeaveDelay,
  open,
  close,
  isOpen,
}: UseTriggerHandlersProps): TriggerHandlers => {
  const openDebounced = useMemo(() => debounce(open, mouseEnterDelay), [
    mouseEnterDelay,
    open,
  ]);

  const closeDebounced = useMemo(() => debounce(close, mouseLeaveDelay), [
    mouseLeaveDelay,
    close,
  ]);

  useEffect(() => {
    return () => {
      openDebounced.clear();
      closeDebounced.clear();
    };
  }, [openDebounced, closeDebounced]);

  return {
    onMouseEnter: () => {
      if (isOpen) {
        closeDebounced.clear();
        return;
      }

      openDebounced();
    },
    onMouseLeave: () => {
      openDebounced.clear();
      closeDebounced();
    },
  };
};
