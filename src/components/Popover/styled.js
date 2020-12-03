import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { ifProp, prop, withProp } from 'styled-tools';

export const Container = styled(motion.div)`
  position: absolute;
  box-shadow: 0 0.4rem 0.8rem -0.4rem rgba(0, 0, 0, 0.11),
    0 0.8rem 1.6rem 0 rgba(0, 0, 0, 0.09),
    0 0.9rem 1.5rem 0.9rem rgba(0, 0, 0, 0.05);
  z-index: ${prop('zIndex', 1000)};
  background-color: #ffffff;
  border-radius: 0.3rem;
  cursor: default;
  padding: 1.2rem 1.6rem;
  width: ${prop('width')};
  height: ${prop('height')};
  ${prop('positionStyles')};
  ${ifProp(
    'withArrow',
    css`
      &:before {
        content: '';
        position: absolute;
        border: ${withProp('arrowSize', (arrowSize) => arrowSize / 2)}px solid
          #ffffff;
        border-right-color: transparent;
        border-top-color: transparent;
        box-shadow: -0.2rem 0.2rem 0.7rem rgba(0, 0, 0, 0.07);
        ${prop('arrowStyles')};
      }
    `
  )}
`;

export const Inner = styled.div`
  ${ifProp(
    'maxHeight',
    css`
      max-height: ${prop('maxHeight')}!important;
    `
  )}
  ${ifProp(
    'maxWidth',
    css`
      max-width: ${prop('maxWidth')}!important;
    `
  )}
  overflow: auto;
`;

export const CheckContentDimensionsHelper = styled(Inner)`
  position: absolute;
  left: -99.9rem;
  top: -99.9rem;
  width: ${prop('width')};
  height: ${prop('height')};
`;
