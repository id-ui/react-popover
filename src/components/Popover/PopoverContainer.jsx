import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Popover from './Popover';
import LazyPopover from './LazyPopover';

function PopoverContainer(props, ref) {
  const isOpenControlled = useMemo(() => _.isBoolean(props.isOpen), [
    props.isOpen,
  ]);

  if (props.lazy) {
    return (
      <LazyPopover ref={ref} isOpenControlled={isOpenControlled} {...props} />
    );
  }

  return <Popover ref={ref} isOpenControlled={isOpenControlled} {...props} />;
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
