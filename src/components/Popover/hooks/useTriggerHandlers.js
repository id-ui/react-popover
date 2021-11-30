import { useEffect, useMemo } from 'react';
import _ from 'lodash';
import { POPOVER_TRIGGER_TYPES } from '../constants';

const useHoverTriggerHandlers = ({
  mouseEnterDelay,
  mouseLeaveDelay,
  open,
  close,
  isOpen,
}) => {
  const openDebounced = useMemo(() => _.debounce(open, mouseEnterDelay), [
    mouseEnterDelay,
    open,
  ]);

  const closeDebounced = useMemo(() => _.debounce(close, mouseLeaveDelay), [
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

export default (props) => {
  const { toggle, trigger } = props;

  if (trigger === POPOVER_TRIGGER_TYPES.hover) {
    return useHoverTriggerHandlers(props);
  }

  const handleClick = (e) => {
    e.preventDefault();

    toggle();
  };

  switch (trigger) {
    case POPOVER_TRIGGER_TYPES.click: {
      return {
        onMouseDown: handleClick,
      };
    }
    case POPOVER_TRIGGER_TYPES.contextMenu: {
      return {
        onContextMenu: handleClick,
      };
    }
    default: {
      return {};
    }
  }
};
