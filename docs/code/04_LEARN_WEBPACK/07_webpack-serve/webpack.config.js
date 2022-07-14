const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader/dist/index");

module.exports = {
  target: "web", // 为了热替换配置的 不配置有一点问题
  // 设置模式
  // development / production
  mode: "development",
  // watch: true,
  // 设置source-map 建立js映射文件 方便调试代码错误
  devtool: "source-map", // 默认是eval 源代码就是用eval函数执行
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "./build"), // 绝对路径
    filename: "js/bundle.js",
  },
  devServer: {
    static: "./public", // 如果index中有文件没加载到就回去这里的文件夹下查找
    hot: true, // 开启热更新
    // host: "0.0.0.0", // 使用0.0.0.0时 局域网内都可以访问
    port: 7777,
    open: true, // 自动打开浏览器
    compress: true, // 使用gzip开启压缩
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        pathRewrite: {
          "^/api": "",
        },
        secure: false, // 默认为true 如果希望支持https 可以设置为true
        changeOrigin: true, // 使用target代替headers里面原本的主机地址
      },
    },
  },
  resolve: {
    extensions: [".js", ".json", ".vue"], // 默认值 所以导入的时候有些文件不用加后缀
    // mainFields: ["index"], // 如果导入的是文件夹 根据extensions中的值 默认去找index.js
    alias: {
      js: path.resolve(__dirname, "./src/js"),
      "@": path.resolve(__dirname, "./src"),
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
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      title: "这是一个标题好强👌",
    }),
    new DefinePlugin({
      BASE_TEXT: "'好厉害呀'",
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: "public",
    //       to: "./",
    //       globOptions: {
    //         ignore: ["**/index.html"],
    //       },
    //     },
    //   ],
    // }),
    new VueLoaderPlugin(),
  ],
};
