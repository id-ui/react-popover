const config = require('kcd-scripts/jest');

module.exports = {
  ...config,
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};
