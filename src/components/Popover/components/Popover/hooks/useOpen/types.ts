import { PopoverProps } from 'types';

export type UseOpenProps = Pick<
  PopoverProps,
  | 'closeOnEscape'
  | 'closeOnEnter'
  | 'closeOnTab'
  | 'closeOnRemoteClick'
  | 'isOpen'
  | 'onChangeOpen'
>;
