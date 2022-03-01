const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

if (process.env.NOE_ENV === 'production') {
  module.exports = {
    plugins: [
      autoprefixer,
      cssnano({ preset: 'default' })
    ]
  };
}
