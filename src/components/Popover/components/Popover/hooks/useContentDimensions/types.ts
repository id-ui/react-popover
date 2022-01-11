import { MutableRefObject } from 'react';

export type PopoverContentDimensionsRefObject = MutableRefObject<{
  height: number;
  width: number;
  verticalPadding: number;
  horizontalPadding: number;
}>;

export interface UsePopoverContentDimensionsProps {
  onDimensionsChanged: () => void;
  dimensionsRef: PopoverContentDimensionsRefObject;
  isOpen: boolean;
  considerContentResizing: boolean;
}
