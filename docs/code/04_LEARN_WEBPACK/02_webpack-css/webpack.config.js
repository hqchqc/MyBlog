const path = require("path");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "./build"), // 绝对路径
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/, // 正则表达式

        // loader的语法糖
        // loader: "css-loader",

        // 2 完整写法  后面的先加载
        use: [
          // { loader: "css-loader" }
          "style-loader",
          "css-loader",
          "postcss-loader",
          // {
          //   loader: "postcss-loader",
          //   options: {
          //     postcssOptions: {
          //       plugins: [require("autoprefixer")],
          //     },
          //   },
          // },
        ],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },

      // 可以写在一起
      // {
      //   test: /\.(less|css)$/,
      //   use: ["style-loader", "css-loader", "postcss-loader"],
      // },
    ],
  },
};
