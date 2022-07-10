const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  // 设置模式
  // development / production
  mode: "development",
  // 设置source-map 建立js映射文件 方便调试代码错误
  devtool: "source-map", // 默认是eval 源代码就是用eval函数执行
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "./build"), // 绝对路径
    filename: "js/bundle.js",
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
            maxSize: 70 * 1024,
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

      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: "babel-loader",
      //     options: {
      //       // plugins: [
      //       //   "@babel/plugin-transform-arrow-functions",
      //       //   "@babel/plugin-transform-block-scoping",
      //       // ],
      //       presets: ["@babel/preset-env"],
      //     },
      //   },
      // },

      {
        test: /\.js$/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      title: "这是一个标题 好强👌",
    }),
    new DefinePlugin({
      BASE_TEXT: "'好厉害呀'",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public",
          to: "./",
          globOptions: {
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
  ],
};
