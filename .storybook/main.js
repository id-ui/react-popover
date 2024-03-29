const custom = require('../webpack.config');

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-storysource',
  ],
};
