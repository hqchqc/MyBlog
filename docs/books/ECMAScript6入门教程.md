# ECMAScript 6 入门教程  

> 🎨 原文链接： [ECMAScript 6 入门教程 ](https://es6.ruanyifeng.com/) 这里主要记录阅读的笔记部分！  

## let 和 const 命令

- 不存在变量提升
- 存在暂时性死区
  - typeof 不再是安全的操作符
  - <span style="color: #FFA1A1">有些死区比较隐蔽</span>
  - 本质
- <span style="color: #FFA1A1">不允许重复声明</span>
- 块级作用域
  - 为什么需要块级作用域
    - ~~变量外泄~~  <span style="color: #FFA1A1">内层变量可能会覆盖外层变量</span>
    - 循环内部的变量变为全局
  - 块级作用域中可以声明函数吗
    - 不行 但是浏览器没有遵守 (<span style="color: #FFA1A1">ES5 规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明</span>)
    - es6之后可以
    - 使得IIFE没有必要了
- const 
  - 和let一样 不存在变量提升 存在暂时性死区
  - 声明之后的变量不能改变 内存地址不能改变
  - 指向的地址空间
  - <span style="color: #FFA1A1">不允许重复声明</span>
  - <span style="color: #FFA1A1">拓展： 冻结对象中的所有对象 使得不能被更改 使用Object.freeze方法</span>

- <span style="color: #FFA1A1">ES6声明变量的六种方法</span>
  - <span style="color: #FFA1A1">var let const class import function</span>


- ~~window对象~~  <span style="color: #FFA1A1">顶层对象的属性</span>
  -  <span style="color: #FFA1A1">在浏览器环境中</span>  var声明的变量会自动挂在到window上
  - let 、 const 、<span style="color: #FFA1A1">class</span> 不会， <span style="color: #FFA1A1"> var  和 function 会</span>
  - 每个环境的顶层对象可能是不同的 不一定都是window
    - 为了解决这个问题 es2020 新的提案 globalThis