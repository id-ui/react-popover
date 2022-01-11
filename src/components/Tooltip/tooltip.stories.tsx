import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import popoverConfig from '../Popover/popover.stories';
import Tooltip from './Tooltip';

export default {
  title: 'Tooltip',
  component: Tooltip,
  argTypes: {
    title: { control: 'string' },
    ...popoverConfig.argTypes,
  },
} as ComponentMeta<typeof Tooltip>;

export const SimpleTooltip: ComponentStory<typeof Tooltip> = (props) => {
  return (
    <Tooltip {...props}>
      <button>Open Tooltip</button>
    </Tooltip>
  );
};

SimpleTooltip.args = {
  title: 'Hi!',
};
