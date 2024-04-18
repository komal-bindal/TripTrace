const webpack = require("webpack");
const commonPaths = require("./paths");

module.exports = {
  entry: commonPaths.entryPath,
  output: {
    publicPath: "/",
    path: commonPaths.outputPath,
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        include: commonPaths.srcPath,
        use: {
          loader: "babel-loader",
          options: {},
        },
      },
      {
        test: /\.(css|scss)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: false,
              modules: {
                localIdentName: "[local]",
                exportLocalsConvention: "camelCase",
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  mode: "development",
  devServer: {
    open: true,
    port: 3000,
    proxy: {
      "/triptrace": {
        router: () => "http://192.168.29.175:8080",
        secure: false,
        // changeOrigin: true,
      },
    },
    headers: {},
  },
};
