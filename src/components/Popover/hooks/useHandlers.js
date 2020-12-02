import { useCallback } from 'react';

export default ({
  isOpen,
  openDebounced,
  closeDebounced,
  showContent,
  setOpen,
  onFocus,
}) => {
  const handleMouseEnter = useCallback(() => {
    if (isOpen) {
      closeDebounced.cancel();
      return;
    }

    showContent(undefined, openDebounced);
  }, [closeDebounced, isOpen, openDebounced, showContent]);

  const handleMouseLeave = useCallback(() => {
    openDebounced.cancel();
    closeDebounced();
  }, [closeDebounced, openDebounced]);

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
