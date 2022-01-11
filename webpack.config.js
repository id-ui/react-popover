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
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    modules: [path.resolve('./src/'), 'node_modules'],
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    mainFields: ['browser', 'module', 'main'],
  },
};
