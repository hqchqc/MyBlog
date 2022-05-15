# 08_webpack 的使用及 ES6 相关

首先我们可以回顾一下，当我们学习了这么多关于前端开发的东西之后，真正使用到项目当中的时候，会带来什么问题，在实际开发过程中，同一个页面可能会由非常多的人共同完成，这时候就会带来一个问题，当我们把每一个人编写的文件汇总到一起的时候，难免会出现这个变量在你这有使用，在我这它也有被使用，那么我们很难确保同一个变量不会被别人所改变的情况出现，这时候，前端模块化的思想逐渐流行起来。
最开始，人们采用的是原始的 JavaScript，用匿名函数和闭包完成一个独立的模块化，这时候问题也随之产生，使用匿名函数和闭包确实能够防止其它开发人员将此变量的值进行改变，但是文件之间的引用就没办法进行了，比如 A 写的文件中想要引用 B 写的文件中的一些方法的时候，就会变得非常麻烦，为了解决这个问题，ES6 中也有相关的方法，我们可以先学习一下，我们来看下面一个例子：

40-1.js 文件

```javascript
// 1. 导出方式一
let name = "beanBag";
let age = 18;
let height = 1.8;

const sum = function (num1, num2) {
  console.log(num1 + num2);
};
sum(10, 20);
export { name, age, height, sum };

// 2. 导出方式二 定义时直接导出
export let names = "hqc";
export let ages = 20;

// 3.导出方式三 导出函数/类
export function lzx() {
  console.log("开心最重要");
}
export class Person {
  run() {
    console.log("开始奔跑了！");
  }
}

// 4.导出方式四 导出后参数不唯一 但是同一个模块中只能有一个
let fruits;
export default fruits = "apple";
```

40-2.js 文件

```javascript
let age = 15;
let weight = 70;

// 导入方式一 基本方式
import { height, sum } from "./40-1.js";
sum(1, 2);
console.log(height);

// 导入方式二 在定义时就导出
import { names } from "./40-1.js";
console.log(names);

// 导入方式三 导入类或函数
import { Person, lzx } from "./40-1.js";
const person = new Person();
person.run();
lzx();

// 导入方式四 导入后可自定义变量名
import a from "./40-1.js";
console.log(a);

// 导入方式五 使用通配符
import * as just from "./40-1.js";
console.log(just.name);
```

html 文件

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script src="./40-1.js" type="module"></script>
    <script src="./40-2.js" type="module"></script>
</body>
</html>
```

首先在引用 script 文件的时候，指明类型为 module 类型，代表它们是一个单独的模块，互不影响，然后用`export`将需要使用到的方法或者变量甚至是类导出，在引用的文件中用`inport`进行导入即可，主要用以上几种方法。
不仅在 ES6 中有模块化的使用，同样的，在 CommonJs 中也有相关模块化的规范，相关案例见代码

info.js 文件

```javascript
function add(num1, num2) {
  console.log(num1 + num2);
}

function Unadd(num1, num2) {
  console.log(num1 - num2);
}

// 1.CommonJs方式导出
module.exports = { add, Unadd };
```

main.js 文件

```javascript
// 使用CommonJs方式导入
const { add, Unadd } = require("./js/info.js");
add(10, 20);
Unadd(20, 10);
```

有了以上的知识，我们就可以学习 webpack 了

---

**webpack**
其本质是**现代的 JS 应用的静态模块化打包工具**，它和 grount/gulp 的差别是，**grount/gulp 更强调的是前端流程的自动化，模块化不是它的核心，恰恰相反的是 webpack 更加强调模块化的开发流程，而文件压缩合并预处理等功能仅仅使它附带的功能而已**

**1. webpack 的起步**
由于 webpack 依赖于 node 的相关环境，所以在安装 webpack 前应该先安装 node，
这里我是用的**10.16.2**版本，老师说版本应该大于 8.9，所以问题不大，webpack 我们使用的是**3.6.0**版本，为之后学习脚手架 2 做一点铺垫，同时和老师使用的同步，首先我们**全局安装**webpack,使用以下命令
`npm install webpack@3.6.0 -g` 至于全局安装和局部安装的区别我在下面会说。

安装好了之后，我们在项目中新建一个 dist 目录用来存放待会儿 webpack 打包好的文件，再新建 src 目录存放编写的 JavaScript 文件,代码如下
main.js

```javascript
// 1.使用CommonJs方式导入
const { add, Unadd } = require("./info.js");
add(10, 20);
Unadd(20, 10);

// 2.使用ES6方式导入
import { chu } from "./math.js";
chu(20, 2);
```

info.js

```javascript
function add(num1, num2) {
  console.log(num1 + num2);
}

