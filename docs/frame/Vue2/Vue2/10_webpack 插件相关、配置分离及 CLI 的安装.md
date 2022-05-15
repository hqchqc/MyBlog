# 10_webpack 插件相关、配置分离及 CLI 的安装

### 1.webpack 插件相关

- **HtmlWebpackPlugin**

  作用：自动生成一个 index.html 文件(可以指定模板来生成)

  安装：`npm install html-webpack-plugin --save-dev`

  配置：下载完成之后，同样需要在 webpack.config.js 文件中进行引入，并且在 plugins 中进行相应的配置，`const HtmlWebpackPlugin = require('html-webpack-plugin');`

  ```javascript
  new HtmlWebpackPlugin({
    template: "index.html",
  });
  ```

  template 的作用是指明它的模板，模板中的 script 标签可以省略，因为此插件会自动将用到的 script 进行引入，之后我们重新打包文件后就会自动在 dist 目录中生成一个新的 index 文件。**注：这里要把之前的 publicPath 注释掉，因为 bundle.js 文件已经和 index 文件在同一级目录下了**

- **UglifyjsWebpackPlugin**

  作用：对打包的 js 文件进行压缩

  安装：`npm install uglifyjs-webpack-plugin@1.1.1 --save-dev`

  配置：下载完成后，需要在 webpack.config.js 文件中进行引入，并且在 plugins 中进行相应的配置，`**const** UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');`

  ```javascript
  plugins:[
      new UglifyjsWebpackPlugin()
  ],
  ```

  配置后，重新打包文件我们就会发现 js 文件已经删去空格以及我们之前用 BannerPlugin 生成的版权说明，所以**此插件最好不要和 BannerPlugin 一起使用**

- **WebpackDevServer**

  作用：搭建本地服务器，能够自动监听代码是否有改变，并实时地在界面上进行渲染，就不用我们每一次都对文件进行打包了

  原理：它是基于 node.js 的，内部使用的是 node 中的 express 框架，当它监听到有改变的时候，就会重新进行编译，将编译后的代码放在内存中让我们进行测试，最终只需要执行一次对文件的打包即可

  安装：`npm install --save-dev webpack-dev-server@2.9.3`

  配置：下载完成后，需要在 webpack.config.js 文件中进行相应的配置

  ```javascript
  devServer:{
      contentBase:'./dist',	//指明服务于哪一个文件夹
      inline:true			   //是否需要实时刷新
  }
  ```

  此外还有两个可选参数

  1. port：指明它的端口号，默认是 8080
  2. historyApiFallback：在 SPA(单页面复应用)页面中，依赖 HTML5 的 history 模式

  配置完成后，有两种方式对我们的文件进行实时的刷新

  1. 采用命令`./node_modules/.bin/webpack-dev-server`
  2. 在 package.json 文件的 script 中，添加`"dev": "webpack-dev-server --open"`--open 是用来当输完命令后它会自动打开浏览器，若没有写，则需要我们点击链接进入

  注意：**不能在终端中直接输入命令`webpack-dev-server`因为之前我们说过，在任何的终端中输入的命令都会去全局下找对应的文件，但是我们之前并没有全局安装**。

  ***

### 2.webpack 配置文件的分离

​ 背景：在我们完成上述操作后，我们会发现，在我们的开发模式中，对于`uglifyjs-webpack-plugin`插件的使用其实是用不到的，因为实际开发中，要反复调试我们的 js 代码，故应该省去此插件的使用；同理在我们的运行环境下本地服务器插件也是用不到的，所以将 webpack 配置文件的分离是非常必要的。

​ 思路：我们将开发时用到的一些模块放到 dev-config.js 文件中，将运行时用到的文件放到 prod.config.js 文件中，将一些基本的代码放到 base.config.js 文件中，这样一来一旦我们是在开发环境中，执行开发环境的命令时，就将 dev-config.js 和 base.config.js 文件合并在一起，在运行环境中也是同理，那么什么插件可以**将我们的两个文件进行合并呢，那就是 webpack-merge**

​ 安装：`npm install webpack-merge --save-dev`

