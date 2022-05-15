# 11_webpack 中 VueCLI3 的创建及 ES6 相关

## 一. runtime-compiler 和 runtime-only 的区别

​ 在安装 CLI2 的版本的时候，我们同时安装了一个选择 runtime-compiler 另一个选择 runtime-only 的版本，我们现在来对比一下它们的区别

​ runtime-compiler 版本：

```javascript
import Vue from "Vue";
import App from "./App";

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  template: "<App/>",
  components: {
    APP,
  },
});
```

​ runtime-only 版本：

```javascript
import Vue from "Vue";
import App from "./App";

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  render: (h) => h(App),
});
```

​ 我们发现在 main.js 文件中两者在创建 Vue 实例的属性和参数是不一样的，下面我们可以来分析一下两者的不同，实际上，在 runtime-compiler 版本中 Vue 内部的处理过程是这样的：

1. **Vue 将 template 中的各个元素解析成 AST(Absoult Syntax Tree)抽象语法树；**
2. **抽象语法树被编译成 render 函数；**
3. **render 函数被渲染成 virtual dom 虚拟 dom 元素；**
4. **浏览器将虚拟 dom 元素展示在界面上；**

​ 而我们的 runtime-only 版本会省略第一、二步，直接通过 render 函数渲染成虚拟 dom，并展示在界面上，由此我们可以发现，runtime-only 版本的性能较高，代码量也较少，所以在选择的时候它会提示我们选择 runtime-only 版本的文件会少 6kb。

​ 以上的 h 函数实际上就类似于 createElement 函数，它有两种用法：

1. `createElement('标签名',{标签的类型},[标签的值])`例如：

   ```javascript
   render : function (createElement){
      return createElement('h2',{class:'box'},['hello']);
   }
   ```

2. `createElement(组件的名称)`例如：

   ```javascript
   render : function (createElement){
      return createElement(App);
   }
   ```

​ 在项目运行时，runtime-only 版本中会将 template 预编译成 JavaScript，一旦打包时，已经是编译完成的版本，浏览器不用做编译的步骤；runtime-compiler 版本中并不是在打包时进行编译的，而是在客户端使用其自带的 compiler 进行编译。

那么，runtime-compiler 版本中的.**vue 文件中的 template 是由谁处理的呢**？

实际上是由 **vue-template-compiler** 处理的。**所以现在当我们了解了它们的区别后，会发现选择 runtime-only 更加合理。**

## 二. VueCLI3 的创建及使用

- 安装命令：`vue create my-project`

- 配置：脚手架 3 的配置相较于脚手架 2 来说更加简洁一些，我们在选择安装的其他插件的时候勾选一个 Babel 即可；

- 与 CLI2 有哪些改变？

  1. vue-cli3 是基于 webpack4 打造，vue-cli2 还是 webpack3;
  2. vue-cli3 的设计原则是“0 配置”，移除了配置文件根目录下的 build 和 config 等目录；
  3. vue-cli3 提供了 vue ui 命令，提供了可视化的配置，更加人性化；
  4. vue-cli3 移除了 static 文件夹，新增 public 文件夹，并且 index.html 移动到 public 中。

- 配置文件的查看与修改：

  方法一：通过命令 `vue ui` 通过可视化界面来修改配置文件；

  ​ 方法二：在 node_modeules/@vue/cli-service/webpack.config.js;

  ​ 方法三：在自己项目的根目录下，创建 vue.config.js 文件，添加自己的配置即可。

## 三. ES6 语法相关

​ **1. 箭头函数的使用和 this 的指向**

​ 使用就不赘述了，注意一下，没有参数的时候不用写（），没有返回值的时候不用 { }即可

​ 这里讲一下箭头函数中 this 的指向，**箭头函数中的 this 引用的就是最近作用域中的 this**，见以下 案例：

```javascript
<script>
    const obj = {
        aaa() {
            setTimeout(function () {
                setTimeout(function () {
                    console.log(this);
                })

                setTimeout(() => {
                    console.log(this);
                })
            })

            setTimeout(() => {
                setTimeout(function () {
                    console.log(this);
                });
            })

            setTimeout(() => {
                console.log(this);
            });
        }
    }
obj.aaa();
</script>
```

这里前三个的 this 指向的都是 window，最后一个 this 指向的是 obj 对象，**当我们使用 funciton 时，内部自动会传入 window 对象，所以不论怎么变化，funciton 中的 this 指向的都是 window**，**而箭头函数的 this 就会往他上一级找，直到找到有 this 的定义，类似于冒泡出去**。

​ **2.作用域的问题**

​ **在 ES5 之前只有函数有作用域的概念，而 for 循环和 if 都没有块级作用域**，到 ES6 之后，使用 let 就 会有块级作用域，所以在 ES6 中我们优先使用 const，只有需要改变某一个标识符的时候才使用 let。

​ **3.高阶函数**

​ **1.filter**:对数据进行过滤，filter 中的回调函数必须返回一个布尔值

​ true:函数内部会自动将这次回调的 n 创建一个新的数组；

​ false:函数内部会自动过滤掉这次的 n

​ **2. map:** 对数据进行相关处理

​ **3.reduce**：对数组中的数据进行汇总，详情见下面的一个例子：

​ 例子中要求先将小于 100 的数筛选出，再对小于 100 的数乘以 2，最后将乘以 2 的数字相加

```javascript
<script>
    const array = [10,20,30,50,111,20,30,555,666,20];
// --------------写法一--------------------------
// // 1. filter的使用 必须返回的布尔值
// //    若返回true 函数内部会自动将这次回调的数据创建一个新的数组并保存
// //    若返回false 函数内部会过滤掉这次的数据
// let array2=array.filter(function(n){
//     return n<100;
// });
// console.log(array2);

// //2. map的使用 对数据进行相关处理
// let array3 = array2.map(function(n){
//     return n*2;
//     //return 100;
// });
// console.log(array3);

// //3.reduce的使用 对数据进行汇总
// //array3=[20,40,60,100,40,60,40]
// //第一次： pre:0  n:20
// //第二次： pre:20 n:40
// //第三次:  pre:60 n:60   ......
// let total = array3.reduce(function(previous,n){
//     return n+previous;
// },0);
// console.log(total);

// --------------写法二--------------------------
// let total = array.filter(function(n){
//     return n<100;
// }).map(function(n){
//     return n*2;
// }).reduce(function(pre,n){
//     return pre+n;
// },0);
// console.log(total);

// --------------写法三--------------------------
let total = array.filter(n => n<100).map(n => n*2).reduce((pre,n) => pre+n);
console.log(total);

</script>
```
