const path = require("path");

module.exports = {
  root: path.resolve(__dirname, "../"),
  outputPath: path.resolve(__dirname, "../", "build"),
  entryPath: path.resolve(__dirname, "../", "src/index.js"),
  scssEntryPath: path.resolve(__dirname, "../", "src/scss/_all.scss"),
  templatePath: path.resolve(__dirname, "../", "src/template.html"),
  srcPath: path.resolve(__dirname, "../", "src"),
  imagesFolder: "img",
  fontsFolder: "fonts",
  cssFolder: "css",
  jsFolder: "js/libs",
};
