import { upperFirst } from 'lodash';
import { PopoverPlacement } from '../../../../enums';

export const fixPlacement = (
  placement: PopoverPlacement,
  [firstSide, firstSidePosition, firstSideConstraint]: [
    PopoverPlacement,
    number,
    number
  ],
  [secondSide, secondSidePosition, secondSideConstraint]: [
    PopoverPlacement,
    number,
    number
  ]
): PopoverPlacement => {
  if (
    firstSidePosition > firstSideConstraint &&
    placement.toLowerCase().includes(firstSide)
  ) {
    return placement
      .replace(firstSide, secondSide)
      .replace(
        upperFirst(firstSide),
        upperFirst(secondSide)
      ) as PopoverPlacement;
  }

  if (
    secondSidePosition < secondSideConstraint &&
    placement.toLowerCase().includes(secondSide)
  ) {
    return placement
      .replace(secondSide, firstSide)
      .replace(
        upperFirst(secondSide),
        upperFirst(firstSide)
      ) as PopoverPlacement;
  }

  return placement;
};

export const findFirstRelativeElement = (element: HTMLElement): Element => {
  if (element.tagName === 'BODY') {
    return element;
  }

  const style = window.getComputedStyle(element);
  if (style.position === 'static') {
    return element.offsetParent || element;
  }

  return element;
};

export const findScrollContainer = (element: HTMLElement): HTMLElement => {
  if (element.tagName === 'BODY') {
    return element;
  }

  if (element.scrollHeight > element.clientHeight) {
    return element;
  }

  return findScrollContainer(element.parentElement);
};
