
const webpack = require('webpack');
const path = require('path');
const appConfig = require(path.join(process.cwd(), 'app.config'))

const vendors = ['vue', 'vuex', 'vue-router'];
module.exports = {
  mode: 'production',
  output: {
    filename: '[name]_[chunkhash:8].dll.js',
    library: '[name]_[chunkhash:8]',
  },
  entry: {
    'vendors': vendors.concat(appConfig.webpackDLL || []),
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[chunkhash:8]',
      context: path.join(process.cwd()),
      path: path.join(process.cwd(), '[name]-manifest.json'),
    }),
  ],
};
