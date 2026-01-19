const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: "production",
  output: {
    filename: 'forscore.gs',
    iife: false,
    path: path.resolve(__dirname, 'dist'),
  },
};