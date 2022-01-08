import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { isUndefined } from 'lodash';
import Popover from './Popover';
import LazyPopover from './LazyPopover';

function PopoverContainer(
  { initialIsOpen, isOpen: providedIsOpen, onChangeOpen, ...props },
  ref
) {
  const [isOpen, setOpen] = useState(initialIsOpen);

  const isOpenControlled = !isUndefined(providedIsOpen);

  const handleChangeOpen = useCallback(
    (value) => {
      onChangeOpen(value);
      if (!isOpenControlled) {
        setOpen(value);
      }
    },
    [isOpenControlled, onChangeOpen]
  );

  const commonProps = {
    isOpen: isOpenControlled ? providedIsOpen : isOpen,
    onChangeOpen: handleChangeOpen,
  };

  if (props.lazy) {
    return <LazyPopover ref={ref} {...commonProps} {...props} />;
  }

  return <Popover ref={ref} {...commonProps} {...props} />;
}

const PopoverContainerWithRef = React.forwardRef(PopoverContainer);

PopoverContainerWithRef.propTypes = {
  /**
   * whether wait for trigger event to initialize popover or not
   * @default true
   */
  lazy: PropTypes.bool,
  /**
   * whether popover open on init or not
   * @default true
   */
  initialIsOpen: PropTypes.bool,
  /**
   * controlled popover visibility
   * @default undefined
   */
  isOpen: PropTypes.bool,
  /**
   * Function triggered when popover should change visibility
   * @default () => {}
   */
  onChangeOpen: PropTypes.func,
};

PopoverContainerWithRef.defaultProps = {
  lazy: true,
  initialIsOpen: false,
  onChangeOpen: () => {},
};

export default PopoverContainerWithRef;
