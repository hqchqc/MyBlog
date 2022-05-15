# 09_webpack 中的 loader、配置 vue 及插件使用

## **- webpack 中的 loader**

昨天我们学习了 webpack 中的 css-loader 和 style-loader，今天我们来学习剩下常用的几个 loader

**1. less-loader**
顾名思义，这个 loader 模块是用来加载 less 文件的，安装命令为`npm install --save-dev less-loader less` 前一个 less-loader 是用来加载 less 文件，后一个 less 是为加载 less 提供的支持文件，用来转化 less 成 css，安装完成后进行相应的配置即可，配置在 webpack 中的 loader 里都有，不过这里我还是贴一下好了

```javascript
{
  test: /\.less$/,
  use: [{
      loader: "style-loader" // creates style nodes from JS strings
  }, {
      loader: "css-loader" // translates CSS into CommonJS
  }, {
      loader: "less-loader" // compiles Less to CSS
  }]
},
```

**2. url-loader 和 file-loader**
less 文件处理完了之后，还有图片文件要处理，这时候轮到我们的 url-loader 出场了，安装命令为`npm install --save-dev url-loader`，安装完成后，进入配置，代码如下

```javascript
{
 test: /\.(png|jpg|gif)$/,
 use: [
   {
     loader: 'url-loader',
     options: {
       // 当加载的图片大小小于limit时，他会将图片编译成base64字符串形式 不需要单独的文件来存储
       // 当加载的图片大小大于limit时，使用file-loader模块进行加载 会单独打包成另一个文件
       // 这个值默认是8k
       limit: 8192,
       name: 'img/[name][hash:8].[ext]'
     }
   }
 ]
},
```

我们注意到，这里面有一个 limit 属性，后面跟着的是默认值 8192，也就是 8k，这里我直接说一下他的作用好了

1. 当我们的图片文件小于这个 limit 值，这时候，图片会被编译成 base64 的字符串形式，不会生成新文件，这时候正常打包文件即可，页面也能正常显示；
2. 当我们的图片文件大于这个 limit 值，这时候，我们将文件打包时就会报错，并且要求我们安装**file-loader**，安装命令为`npm install --save-dev file-loader`,这个模块不需要另外进行配置，安装完成即可，这个时候我们就可以尝试着重新打包文件，发现并没有报错，但是当我们在浏览器打开它时，发现图片并不能显示，并且控制台显示找不到此文件，文件的路径为网站的根目录，并且在 dist 目录(存放打包完成后的目录)下，发现生成了一个新的图片文件，文件名为 hash 类型的，目的是防止重复，所以我们需要在 webpack.config.js 文件中添加**publicPath**的一个配置，目的是将路径前加入 dist/这个路径，使得其能够找到此图片，具体的配置如下

```javascript
output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js',
        // 涉及到路径 他都会在前面加一个dist 最后就不需要了
        publicPath: 'dist/'
    },
```

当然在我们后期进行开发的时候，由于 index 文件都要统一放置在 dist 目录下，所以就不存在找不到路径这一说了，到时候删去即可。
这时我们发现文件的名字很乱，这样就会导致我们一时间分不清是什么文件，所以我们还需要在 limit 下添加一个 name 属性，如上面的代码所示，这样当图片文件大于 limit 值时，会自动将生成的新文件在我们的 name 配置下的路径，并且我们还能指明它的文件名称，这样就方便辨认了。

**3.babel-loader**
当我们在查看打包完成的 bundle.js 文件时，我们发现其中还是有 ES6 的语法，这就意味着在不支持 ES6 的浏览器中，我们的代码是没有办法运行的，此时就需要我们采用 babel-loader 的模块帮助我们将 ES6 的语法转换成 ES5。安装命令为：`npm install babel-loader@7 babel-core babel-preset-es2015`，官网上说的命令为`npm install babel-loader@8.0.0-beta.0 @babel/core @babel/preset-env webpack`或`npm install babel-loader babel-core babel-preset-env webpack`,我们这里为了将 babel-loader 的版本和我们的 webpack 版本一致，采用 7 的版本，然后这个 babel-loader 还需要一些核心的东西就是后面跟着的 babel-core，再后面的 babel-preset-env 是一些配置的东西，如果是 typescript 的转换则采用不同的配置文件，然后官网后面还跟着 webpack 这里我们已经有了就不需要了，安装完成之后，还要进行配置，代码如下：

```javascript
{
  test: /\.js$/,
   exclude: /(node_modules|bower_components)/,
   use: {
     loader: 'babel-loader',
     options: {
       presets: ['es2015']
     }
   }
 }
```

