import { useCallback, useEffect, useMemo } from 'react';
import _ from 'lodash';

export default ({
  isOpen,
  open,
  close,
  toggle,
  mouseEnterDelay,
  mouseLeaveDelay,
  onFocus,
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

  const handleMouseEnter = useCallback(() => {
    if (isOpen) {
      closeDebounced.cancel();
      return;
    }

    openDebounced();
  }, [closeDebounced, isOpen, openDebounced]);

  const handleMouseLeave = useCallback(() => {
    openDebounced.cancel();
    closeDebounced();
  }, [closeDebounced, openDebounced]);

  const handleFocus = useCallback(
    (e) => {
      open();
      onFocus(e);
    },
    [onFocus, open]
  );

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();

      toggle();
    },
    [toggle]
  );

  return {
    handleClick,
    handleMouseEnter,
    handleMouseLeave,
    handleFocus,
  };
};
