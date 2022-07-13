const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const { VueLoaderPlugin } = require("vue-loader/dist/index");

module.exports = {
  target: "web", // 为了热替换配置的 不配置有一点问题
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "../build"), // 绝对路径
    filename: "js/bundle.js",
  },
  resolve: {
    extensions: [".js", ".json", ".vue", ".wasm"], // 默认值 所以导入的时候有些文件不用加后缀
    // mainFields: ["index"], // 如果导入的是文件夹 根据extensions中的值 默认去找index.js
    alias: {
      "@": path.resolve(__dirname, "../src"),
      js: path.resolve(__dirname, "../src/js"),
    },
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

      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      title: "这是一个标题 好强👌",
    }),
    new DefinePlugin({
      BASE_TEXT: "'好厉害呀'",
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),

    new VueLoaderPlugin(),
  ],
};
