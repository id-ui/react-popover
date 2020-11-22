import React from 'react';
import popoverConfig from '../Popover/popover.stories';
import Tooltip from './Tooltip';

export default {
  title: 'Tooltip',
  component: Tooltip,
  argTypes: {
    title: { control: 'string' },
    ...popoverConfig.argTypes,
  },
};

export function tooltip(props) {
  return (
    <Tooltip {...props}>
      <button>Open Tooltip</button>
    </Tooltip>
  );
}

tooltip.args = {
  title: 'Hi!',
};
