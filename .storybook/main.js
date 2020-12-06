const custom = require('../webpack.config');

module.exports = {
  stories: ['../src/**/*.stories.(js|mdx)'],
  webpackFinal: (config) => {
    const oldRules = config.module.rules;
    config.module.rules = [
      ...custom.module.rules,
      ...oldRules.filter((item) => /(story|md)/.test(item.test.toString())),
    ];

    config.resolve = custom.resolve;
    return config;
  },
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-storysource',
    'storybook-addon-react-docgen',
  ],
};
