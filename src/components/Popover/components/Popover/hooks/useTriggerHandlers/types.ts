import { ReactEventHandler } from 'react';
import { PopoverProps } from '../../../../types';

export interface UseTriggerHandlersProps
  extends Pick<
    PopoverProps,
    'mouseEnterDelay' | 'mouseLeaveDelay' | 'isOpen' | 'trigger'
  > {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export interface TriggerHandlers {
  [key: string]: ReactEventHandler<HTMLElement>;
}
