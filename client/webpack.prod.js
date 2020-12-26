const { merge } = require('webpack-merge');
const CopyPlugin = require("copy-webpack-plugin");
const common = require('./webpack.common.js');
const config = {
  ...common,
  mode: 'production',
  plugins: [
    ...common.plugins,
    new CopyPlugin({
      patterns: [
        { from: "public", to: "" },
      ],
    }),
  ],
}

module.exports = config;