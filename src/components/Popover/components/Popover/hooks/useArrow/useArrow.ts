import { FlattenSimpleInterpolation } from 'styled-components';
import { useMemo } from 'react';
import { UseArrowArgs } from './types';
import { arrowStyleGetters } from './arrowStyleGetters';

export const useArrow = ({
  placement,
  arrowSize,
  arrowPlacement,
  arrowOffset,
}: UseArrowArgs): FlattenSimpleInterpolation => {
  return useMemo(
    () =>
      arrowStyleGetters[placement]({ arrowSize, arrowPlacement, arrowOffset }),
    [placement, arrowSize, arrowPlacement, arrowOffset]
  );
};
