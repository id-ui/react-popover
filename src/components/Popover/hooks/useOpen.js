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
  const target = useRef();
  const parentNode = useRef(document.body);

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
      if (
        isOpen &&
        closeOnRemoteClick &&
        (!target.current || !target.current.contains(e.target)) &&
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

    document.addEventListener('click', remoteClickListener);
    document.addEventListener('keydown', keyDownListener);

    return () => {
      document.removeEventListener('click', remoteClickListener);
      document.removeEventListener('keydown', keyDownListener);
    };
  }, [isOpen, closeOnRemoteClick, close, closeOnEscape, closeOnEnter]);

  return {
    isOpen,
    setOpen: updateOpen,
    open,
    close,
    toggle,
    target,
    parentNode,
  };
};
