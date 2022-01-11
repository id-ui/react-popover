import { ReactChild, ReactEventHandler, ReactNode } from 'react';
import { ArrowPlacement, PopoverTriggerType, PopoverPlacement } from './enums';

export interface PopoverChildrenProps {
  close: () => void;
  open: () => void;
  toggle: () => void;
  isOpen: boolean;
}

export interface PopoverContentProps {
  close: () => void;
}

export interface PopoverProps {
  /**
   * whether wait for trigger event to initialize popover or not
   * @default true
   */
  lazy?: boolean;
  /**
   * controlled popover visibility
   * @default undefined
   */
  isOpen?: boolean;
  /**
   * Function triggered when popover should change visibility
   * @default _.noop
   */
  onChangeOpen?: (isOpen: boolean) => void;
  /**
   * Where popover should show it's content
   * @default _.noop
   */
  placement?: PopoverPlacement;
  /**
   * Event name, on which popover should change visibility
   * If trigger is 'focus' and you want to listen for onFocus on child then provide popover with this listener
   * If trigger is 'focus' then root child should accept event onFocus, use forwardRef to choose another child
   * @default hover
   */
  trigger?: PopoverTriggerType;
  /**
   * onFocus event of child component, triggered if trigger === 'focus'
   * @default _.noop
   */
  onFocus?: ReactEventHandler<HTMLElement>;
  /**
   * Whether show popover arrow or not
   * @default true
   */
  withArrow?: boolean;
  /**
   * Popover children
   * @default undefined
   */
  children?: ReactChild | ((props: PopoverChildrenProps) => ReactChild);
  /**
   * Popover content
   * If it's function then it provided with {close: close popover}
   * @default undefined
   */
  content: ReactNode | ((props: PopoverContentProps) => ReactNode);
  /**
   * Offset from computed popover position, if offset = [x, y] then popover position would be [position.x + x, position.y + y]
   * @default [0, 0]
   */
  offset?: [x: number, y: number];
  /**
   * Function, that should return component inside which popover should render its content
   * @default () => document.body
   */
  getContainer?: () => HTMLElement;
  /**
   * Popover content className
   * @default undefined
   */
  className?: string;
  /**
   * Whether consider trigger position and size changes and follow it or not
   * @default false
   */
  considerTriggerMotion?: boolean;
  /**
   * Whether consider content resizing or not, use if content dimensions can change, for example after loading
   * @default false
   */
  considerContentResizing?: boolean;
  /**
   * Whether close on escape button press or not
   * @default true
   */
  closeOnEscape?: boolean;
  /**
   * Whether close on enter button press or not
   * @default false
   */
  closeOnEnter?: boolean;
  /**
   * Whether close on tab button press or not
   * @default false
   */
  closeOnTab?: boolean;
  /**
   * Whether close on scroll event of scroll container or not
   * @default true
   */
  closeOnScroll?: boolean;
  /**
   * Whether close on remote click or not
   * @default trigger !== 'hover'
   */
  closeOnRemoteClick?: boolean;
  /**
   * Whether popover should change position if there is no room
   * @default false
   */
  guessBetterPosition?: boolean;
  /**
   * Delay (ms) before opening popover on mouseEnter
   * @default 100
   */
  mouseEnterDelay?: number;
  /**
   * Delay (ms) before closing popover on mouseLeave
   * @default 300
   */
  mouseLeaveDelay?: number;
  /**
   * display of popover trigger container
   * @default display of root child
   */
  triggerContainerDisplay?: string;
  /**
   * tag of popover trigger container
   * @default span
   */
  triggerContainerTag?: keyof Pick<
    JSX.IntrinsicElements,
    | 'a'
    | 'b'
    | 'button'
    | 'div'
    | 'i'
    | 'img'
    | 'input'
    | 'label'
    | 'p'
    | 'span'
    | 'strong'
    | 'textarea'
  >;
  /**
   * framer-motion props for opening/closing content animation {initial, animate, exit}
   */
  animation?: { [key: string]: object };
  /**
   * distance in % that content should slide during opening
   */
  openingAnimationTranslateDistance?: number;
  /**
   * distance in % that content should slide during closing
   */
  closingAnimationTranslateDistance?: number;
  /**
   * popover content z-index
   */
  zIndex?: number;
  /**
   * space (px) between popover and target
   */
  spaceBetweenPopoverAndTarget?: number;
  /**
   * size (px) of square circumscribing popover arrow
   * @default 8
   */
  arrowSize?: number;
  /**
   * arrow offset (px) from popover side (second placement part) if placement consists of two sides
   * @default 10
   */
  arrowOffset?: number;
  /**
   * arrow placement (left|center|right for top|bottom and top|center|bottom for right|left)
   * @default second popover placement part if it consists of two sides else center
   */
  arrowPlacement?: ArrowPlacement;
  /**
   * max content width
   */
  maxWidth?: string;
  /**
   * max content height
   */
  maxHeight?: string;
  /**
   * min space (px) between popover and container
   * @default 10
   */
  minSpaceBetweenPopoverAndContainer?: number;
  /**
   * make content maxWidth fit to position and bounds
   * @default !maxWidth
   */
  fitMaxWidthToBounds?: boolean;
  /**
   * make content maxHeight fit to position and bounds
   * @default !maxHeight
   */
  fitMaxHeightToBounds?: boolean;
  /**
   * should popover try to change position to not overflow bounds if !fitMaxWidthToBounds && !fitMaxHeightToBounds
   * @default true
   */
  avoidOverflowBounds?: boolean;
  /**
   * content width
   * @default unset
   */
  width?: string;
  /**
   * content height
   * @default unset
   */
  height?: string;
  /**
   * make popover width to equal trigger width
   * @default false
   */
  useTriggerWidth?: boolean;
  /**
   * make popover height to equal trigger height
   * @default false
   */
  useTriggerHeight?: boolean;
  /**
   * whether render popover into container = getContainer() or render where it is
   * @default true
   */
  usePortal?: boolean;
  /**
   * whether popover open on init or not
   * @default true
   */
  initialIsOpen?: boolean;
}
