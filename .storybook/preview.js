import React, { Fragment } from 'react';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html {
      font-size: 10px;
    }
    
    body {
      font-size: 1.4rem;
      font-family: Roboto, sans-serif;
      color: #141414;
    }
    
    * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      outline: none;
    }
    
    button {
      outline: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      border: none;
      cursor: pointer;
      border-radius: 0.5rem;
      padding: 0 1.5rem;
      background-color: #580B9E;
      color: #FFFFFF;
      height: 3.5rem;
      &:hover {
        background-color: #9552D4;
      }
    }
    
    .note {
      margin-top: 1rem;
    }
`;

export const parameters = {
  layout: 'centered',
};

export const decorators = [
  (Story) => (
    <Fragment>
      <Story />
      <GlobalStyle />
    </Fragment>
  ),
];
