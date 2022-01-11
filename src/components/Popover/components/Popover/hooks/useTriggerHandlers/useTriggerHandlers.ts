import { SyntheticEvent } from 'react';
import { PopoverTriggerType } from '../../../../enums';
import { useHoverTriggerHandlers } from './useHoverTriggerHandlers';
import { TriggerHandlers, UseTriggerHandlersProps } from './types';

export const useTriggerHandlers = (
  props: UseTriggerHandlersProps
): TriggerHandlers => {
  const { toggle, trigger } = props;

  if (trigger === PopoverTriggerType.hover) {
    // eslint-disable-next-line  react-hooks/rules-of-hooks
    return useHoverTriggerHandlers(props);
  }

  const handleClick = (e: SyntheticEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();

    toggle();
  };

  switch (trigger) {
    case PopoverTriggerType.click: {
      return {
        onMouseDown: handleClick,
      };
    }
    case PopoverTriggerType.contextMenu: {
      return {
        onContextMenu: handleClick,
      };
    }
    default: {
      return {};
    }
  }
};
