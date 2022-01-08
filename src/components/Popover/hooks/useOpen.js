import { useCallback, useEffect, useRef } from 'react';

export default ({
  closeOnEscape,
  closeOnEnter,
  closeOnTab,
  closeOnRemoteClick,
  isOpen,
  onChangeOpen,
}) => {
  const targetsMap = useRef({});
  const parentNode = useRef(document.body);

  const addTarget = useCallback((name, node) => {
    targetsMap.current[name] = node;
  }, []);

  const updateOpen = useCallback(
    (value) => {
      if (isOpen !== value) {
        onChangeOpen(value);
      }
    },
    [onChangeOpen, isOpen]
  );

  const open = useCallback(() => {
    updateOpen(true);
  }, [updateOpen]);

  const close = useCallback(() => {
    updateOpen(false);
  }, [updateOpen]);

  const toggle = useCallback(() => {
    updateOpen(!isOpen);
  }, [isOpen, updateOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (!closeOnRemoteClick) {
      return;
    }

    const remoteClickListener = (e) => {
      if ((e.which || e.button) !== 1) {
        return;
      }

      if (!isOpen) {
        return;
      }

      if (parentNode.current && !parentNode.current.contains(e.target)) {
        return;
      }

      const targets = Object.values(targetsMap.current).filter(Boolean);

      if (!targets.find((item) => item.contains(e.target))) {
        close();
      }
    };

    document.addEventListener('mousedown', remoteClickListener);

    return () => {
      document.removeEventListener('mousedown', remoteClickListener);
    };
  }, [isOpen, closeOnRemoteClick, close]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (!closeOnEscape && !closeOnEnter && !closeOnTab) {
      return;
    }

    const keyDownListener = (e) => {
      if (
        isOpen &&
        [
          closeOnEscape && 'Escape',
          closeOnEnter && 'Enter',
          closeOnTab && 'Tab',
        ].includes(e.key)
      ) {
        close();
      }
    };

    document.addEventListener('keydown', keyDownListener);

    return () => {
      document.removeEventListener('keydown', keyDownListener);
    };
  }, [isOpen, close, closeOnEscape, closeOnEnter, closeOnTab]);

  return {
    setOpen: updateOpen,
    open,
    close,
    toggle,
    addTarget,
    parentNode,
  };
};