function Unadd(num1, num2) {
  console.log(num1 - num2);
}

// 1.CommonJs方式导出
module.exports = { add, Unadd };
```

math.js

```javascript
function chu(num1, num2) {
  console.log(num1 / num2);
}
// 2.使用ES6语法导出
export { chu };
```

在 JS 文件中，采用 CommonJs 或者是 es6 的语法都行，这时候轮到 webpack 出场了，在以往没有 webpack 中我们需要将每一个文件都进行引入才行，但是有了 webpack 我们就可以将其打包好的一个文件引入即可，在项目的终端中，输入命令`webpack ./src/main.js ./dist/bundle.js`,这时候我们就会发现在 dist 目录下，多了一个 bundle.js 文件，webpack 之后跟着的是**你将导出的变量或者方法等等导入到的那个文件**，千万不要错了嗷！这样就完成了我们对于 webpack 一个初步的了解。

**2. webpack 的配置**
在以上的操作中我们发现，在终端中输入的命令太过于长了，有没有可以实现自动的找到相应目录呢，这时候我们就需要来了解 webpack 的一个配置了，在文件中新建`webpack.config.js`文件名不能输错，在文件中我们需要指明文件的入口和出口，也就是你将什么文件交给 webpack 和 webpack 将处理过后的文件放到哪里去，代码如下

```javascript
const path = require("path");
module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
};
```

这里的出口需要我们指明的是一个对象类型，第一个 path 需要跟的是绝对路径，我们采用 node 中的 path 模块提供的相关方法，第一个参数就是当前文件所在的目录，第二个参数指文件名，在这之前我们要将 node 中的 npm 初始化一下，因为我们用到了这个 path 模块，使用命令`npm init`这里有一些参数需要填一下，都挺简单的，看着填就行，入口现在可以随便填一个，这里用不到，这时候会自动生成`package.json`文件，这个时候，我们就可以采用 webpack 的命令直接将我们的文件进行打包，是不是方便多了！
这里我们采用的 webpack 命令虽然说很简便，但是有的时候，这个命令会特别长，所以我们应该再将这个命令映射一下，找到`package.json`文件中的`script`属性，默认有一个 test，它指的是当我们输入`npm run test`的时候，它会自动执行 test 后面跟着的命令，同样的，我们在它下面加一行`"build": "webpack"`，这时候，我们只要输入`npm run build`就可以使其运行 webpack 命令了，这里在后期中是比较方便的。
这时候，我们想象另外一个场景，就是当我们在公司中所采用的 webpack 的版本是 4.0 的时候，假如你在家里 clone 项目到本地之后，这时候你的电脑采用的是 3.0 版本的 webpack，**那么当我们在终端中输入命令的时候，它采用的是全局安装的 webpack 版本**，不论你项目中的 webpack 是多少版本的，都是先去全局中找你的 webpack，这时候就会有问题出现，那么怎么避免呢，这里面，有一个地方是优先在本地中搜索是否有 webpack 版本，**那就是刚才配置映射关系的 scripts，当我们在中做好映射之后，它会优先观察项目中是否有 webpack 版本，没有再去搜索全局**，这就是全局安装和局部安装的区别，所以这里更推荐局部安装，这里采用命令`npm install webpack@3.6.0 --save-dev`这里的 dev 指的是`devDependencies`开发时依赖，即只是在开发的时候用到，运行的时候就不需要了，类似于工具人吧！

**3 webpack 中的 loader**
实际项目中，肯定不止是 JavaScript 文件需要打包，我们的 css 文件也是需要打包或转化的，这里就提出了 loader，当然，对于 webpack 本身的能力来说，这些转化是不支持的，所以我们必须为他扩充一些东西即 loader,那么怎么使 css 文件和需要转换的 JavaScript 文件进行联系呢，这时候，我们只需要在你需要转换的 JavaScript 文件中引入此 css 文件即可，例如`require('./css/nomal.css');`，然后在中断中输入命令安装 loader,这里我们需要安装两个文件，**一个是用来解析 css 代码的 css-loader,另一个是用来将导出的 css 代码作为样式添加到 DOM 中的 style-loader**，分别使用命令`npm install --save-dev css-loader `和`npm install style-loader --save-dev`,安装完成之后，还需要在 webpack.config.json 文件中进行如下 module 中的配置

```javascript
const path = require("path");
module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
```

其中 use 数组中的顺序不能错了，否则也会出问题，应该是样式在前，解析在后，为什么呢?因为**使用多个 loader 时，webpack 是从右向左解析的**。
