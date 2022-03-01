import { create } from '@storybook/theming/create';

export default create({
  base: 'light',

  colorPrimary: '#580B9E',
  colorSecondary: '#14B9E4',

  // UI
  appBg: '#F9F2FF',
  appContentBg: '#F9F2FF',
  appBorderColor: '#B4B4B4',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Roboto", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#14113C',
  textInverseColor: '#FFFFFF',

  // Toolbar default and active colors
  barTextColor: '#FFFFFF',
  barSelectedColor: '#F9F2FF',
  barBg: '#580B9E',

  // Form colors
  inputBg: '#FFFFFF',
  inputBorder: '#B4B4B4',
  inputTextColor: '#313131',
  inputBorderRadius: 5,

  brandTitle: 'IDUI',
  brandUrl: 'http://id-ui.org',
  brandImage: 'https://avatars0.githubusercontent.com/u/75687767?s=200&v=4',
});
