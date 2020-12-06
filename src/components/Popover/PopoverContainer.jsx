import React from 'react';
import PropTypes from 'prop-types';
import Popover from './Popover';
import LazyPopover from './LazyPopover';

function PopoverContainer(props, ref) {
  if (props.lazy) {
    return <LazyPopover ref={ref} {...props} />;
  }

  return <Popover ref={ref} {...props} />;
}

const PopoverContainerWithRef = React.forwardRef(PopoverContainer);

PopoverContainerWithRef.propTypes = {
  /**
   * whether wait for trigger event to initialize popover or not
   * @default true
   */
  lazy: PropTypes.bool,
};

PopoverContainerWithRef.defaultProps = {
  lazy: true,
};

export default PopoverContainerWithRef;
