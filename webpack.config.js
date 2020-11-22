const path = require('path');

module.exports = {
  entry: './src/index.js',
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
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            cacheDirectory: true,
          },
        },
      },
    ],
  },
  resolve: {
    modules: [path.resolve('./src/'), 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
    mainFields: ['browser', 'module', 'main'],
  },
};
