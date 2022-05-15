# 06\_实现 apply、call 及 bind

> 这里实现是练习函数、this、调用函数，不会过度考虑一些边界情况，当然这里我会参考一下社区里的写法，尽量做到准确

## 1. call 函数的实现

首先我们得先看一下 call 函数是如何调用的，再逆向去实现我们自己的 call 函数：

```javascript
function foo() {
  console.log(this);
}

foo.call("abc");
```

现在就开始实现自己的 call 函数吧, 具体思路：

1. 因为是需要所有函数都默认可以使用的方法，所以需要在函数的原型上去定义我们的 call 方法；
2. 边界判断，需要是函数类型才能调用我们的方法
3. 用一个变量 fn 保存是谁调用了我们的方法
   1. 例如 `foo._call('abc')` 这里就是 foo 函数去调用我们的方法
   2. 我们用一个变量保存 foo 函数，那么怎么拿到呢？ —— this
   3. 有了前几节的知识我们知道在我们自己实现的函数内部现在的 this 指向的其实就是我们的 foo 函数了(隐式绑定)
4. 要注意如果传入的是数字或是字符串类型的话 绑定的是 Number 或是 String,这里就需要用 Object 去隐式转换一下
   1. 如果是 null 或 undefined 时，默认指向 window
5. 要在我们指定需要绑定的 this 上执行这个函数
   1. 先在要绑定的 this 对象上面指定一个 fn 变量，值为 fn
   2. 用一个 result 变量去接收调用这个方法的返回值，要注意有参数的情况
   3. 这里使用 rest 参数的办法，用展开用算符传入函数进行执行，这里处理的方式有很多。可以直接在函数内遍历我们的 arguments 变量，但是 ES6 之后就不太推荐了
6. 删除刚才在对象上新增的变量，并将函数的返回值返回

```javascript
// 1. 在函数的原型上去定义我们的call方法
Function.prototype._call = function (context, ...args) {
  if (typeof this !== "function") {
    return;
  }

  var fn = null,
    result = null;

  // 2. 获取到是谁去调用了我们的call方法 拿到调用此方法的函数
  fn = this;
  // 3. 判断需要将此函数绑定到哪里 如果是 null / undefiend 时(注意为0和空字符串的情况) 绑定到window
  context =
    context === null || context === undefined ? window : Object(context);
  // 4. 执行调用此方法的函数 不能直接 fn() 这样就变成独立函数调用了 要用显示指定的this调用
  context.fn = fn;
  result = context.fn(...args);
  delete context.fn;
  return result;
};
```

## 2. apply 函数的实现

实现思路：

1. 在函数原型上定义\_apply 函数
2. 边界处理，调用此函数的类型必须是函数类型
3. 用一个变量保存调用\_apply 函数的函数
4. 判断显示绑定的 this 对象 context 是否为 null 或 undefined,如果是默认给 window
5. 需要在显示指定的 this 对象上执行函数(这里要注意参数的问题)
   1. 这里我们的形参定义并不是 ...args， 所以有可能 args 为空，这时候在我们使用`context.fn(...args)`的时候，由于 args 为 undefined，所以这里会报错，args 并不是可以迭代的对象
   2. 要判断 args 是否有值，没有值的话默认传入空数组
6. 删除在 context 上新加入的 fn 对象，并将函数的返回值返回

```javascript
Function.prototype._apply = function (context, args) {
  if (typeof this !== "function") return;

  var fn = null,
    result = null;

  fn = this;

  context =
    context === null || context === undefined ? window : Object(context);

  context.fn = fn;

  args = args || [];

  var result = context.fn(...args);
  delete context.fn;
  return result;
};
```

## 3. bind 函数的实现

实现思路：

1. 在函数原型上定义\_bind 函数
2. 判断边界情况
3. 定义变量绑定谁调用的\_bind 函数
4. 注意一下由于 bind 函数返回的是一个函数，所以这里我们定义一个 proxyFn 函数作为返回值
5. 有时候我们会类似这样使用 bind 函数
   1. `foo.bind('abc',1,2)(3)`所以这里需要将函数执行的变量做一个拼接
   2. 调用此函数保存返回值，并将创建的 fn 删除
6. 返回 proxyFn 函数

```javascript
Function.prototype._bind = function (context, ...args) {
  if (typeof this !== "function") return;

  var fn = this;

  context =
    context === null || context === undefined ? window : Object(context);

  function proxyFn(...rest) {
    context.fn = fn;
    var params = [...args, ...rest];
    var result = context.fn(...params);
    delete context.fn;
    return result;
  }

  return proxyFn;
};
```

## 4. 认识 arguments

arguments 是一个 对应于**传递给函数的参数**的**类数组(array-like)对象**

array-like 意味着它不是一个数组类型，而是一个对象类型：

- 但是它却拥有数组的一些特性，比如说 length、比如可以通过 index 索引来访问
- 但是它却没有数组的一些方法，比如 forEach、map 等
- arguments 也是存在 AO 对象中的

### 常见的对 arguments 的操作

1. 获取参数的长度
2. 根据索引值获取某一个参数
3. callee 获取当前 arguments 所在的函数

```javascript
function baz() {
  console.log(arguments.callee);
}

baz();
/**
  ƒ baz() {
    console.log(arguments.callee);
  }
*/
```

### 将 arguments 转为 array

一共有如下几种方法，要注意不可以直接`new Array(arguments)` 这里传入的应该是数组的长度

```javascript
function transformArray(num1, num2) {
  // 1. 基本遍历
  var newArr = [];
  for (var i = 0; i < arguments.length; i++) {
    newArr.push(arguments[i]);
  }
  console.log(newArr);

  // 2. 原型
  var newArr2 = Array.prototype.slice.call(arguments);
  console.log(newArr2);

  // 3. 展开运算符
  var newArr3 = [...arguments];
  console.log(newArr3);

  // 4. Array.from
  var newArr4 = Array.from(arguments);
  console.log(newArr4);

  // return newArr;
}
```

### 箭头函数中没有 arguments

- 箭头函数中是没有 arguments 的，但是会去上层作用域中查找
- 在全局环境下浏览器中是没有 arguments 的，但是在 node 环境中是有的
  - 因为在 node 中，它是将我们的文件会被当成一个模块，这些模块会被包裹在一个函数里面，并且通过 call 进行绑定
  - 所以 node 里面的 arguments 其实就是我们的一个个文件

```javascript
function foo() {
  var bar = () => {
    console.log(arguments);
  };
  return bar;
}

var fn = foo(1, 2, 3);
fn(); // Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
```
