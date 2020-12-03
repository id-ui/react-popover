import { useCallback, useEffect, useMemo } from 'react';
import _ from 'lodash';

export default ({
  isOpen,
  open,
  close,
  mouseEnterDelay,
  mouseLeaveDelay,
  showTimer,
  showContent,
  setOpen,
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

    showContent(undefined, openDebounced);
  }, [closeDebounced, isOpen, openDebounced, showContent]);

  const handleMouseLeave = useCallback(() => {
    openDebounced.cancel();
    clearTimeout(showTimer.current);
    closeDebounced();
  }, [closeDebounced, openDebounced, showTimer]);

  const handleFocus = useCallback(
    (e) => {
      if (!isOpen) {
        showContent();
      }
      onFocus(e);
    },
    [isOpen, onFocus, showContent]
  );

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();

      if (!isOpen) {
        showContent();
      } else {
        setOpen(!isOpen);
      }
    },
    [isOpen, showContent, setOpen]
  );

  return {
    handleClick,
    handleMouseEnter,
    handleMouseLeave,
    handleFocus,
  };
};
