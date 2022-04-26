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
    - ~~变量外泄~~ <span style="color: #FFA1A1">内层变量可能会覆盖外层变量</span>
    - 循环内部的变量变为全局
  - 块级作用域中可以声明函数吗
    - 不行 但是浏览器没有遵守 (<span style="color: #FFA1A1">ES5 规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明</span>)
    - es6 之后可以
    - 使得 IIFE 没有必要了
- const

  - 和 let 一样 不存在变量提升 存在暂时性死区
  - 声明之后的变量不能改变 内存地址不能改变
  - 指向的地址空间
  - <span style="color: #FFA1A1">不允许重复声明</span>
  - <span style="color: #FFA1A1">拓展： 冻结对象中的所有对象 使得不能被更改 使用 Object.freeze 方法</span>

- <span style="color: #FFA1A1">ES6 声明变量的六种方法</span>

  - <span style="color: #FFA1A1">var let const class import function</span>

- ~~window 对象~~ <span style="color: #FFA1A1">顶层对象的属性</span>
  - <span style="color: #FFA1A1">在浏览器环境中</span> var 声明的变量会自动挂在到 window 上
  - let 、 const 、<span style="color: #FFA1A1">class</span> 不会， <span style="color: #FFA1A1"> var 和 function 会</span>
  - 每个环境的顶层对象可能是不同的 不一定都是 window
    - 为了解决这个问题 es2020 新的提案 globalThis

## 变量的解构赋值

- 数组的解构赋值

  - 解构失败
  - 不完全解构
  - 等号右边 === undefined 时才会触发默认值
  - 等号右边具有 Iterator 接口才能进行解构
  - 解构是惰性的，如果默认值为一个函数，如果等号右边有对应的值，则函数不会执行
  - <span style="color: #FFA1A1">解构不成功值为 undefined</span>

- 对象的解构赋值

  - 注意模式和变量的区别，模式不会被解构
  - 也是严格等于 undefined 才能被解构

- boolean 和 ~~string~~ <span style="color: #FFA1A1"> number </span> 类型的解构会先将其转化为对象类型

- <span style="color: #FFA1A1">字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。</span>

- <span style="color: #FFA1A1">遍历 Map 结构 for of 循环 [ ,value]</span>

## 字符串的扩展

> 这节主要是关于模板字符串的 平时比较少遇到

- 字符串添加了 Iterator 接口 使得可以使用 for of 循环
  - 有一些特殊字符使用传统的 for 循环会输出两个未知字符 使用 for of 可以正确输出一个字符
