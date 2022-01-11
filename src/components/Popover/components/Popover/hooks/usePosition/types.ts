import { MutableRefObject } from 'react';
import { PopoverProps } from 'types';
import { PopoverPlacement } from 'enums';

export interface UsePositionProps
  extends Pick<
    PopoverProps,
    | 'placement'
    | 'offset'
    | 'withArrow'
    | 'guessBetterPosition'
    | 'animation'
    | 'openingAnimationTranslateDistance'
    | 'closingAnimationTranslateDistance'
    | 'spaceBetweenPopoverAndTarget'
    | 'getContainer'
    | 'arrowSize'
    | 'minSpaceBetweenPopoverAndContainer'
    | 'avoidOverflowBounds'
    | 'fitMaxHeightToBounds'
    | 'fitMaxWidthToBounds'
    | 'maxHeight'
    | 'maxWidth'
    | 'isOpen'
    | 'considerContentResizing'
  > {
  triggerElementRef: MutableRefObject<HTMLElement>;
  setBetterPlacement: (betterPlacement: PopoverPlacement) => void;
  canUpdate: boolean;
}
