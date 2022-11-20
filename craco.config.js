/* craco.config.js */

module.exports = {
  webpack: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': __dirname + '/src',
    },
  },
};
