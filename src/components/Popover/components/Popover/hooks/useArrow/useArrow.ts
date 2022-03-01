import { useMemo } from 'react';
import { UseArrowArgs } from './types';
import { arrowStyleGetters } from './arrowStyleGetters';
import { ArrowPlacementStyles } from './arrowPlacementGetters';

export const useArrow = ({
  placement,
  arrowSize,
  arrowPlacement,
  arrowOffset,
}: UseArrowArgs): ArrowPlacementStyles => {
  return useMemo(
    () =>
      arrowStyleGetters[placement]({ arrowSize, arrowPlacement, arrowOffset }),
    [placement, arrowSize, arrowPlacement, arrowOffset]
  );
};
