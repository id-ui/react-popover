import React, { useCallback, useState } from 'react';
import { withPropsTable } from 'storybook-addon-react-docgen';
import Popover from './Popover';
import { POPOVER_TRIGGER_TYPES } from './constants';
import placementsConfig from './placementsConfig';

export default {
  title: 'Popover',
  component: Popover,
  argTypes: {
    placement: {
      control: { type: 'select', options: Object.keys(placementsConfig) },
      description: "Where popover should show it's content",
      defaultValue: 'top',
      table: {
        defaultValue: { summary: 'top' },
      },
    },
    trigger: {
      control: {
        type: 'select',
        options: Object.values(POPOVER_TRIGGER_TYPES),
      },
      description: `Event name, on which popover should change visibility. 
      If trigger is 'focus' and you want to listen for onFocus/onBlur on child then provide popover with these listeners.
      If trigger is 'focus' then root child should accept event onFocus, use forwardRef to choose another child.`,
      defaultValue: POPOVER_TRIGGER_TYPES.hover,
      table: {
        defaultValue: { summary: POPOVER_TRIGGER_TYPES.hover },
      },
    },
    onFocus: {
      action: 'onFocus',
      description:
        "onFocus event of child component, triggered if trigger === 'focus'",
    },
    onBlur: {
      action: 'onBlur',
      description:
        "onBlur event of child component, triggered if trigger === 'focus'",
    },
    withArrow: {
      control: 'boolean',
      description: 'Whether show popover arrow or not',
      defaultValue: true,
      table: {
        defaultValue: { summary: true },
      },
    },
    children: {
      disable: true,
      description: `Popover children. 
    If it's function then it provided with {close: close popover, open: open popover, toggle: toggle popover, isOpen: is popover open}`,
    },
    content: {
      disable: true,
      description:
        "Popover content. If it's function then it provided with {close: close popover}",
    },
    onClose: {
      action: 'onClose',
      description: 'Function, triggered when popover closed',
    },
    offset: {
      control: 'array',
      description:
        'Offset from computed popover position, if offset = [x, y] then popover position would be [position.x + x, position.y + y]',
      defaultValue: [0, 0],
      table: {
        defaultValue: { summary: [0, 0] },
      },
    },
    getContainer: {
      disable: true,
      description:
        'Function, that should return component inside which popover should render its content',
    },
    isOpen: {
      control: 'boolean',
      description:
        'If isOpenControlled then it defines popover visibility else it defines initial popover visibility',
    },
    isOpenControlled: {
      control: 'boolean',
      description:
        'Whether popover visibility controlled or not, use if you want control visibility from external component',
      defaultValue: false,
      table: {
        defaultValue: { summary: false },
      },
    },
    onChangeOpen: {
      action: 'onChangeOpen',
      description: 'Function triggered when popover should change visibility',
    },
    className: {
      control: 'string',
      description: 'Popover content className',
    },
    considerTriggerMotion: {
      control: 'boolean',
      description:
        'Whether consider trigger position and size changes and follow it or not',
      defaultValue: false,
      table: {
        defaultValue: { summary: false },
      },
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Whether close on escape button press or not',
      defaultValue: true,
      table: {
        defaultValue: { summary: true },
      },
    },
    closeOnEnter: {
      control: 'boolean',
      description: 'Whether close on enter button press or not',
      defaultValue: false,
      table: {
        defaultValue: { summary: false },
      },
    },
    closeOnRemoteClick: {
      control: 'boolean',
      description:
        "Whether close on remote click or not. Default trigger === 'click' || trigger === 'contextMenu'.",
      defaultValue: undefined,
      table: {
        defaultValue: { summary: undefined },
      },
    },
    guessBetterPosition: {
      control: 'boolean',
      description: 'Whether popover should change position if there is no room',
      defaultValue: true,
    },
    mouseEnterDelay: {
      control: 'number',
      description: 'Delay in ms before opening popover on mouseEnter',
      defaultValue: 100,
      table: {
        defaultValue: { summary: 100 },
      },
    },
    mouseLeaveDelay: {
      control: 'number',
      description: 'Delay in ms before closing popover on mouseLeave',
      defaultValue: 300,
      table: {
        defaultValue: { summary: 300 },
      },
    },
    triggerContainerDisplay: {
      control: 'number',
      description: 'display of popover trigger container',
    },
  },
  decorators: [withPropsTable],
  parameters: {
    props: {
      propTablesInclude: [Popover],
    },
  },
};

export function playground(props) {
  return (
    <Popover {...props}>
      <button>
        Trigger &quot;{props.trigger || 'hover'}&quot; event to open Popover
      </button>
    </Popover>
  );
}

playground.args = {
  placement: 'top',
  trigger: 'click',
  withArrow: 'true',
  offset: [0, 0],
  isOpen: undefined,
  isOpenControlled: false,
  considerTriggerMotion: false,
  closeOnEscape: true,
  closeOnEnter: true,
  closeOnRemoteClick: undefined,
  guessBetterPosition: true,
  mouseEnterDelay: 100,
  mouseLeaveDelay: 300,
  content: 'Hi!',
};

export function popoverWithFunctionChildren(props) {
  return (
    <Popover
      {...props}
      considerTriggerMotion
      placement="top"
      content="Hi!"
      trigger="click"
    >
      {({ isOpen }) => <button>{isOpen ? 'Opened' : 'Click to Open'}</button>}
    </Popover>
  );
}

const Input = React.forwardRef((props, ref) => (
  <div>
    <input type="text" {...props} ref={ref} />
  </div>
));

export function popoverWithFocusTrigger(props) {
  return (
    <div>
      <Popover {...props} content="I was opened on focus" trigger="focus">
        <Input type="text" placeholder="Focus" />
      </Popover>
      <div className="note">
        Note: Input uses forwardRef for changing trigger component to input
      </div>
    </div>
  );
}

export function MovingPopover(props) {
  const [left, setLeft] = useState(0);

  const handleChangeRange = useCallback((e) => {
    setLeft(e.target.value);
  }, []);

  return (
    <div>
      <div style={{ position: 'relative', width: '500px' }}>
        <Popover
          {...props}
          considerTriggerMotion
          isOpen
          isOpenControlled
          triggerContainerDisplay="inline"
          content="Hi! I follow trigger"
        >
          <span
            style={{
              position: 'absolute',
              left: `calc(${left}% - 5px)`,
              display: 'inline',
              width: '10px',
            }}
          />
        </Popover>
        <input
          type="range"
          min={0}
          max={100}
          onChange={handleChangeRange}
          value={left}
          style={{ width: '100%' }}
        />
      </div>
      <div className="note">
        Note: popover is visible and visibility controlled only for example
      </div>
      <div className="note">
        Note: triggerContainerDisplay provided because popover computes wrong
        value in storybook..
      </div>
    </div>
  );
}
