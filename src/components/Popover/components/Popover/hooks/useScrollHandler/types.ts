import { PopoverProps } from '../../../../types';

export interface UseScrollHandlerProps
  extends Pick<
    PopoverProps,
    'scrollHandlerMinDistance' | 'isOpen' | 'closeOnScroll'
  > {
  close: () => void;
  updatePosition: () => void;
}