这时候我们再进行打包的时候 bundle.js 文件中就不会再有 ES6 相关的语法了。

---

## **- webpack 中配置 vue**

接下来我们就可以在 webpack 中配置我们的 vue 环境了，当然我们首先也要安装有关 vue 的相应的包及相应的 loader，安装命令为`npm install vue --save`和`npm install vue-loader vue-template-compiler --save-dev`(执行完后需要修改 package.json 文件中`"vue-loader": "^13.0.0",`因为 14.0 以上版本需要安装其它插件)，我们也注意到前一个命令没有加--dev 说明它在运行时也是需要我们的 vue 的，然后我们就可以重新打包文件了，在浏览器中打开文件，我们发现文件并不能运行，并且在控制台报错了，控制台显示我们正在使用的是 tuntime-only 版本，让我们使用 runtime-compiler 版本，实**际上 vue 在构建的时候，构建了以上两个版本，如果我们使用第一个版本，这就代表代码中不能有任何 template，这个版本就没有关于编译 template 的文件，只有使用 runtime-compiler 版本，才能编译 template 代码**，那们怎么使用第二个版本呢，这时候就需要相应的配置了，代码如下：

```javascript
resolve:{
 // 导入的时候省略后缀
 //extensions:['.js','.css','.vue'],
 // 别名
 alias:{
   'vue$': 'vue/dist/vue.esm.js'
 }
}
```

完成以上配置后，我们再次打包文件就不会出现以上的情况了，然后就是 Vue 相关的编写了，这里我就不说明怎么一步步抽取出来了，直接上代码吧，首先在 src 中新建 Vue 文件夹，创建两个 vue 文件 Cpn.vue 和 Tpl.vue

Cpn.vue 代码如下：

```javascript
<template>
    <div>
        <p>我是Cpn组件</p>
        <p>大家好啊，初次见面嗷</p>
        <button @click="hello">我是Cpn组件的按钮</button>
    </div>
</template>

<script>
export default {
    methods: {
        hello(){
            alert('hello');
        }
    },
}
</script>

<style>

</style>
```

Tpl.vue

```javascript
<template>
   <div>
        <h1 class="yes">{{message}}</h1>
        <h1>{{date}}</h1>
        <Cpn/>
    </div>
</template>

<script>
    import Cpn from './Cpn.vue';

export default {
    data(){
        return {
            message: 'webpack',
            date: '2020-02-13'
        }
    },
    components:{
        Cpn
    }
}
</script>

<style>
    .yes{
        color:aqua
    }
</style>
```

main.js 代码(主要看最后关于 Vue 的部分即可)

```javascript
// 1.使用CommonJs方式导入
const { add, Unadd } = require("./js/info.js");
add(10, 20);
Unadd(20, 10);

// 2.使用ES6方式导入
import { chu } from "./js/math.js";
chu(20, 2);

// 导入css文件
require("./css/nomal.css");

//导入less文件
require("./css/special.less");
document.writeln("<h1>hello beanBag</h1>");

// 导入vue文件
import Vue from "vue";
// import Tpl from './vue/Tpl'
import Tpl from "./vue/Tpl.vue";

new Vue({
  el: "#container",
  template: "<Tpl/>",
  components: {
    Tpl,
  },
});
```

在加载.vue 文件时还需要进行如下配置：

```javascript
{
  test: /\.vue$/,
  use:['vue-loader']
}
```

这里有一细节问题，就是在导入的时候如果你不想写文件后缀的话，可以添加下面这行配置：

```javascript
resolve:{
      // 导入的时候省略后缀
      extensions:['.js','.css','.vue'],
      // 别名
      alias:{
        'vue$': 'vue/dist/vue.esm.js'
      }
    }
```

## **- webpack 中 Plugin 的使用**

**plugin 是插件的意思，它是对 webpack 本身的一种拓展，是一个扩展器，而 loader 是用于转换某些类型的模块，是一个转换器**。

今天只学习了一种插件，**BannerPlugin**用于添加版权信息
首先应该在 webpack.config.js 文件中引入 webpack 模块，并在 plugin 属性中做相应的设置，webpack.config.js 文件完整代码如下：

```javascript
const path = require("path");
const webpack = require("webpack");
module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    // 涉及到路径 他都会在前面加一个dist 最后就不需要了
    publicPath: "dist/",
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
  plugins: [new webpack.BannerPlugin("最终版权归beanBag所有")],
};
```

这里注意最后一行即可，这时候当我们重新打包文件的时候，在你打包好的文件的第一行就会出现你在 BannerPlugin 里写的那行话。
