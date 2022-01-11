const path = require('path');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
  },
  externals: [
    'react',
    'react-dom',
    'lodash',
    'prop-types',
    'styled-components',
    'styled-tools',
    'framer-motion',
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    modules: [path.resolve('./src/'), 'node_modules'],
    extensions: ['.ts', '.tsx'],
    mainFields: ['browser', 'module', 'main'],
  },
};
