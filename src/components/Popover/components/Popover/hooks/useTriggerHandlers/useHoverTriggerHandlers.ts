import { useEffect, useMemo } from 'react';
import { debounce } from 'lodash';
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
      openDebounced.cancel();
      closeDebounced.cancel();
    };
  }, [openDebounced, closeDebounced]);

  return {
    onMouseEnter: () => {
      if (isOpen) {
        closeDebounced.cancel();
        return;
      }

      openDebounced();
    },
    onMouseLeave: () => {
      openDebounced.cancel();
      closeDebounced();
    },
  };
};
