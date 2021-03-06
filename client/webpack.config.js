const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.less$/,
        loader: 'less-loader', // compiles Less to CSS
      },
      { 
        test: /\.hbs$/, 
        loader: "handlebars-loader", 
        options: {
          helperDirs: path.join(__dirname, 'src/template-helpers'),
          precompileOptions: {
            knownHelpersOnly: false,
          },
        }, 
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: 'app.bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3000,
    publicPath: "http://localhost:3000/",
    historyApiFallback: {
      index: 'index.html'
    }
  },
}