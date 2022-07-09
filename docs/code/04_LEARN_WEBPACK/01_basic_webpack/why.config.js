const path = require("path");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "./build"), // 绝对路径
    filename: "bundle.js",
  },
};
