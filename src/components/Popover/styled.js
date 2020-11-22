import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { ifProp, prop } from 'styled-tools';
import { ARROW_SIZE } from './constants';

export const Container = styled(motion.div)`
  position: absolute;
  box-shadow: 0 0.4rem 0.8rem -0.4rem rgba(0, 0, 0, 0.11),
    0 0.8rem 1.6rem 0 rgba(0, 0, 0, 0.09),
    0 0.9rem 1.5rem 0.9rem rgba(0, 0, 0, 0.05);
  z-index: 3;
  background-color: #ffffff;
  padding: 0.5rem;
  border-radius: 0.3rem;
  cursor: default;
  ${prop('positionStyles')};
  ${ifProp(
    'withArrow',
    css`
      &:before {
        content: '';
        position: absolute;
        border: ${ARROW_SIZE}px solid #ffffff;
        border-right-color: transparent;
        border-top-color: transparent;
        box-shadow: -0.2rem 0.2rem 0.7rem rgba(0, 0, 0, 0.07);
      }
    `
  )}
`;

export const CheckTargetDimensionsHelper = styled.div`
  position: absolute;
  left: -99.9rem;
  top: -99.9rem;
`;
