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
    'framer-motion',
    'debounce'
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx'],
    mainFields: ['browser', 'module', 'main'],
  },
};
