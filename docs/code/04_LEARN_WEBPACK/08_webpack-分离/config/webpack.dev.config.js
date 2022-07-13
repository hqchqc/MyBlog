const { merge } = require("webpack-merge");

const commonConfig = require("./webpack.common.config");

module.exports = merge(commonConfig, {
  // 设置模式
  // development / production
  mode: "development",
  // watch: true,
  // 设置source-map 建立js映射文件 方便调试代码错误
  devtool: "source-map", // 默认是eval 源代码就是用eval函数执行
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
});
