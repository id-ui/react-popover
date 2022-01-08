import { upperFirst } from 'lodash';

export const checkConstraints = (
  placement,
  [firstSide, firstSidePosition, firstSideConstraint],
  [secondSide, secondSidePosition, secondSideConstraint]
) => {
  if (
    firstSidePosition > firstSideConstraint &&
    placement.toLowerCase().includes(firstSide)
  ) {
    return placement
      .replace(firstSide, secondSide)
      .replace(upperFirst(firstSide), upperFirst(secondSide));
  }

  if (
    secondSidePosition < secondSideConstraint &&
    placement.toLowerCase().includes(secondSide)
  ) {
    return placement
      .replace(secondSide, firstSide)
      .replace(upperFirst(secondSide), upperFirst(firstSide));
  }

  return placement;
};
