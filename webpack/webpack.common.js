const HtmlWebpackPlugin = require("html-webpack-plugin");

const commonPaths = require("./paths");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|jpeg|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              outputPath: commonPaths.imagesFolder,
            },
          },
        ],
      },
      {
        test: /\.(woff2|ttf|woff|eot)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: commonPaths.fontsFolder,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: ["src", "node_modules"],
    extensions: ["*", ".js", ".jsx", ".css", ".scss"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: commonPaths.templatePath,
      base: "/",
    }),
  ],
};
