import React from 'react';
import { PopoverProps } from 'types';

export interface PopoverTriggerProps
  extends Pick<
    PopoverProps,
    | 'triggerContainerTag'
    | 'trigger'
    | 'triggerContainerDisplay'
    | 'mouseEnterDelay'
    | 'children'
  > {
  initialize: () => void;
  ref: React.MutableRefObject<HTMLElement>;
}
