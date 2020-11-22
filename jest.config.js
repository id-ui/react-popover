const config = require('kcd-scripts/jest');

module.exports = {
  ...config,
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};
