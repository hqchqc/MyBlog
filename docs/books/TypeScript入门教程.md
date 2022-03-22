# TypeScript入门教程

> 🎨 原文链接： [TypeScript入门教程](https://ts.xcatliu.com/) 这里主要记录阅读的笔记部分！

## 简介
### 什么是TypeScript

> Typed JavaScript at Any Scale.   
> 添加了**类型系统**的 JavaScript，适用于**任何规模**的项目。

#### TypeScript的特性  
##### 类型系统
从 TypeScript 的名字就可以看出来，「类型」是其最核心的特性。  

我们知道，JavaScript 是一门非常灵活的编程语言：  
- 它没有类型约束，一个变量可能初始化时是字符串，过一会儿又被赋值为数字。
- 由于隐式类型转换的存在，有的变量的类型很难在运行前就确定。
- 基于原型的面向对象编程，使得原型上的属性或方法可以在运行时被修改。
- 函数是 JavaScript 中的一等公民，可以赋值给变量，也可以当作参数或返回值。  

这种灵活性就像一把双刃剑，一方面使得 JavaScript 蓬勃发展，无所不能，从 2013 年开始就一直蝉联最普遍使用的编程语言排行榜冠军；另一方面也使得它的代码质量参差不齐，维护成本高，运行时错误多。

而 TypeScript 的类型系统，在很大程度上弥补了 JavaScript 的缺点。  

###### TypeScript是静态类型  
类型系统按照「类型检查的时机」来分类，可以分为**动态类型**和**静态类型**。

动态类型是指在运行时才会进行类型检查，这种语言的类型错误往往会导致运行时错误。JavaScript 是一门解释型语言，没有编译阶段，所以它是动态类型。  

静态类型是指编译阶段就能确定每个变量的类型，这种语言的类型错误往往会导致语法错误。TypeScript 在运行前需要先编译为 JavaScript，而在编译阶段就会进行类型检查，所以 TypeScript 是静态类型  

###### TypeScript是弱类型  
类型系统按照「是否允许隐式类型转换」来分类，可以分为**强类型**和**弱类型**。  

>强/弱是相对的，Python 在处理整型和浮点型相加时，会将整型隐式转换为浮点型，但是这并不影响 Python 是强类型的结论，因为大部分情况下 Python 并不会进行隐式类型转换。相比而言，JavaScript 和 TypeScript 中不管加号两侧是什么类型，都可以通过隐式类型转换计算出一个结果——而不是报错——所以 JavaScript 和 TypeScript 都是弱类型。

##### 适用于任何规模
TypeScript可以适用任何规模的项目，而且是渐进式的！

##### 与标准同步发展  
TypeScript 的另一个重要的特性就是坚持与 ECMAScript 标准同步发展。 

#### 总结  
什么是 TypeScript？  

- TypeScript 是添加了类型系统的 JavaScript，适用于任何规模的项目。
- TypeScript 是一门静态类型、弱类型的语言。
- TypeScript 是完全兼容 JavaScript 的，它不会修改 JavaScript 运行时的特性。
- TypeScript 可以编译为 JavaScript，然后运行在浏览器、Node.js 等任何能运行 JavaScript 的环境中。
- TypeScript 拥有很多编译选项，类型检查的严格程度由你决定。
- TypeScript 可以和 JavaScript 共存，这意味着 JavaScript 项目能够渐进式的迁移到 TypeScript。
- TypeScript 增强了编辑器（IDE）的功能，提供了代码补全、接口提示、跳转到定义、代码重构等能力。
- TypeScript 拥有活跃的社区，大多数常用的第三方库都提供了类型声明。
- TypeScript 与标准同步发展，符合最新的 ECMAScript 标准（stage 3）。

### Hello TypeScript
任何语言都逃不出被Hello Word支配的命运!  

首先创建一个``hello.ts``文件，编写以下代码  

```typescript
function sayHello(person: string) {
    return 'Hello, ' + person;
}

let user = 'Tom';
console.log(sayHello(user));
```

然后执行 ``tsc hello.ts``   
这时候会生成一个编译好的文件 ``hello.js`` ：

```javascript
function sayHello(person) {
    return 'Hello, ' + person;
}
var user = 'Tom';
console.log(sayHello(user));
```  

**TypeScript 只会在编译时对类型进行静态检查，如果发现有错误，编译的时候就会报错**。而在运行时，与普通的 JavaScript 文件一样，不会对类型进行检查  
**TypeScript 编译的时候即使报错了，还是会生成编译结果**，我们仍然可以使用这个编译之后的文件。  

## 基础
### 原始数据类型