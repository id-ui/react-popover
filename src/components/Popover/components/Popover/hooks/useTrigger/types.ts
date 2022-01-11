import { MutableRefObject, RefCallback } from 'react';
import { PopoverProps } from '../../../../types';
import { UseTriggerHandlersProps } from '../useTriggerHandlers';

export interface UseTriggerProps
  extends UseTriggerHandlersProps,
    Pick<
      PopoverProps,
      | 'closeOnScroll'
      | 'considerTriggerMotion'
      | 'triggerContainerDisplay'
      | 'usePortal'
    > {
  ref: RefCallback<HTMLElement> | MutableRefObject<HTMLElement>;
  triggerElementRef: MutableRefObject<HTMLElement>;
  updatePosition: () => void;
  addTarget: (trigger: string, node: HTMLElement) => void;
}
