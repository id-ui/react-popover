import _ from 'lodash';

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
      .replace(_.upperFirst(firstSide), _.upperFirst(secondSide));
  }

  if (
    secondSidePosition < secondSideConstraint &&
    placement.toLowerCase().includes(secondSide)
  ) {
    return placement
      .replace(secondSide, firstSide)
      .replace(_.upperFirst(secondSide), _.upperFirst(firstSide));
  }

  return placement;
};
