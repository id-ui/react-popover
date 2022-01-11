import React from 'react';
import { Popover } from '../Popover';
import { TooltipProps } from './types';

function Tooltip({ title, children, ...props }: TooltipProps) {
  return (
    <Popover content={title} {...props}>
      {children}
    </Popover>
  );
}

export default Tooltip;
