var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var webpack = require("webpack");

module.exports = {
  entry: ["./lib/index.js"],
  output: {
    path: path.resolve(__dirname, "src/static/lib"),
    filename: "water.js",
    library: "water",
    libraryTarget: "window"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      google_api_key: process.env.GOOGLE_API_KEY,
      template: path.resolve(__dirname, "lib/demo.html"),
      filename: path.resolve(__dirname, "src/static/index.html")
    })
  ],
  devtool: "source-map",
  optimization: {
    minimize: false
  }
};
