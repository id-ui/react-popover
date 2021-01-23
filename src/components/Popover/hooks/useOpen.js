import { useCallback, useEffect, useRef } from 'react';
import _ from 'lodash';

export default ({
  closeOnEscape,
  closeOnEnter,
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

      const targets = _.values(targetsMap.current).filter(Boolean);
      if (!targets.find((item) => item.contains(e.target))) {
        close();
      }
    };

    const keyDownListener = (e) => {
      if (
        isOpen &&
        [closeOnEscape && 'Escape', closeOnEnter && 'Enter'].includes(e.key)
      ) {
        close();
      }
    };

    document.addEventListener('keydown', keyDownListener);

    if (closeOnRemoteClick) {
      document.addEventListener('mousedown', remoteClickListener);
    }

    return () => {
      document.removeEventListener('mousedown', remoteClickListener);
      document.removeEventListener('keydown', keyDownListener);
    };
  }, [isOpen, closeOnRemoteClick, close, closeOnEscape, closeOnEnter]);

  return {
    setOpen: updateOpen,
    open,
    close,
    toggle,
    addTarget,
    parentNode,
  };
};
