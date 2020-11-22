import React from 'react';
import PropTypes from 'prop-types';
import Popover from '../Popover';

function Tooltip({ title, children, ...props }) {
  return (
    <Popover content={title} {...props}>
      {children}
    </Popover>
  );
}

Tooltip.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
};

export default Tooltip;
