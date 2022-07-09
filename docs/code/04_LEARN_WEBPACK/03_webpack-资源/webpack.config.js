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

      // {
      //   test: /\.(png|jpg)$/,
      //   use: {
      //     loader: "file-loader",
      //     options: {
      //       // outputPath: "images/",
      //       name: "img/[name]_[hash:6].[ext]",
      //     },
      //   },
      // },

      // {
      //   test: /\.(png|jpg)$/,
      //   use: {
      //     loader: "url-loader",
      //     options: {
      //       // outputPath: "images/",
      //       name: "img/[name]_[hash:6].[ext]",
      //       // limit: 100 * 1024, // 小于100kb的图片转成base64
      //     },
      //   },
      // },

      {
        test: /\.(png|jpg)$/,
        type: "asset",
        generator: {
          filename: "img/[name]_[hash:6][ext]",
        },
        parser: {
          dataUrlCondition: {
            maxSize: 50 * 1024,
          },
        },
      },

      // {
      //   test: /\.(eot|ttf|woff|woff2?)$/,
      //   use: {
      //     loader: "file-loader",
      //     options: {
      //       name: "font/[name]_[hash:6].[ext]",
      //     },
      //   },
      // },

      {
        test: /\.(eot|ttf|woff|woff2?)$/,
        type: "asset/resource",
        generator: {
          filename: "font/[name]_[hash:6][ext]",
        },
      },
    ],
  },
};
