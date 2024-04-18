const { merge } = require("webpack-merge");
const common = require("./webpack/webpack.common.js");

const envs = {
  development: "dev",
  production: "prod",
  copy: "copy",
};

const env = envs[process.env.NODE_ENV || "development"];
const envConfig = require(`./webpack/webpack.${env}.js`);
const mergeConfig = merge(common, envConfig);

module.exports = mergeConfig;
