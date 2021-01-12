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
      const targets = _.values(targetsMap.current).filter(Boolean);
      if (
        isOpen &&
        closeOnRemoteClick &&
        !targets.find((item) => item.contains(e.target)) &&
        (e.which || e.button) === 1 &&
        (!parentNode.current || parentNode.current.contains(e.target))
      ) {
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

    document.addEventListener('mousedown', remoteClickListener);
    document.addEventListener('keydown', keyDownListener);

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
