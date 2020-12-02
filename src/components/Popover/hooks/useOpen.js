import { useCallback, useState, useEffect, useRef } from 'react';
import _ from 'lodash';

export default ({
  closeOnEscape,
  closeOnEnter,
  closeOnRemoteClick,
  onClose = _.noop,
  isOpen: providedIsOpen = false,
  isOpenControlled,
  onChangeOpen,
} = {}) => {
  const targetsMap = useRef({});
  const parentNode = useRef(document.body);

  const addTarget = useCallback((name, node) => {
    targetsMap.current[name] = node;
  }, []);

  const [isOpen, setOpen] = useState(() =>
    isOpenControlled ? false : providedIsOpen
  );

  const updateOpen = useCallback(
    (value, force) => {
      if (!force && (!isOpenControlled || providedIsOpen !== value)) {
        onChangeOpen(value);
      }

      if (force || !isOpenControlled) {
        setOpen(value);
      }
    },
    [isOpenControlled, onChangeOpen, providedIsOpen]
  );

  const open = useCallback(() => {
    updateOpen(true);
  }, [updateOpen]);

  const close = useCallback(() => {
    updateOpen(false);
    onClose();
  }, [onClose, updateOpen]);

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
    isOpen,
    setOpen: updateOpen,
    open,
    close,
    toggle,
    addTarget,
    parentNode,
  };
};