​ 配置：新建 build 文件夹，文件夹中存放以上说的三个文件，代码下边我会贴出来，在 dev-config.js 文件和 prod.config.js 文件中需要引入我们安装的 webpack-merge，还是贴代码吧

base.js 文件

```javascript
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "bundle.js",
    // 涉及到路径 他都会在前面加一个dist 最后就不需要了
    // publicPath: 'dist/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader", // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
          },
          {
            loader: "less-loader", // compiles Less to CSS
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              // 当加载的图片大小小于limit时，他会将图片编译成base64字符串形式 不需要单独的文件来存储
              // 当加载的图片大小大于limit时，使用file-loader模块进行加载 会单独打包成另一个文件
              // 这个值默认是8k
              limit: 8192,
              name: "img/[name][hash:8].[ext]",
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["es2015"],
          },
        },
      },
      {
        test: /\.vue$/,
        use: ["vue-loader"],
      },
    ],
  },
  resolve: {
    // 导入的时候省略后缀
    extensions: [".js", ".css", ".vue"],
    // 别名
    alias: {
      vue$: "vue/dist/vue.esm.js",
    },
  },
  plugins: [
    new webpack.BannerPlugin("最终版权归beanBag所有"),
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
  ],
};
```

dev.cofig.js 文件

```javascript
const webpackMerge = require("webpack-merge");
const baseConfig = require("./base.config");

module.exports = webpackMerge(baseConfig, {
  devServer: {
    contentBase: "./dist",
    inline: true,
  },
});
```

prod.config.js 文件

```javascript
const webpackMerge = require("webpack-merge");
const baseConfig = require("./base.config");
const UglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin");

module.exports = webpackMerge(baseConfig, {
  plugins: [new UglifyjsWebpackPlugin()],
});
```

这时候当我们重新打包后，终端也会报错，终端说找不到我们的 webpack.config.js 文件，所以我们要到 package.json 文件的 scripts 中做进一步的配置，代码如下：

```javascript
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config ./build/prod.config.js",
    "dev": "webpack-dev-server --open --config ./build/dev.config.js"
}
```

这时候我们重新打包就不会报错了，但是会出现另外一个问题，就是打包生成的文件跑到了 build 文件夹下，因为 base 文件中指定目录是当前所在的目录，所以我们还需要修改 base 文件里的目录拼接部分`path: path.resolve(__dirname,'../dist'),`这时候再打包就可以了。现在我们就实现了一个简单的配置分离的工作

<hr/>

### 3.vuecli 脚手架相关

背景：从以上 webpack 的配置来看，是不是感到非常的繁琐，事实上，当我们配置大型项目的时候，配置往往更加复杂，所以出现了我们的 cli，也就是现在俗称的脚手架，当然并不是它的全称，而是它能够一次性地搭建出完整的骨架，所以形象地把它称为脚手架

安装：`npm install -g @vue/cli@3.2.1`我们之所以安装 3.2.1 版本而不是最新的版本是为了和老师地保持同步，免得又出岔子，由于后面老师会先讲 vue2 的搭建，所以**这里还需要拉取 cli2.x 的模板，命令为`npm install @vue/cli-init -g`**

介绍：CLI:Command-Line Interface 叫做命令行界面，VueCLI 是官方发布的 vue.js 项目脚手架，使用脚手架可以快速搭建 vue 开发环境以及对应的 webpack 配置，当我们在编写大型项目中，往往需要考虑代码的目录结构、项目结构和部署、热加载以及代码的单元测试，脚手架帮我们考虑到了以上的问题，是一个非常好的工具

使用：接下来我们就创建一个脚手架 2 的项目，脚手架 2 和脚手架 3 在创建项目的时候，命令有点差别<br/>脚手架 2：`vue init webpack my-project`<br>脚手架 3：`vue create my_project`<br>安装过程中需要我们回答一些问题，稍微有一个看不懂的是`Use ESLint to lint your code?`这个指的是代码的规范，我们一般喜欢随心所欲所以回答 No 即可，还有一个单元测试，我们也选择 No 吧，完成后会生成以下图片的一个项目结构
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200214191912314.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzA5Mjky,size_16,color_FFFFFF,t_70)
