# 04\_内存回收和 this 绑定规则

## 闭包内存泄漏测试

有如下代码：

```javascript
function createArray() {
  var createArr = new Array(1024 * 1024).fill(1);

  return function () {
    console.log(createArr.length);
  };
}

var saveFn = [];
for (var i = 0; i < 100; i++) {
  setTimeout(() => {
    saveFn.push(createArray());
  }, i * 100);
}

setTimeout(() => {
  for (var i = 0; i < 100; i++) {
    setTimeout(() => {
      saveFn.pop();
    }, i * 100);
  }
}, 10000);
```

这里注意一下，这里的 JavaScript 会给我们的数组分配多少内存呢？

`4 * 1024 * 1024 = 4k * 1024 = 4M`

这里我们数组中的一项因为是数字类型，占用的是 4 个字节，1024 个字节就是 1K，所以我们这里一个`createArr`数组就会占用 4M 的内存空间；

> 补充：这里在其它地方可能看到是一个数字要占用 8 个字节这样的说法，实际上这样的说法并没有错误，只是在 V8 引擎中，针对一些比较小的数字做了优化，让其只占用 4 个字节，在源码中使用 sim 代表小数字，类似 1 2 3 这样的就只占用 4 个字节。

为了在浏览器中更好的演示出结果，我们这里循环了 100 次，并且每隔 100ms 将创建出来的数组放到一个新的数组中，由于这里循环了 100 次，每次 100ms，在 10 秒中后，会执行下一段代码，将保存在新数组中的`createArr`释放出来，可以看到浏览器中的内存表示如下图：

![内存释放图](https://raw.githubusercontent.com/hqchqc/staticRepo/master/images/20220508203617.png)

可以看到 GC 在回收我们的内存的时候并不是代码中立即释放后 GC 就去清理的，而是有一段延迟的时间的，图中是大概 18 秒左右的时候开始清理的，回收后的内存表现还是非常明显的。

## 闭包中没有使用到的自由变量

有一个细节问题是之前没有关注到的，就是那些没有引用到的自由变量会被单独销毁吗？ 看下面这段代码：

```javascript
function foo() {
  var name = "beanbag";
  var age = 22;

  function bar() {
    console.log(name);
  }

  return bar;
}

var fn = foo();
fn();
```

这段代码想必已经很熟悉了，但是有个问题，闭包中有 name 这个自由变量，但是没有 age 这个变量的使用，那么这个变量应该被销毁吗？

- 在`ECMA`的规范中，它是不会被销毁也没关系的；
- 但是各家浏览器有自己的实现，很明显这个没有使用到的变量没有销毁是很不合理的，所以我们的 V8 引擎是会对这些没有引用到的变量进行销毁的

![没有使用到的变量](https://raw.githubusercontent.com/hqchqc/staticRepo/master/images/20220508205421.png)

## this 的指向

### 为什么需要 this ?

- 在常见的编程语言中，几乎都有 this 这个关键字（Objective-C 中使用的是 self），但是 JavaScript 中的 this 和常见的面向对象语
  言中的 this 不太一样：

  - 常见面向对象的编程语言中，比如 Java、C++、Swift、Dart 等等一系列语言中，this 通常只会出现在类的方法中；
  - 也就是你需要有一个类，类中的方法（特别是实例方法）中，this 代表的是当前调用对象；
  - 但是 JavaScript 中的 this 更加灵活，无论是它出现的位置还是它代表的含义；

- 我们来看一下编写一个 obj 的对象，有 this 和没有 this 的区别

```javascript
// 没有this
var obj = {
  name: "beanbag",
  running: function () {
    console.log(obj.name + "running");
  },
  eating: function () {
    console.log(obj.name + "eating");
  },
  studying: function () {
    console.log(obj.name + "studying");
  },
};

// 存在this
var obj = {
  name: "beanbag",
  running: function () {
    console.log(this.name + "running");
  },
  eating: function () {
    console.log(this.name + "eating");
  },
  studying: function () {
    console.log(this.name + "studying");
  },
};
```

可以看到如果没有 this，加入 obj 对象的名称修改后，需要同步修改对象中其它的引用，非常不利于扩展！

### this 在全局作用域中指向什么？

- 在浏览器环境中，this 指向`window`
- 在 node 环境中，this 指向的是空对象`{}`

Node 环境中为什么指向的是空对象？

- Node 中会将 js 文件看作是一个模块；
- 之后会将它们放入一个函数中；
- 调用`call`方法执行函数，修改 this 的绑定为一个空对象；

### 在函数中的 this 指向？

- 所有的函数在被调用时，都会创建一个执行上下文：
- 这个上下文中记录着函数的调用栈、AO 对象等；
- this 也是其中的一条记录

也就是在之前执行函数中创造的 FEC 函数执行上下文中，除了有 AO 对象和作用域链之外，还存放着`this`的指向；

### 同一个函数下 this 的不同指向

有如下代码：

```javascript
function foo() {
  console.log(this);
}

// 1. 直接调用
foo();

// 2. 放到对象中调用
var obj = {
  name: "beanbag",
  foo: foo,
};
obj.foo();

// 3. 通过call/apply调用
foo.apply("abc");
```

上述代码会打印三次不同的 this 指向，所以有如下结论：

- 函数在调用时，JavaScript 会默认给 this 绑定一个值(会在执行上下文中绑定一个值)；
- this 的绑定和定义的位置（编写的位置）没有关系；
- this 的绑定和调用方式以及调用的位置有关系；
- this 是在运行时被绑定的；

## this 的绑定规则

### 1. 默认绑定

什么时候使用默认绑定呢？ —— 独立函数调用；

- 独立函数的调用我们可以理解为函数没有绑定到某个对象上进行调用；

```javascript
// 例子一
function foo() {
  console.log(this);
}

foo();

// 例子二
function foo1() {
  console.log(this);
}

function foo2() {
  console.log(this);
  foo1();
}

function foo3() {
  console.log(this);
  foo2();
}

foo3();

// 例子三
var obj = {
  name: "beanbag",
  foo: function () {
    console.log(this);
  },
};

var bar = obj.foo;
bar();

// 例子四
function foo() {
  console.log(this);
}

var obj = {
  name: "beanbag",
  foo: foo,
};

var bar = obj.foo;
bar();

// 例子五
function foo() {
  function bar() {
    console.log(this);
  }
  return bar;
}

var fn = foo();
fn();
```

主要就是查看函数在**调用**时候是不是作为独立函数调用

### 2. 隐式绑定

什么时候使用隐式绑定呢？ —— 调用位置中，是通过某个对象发起的函数调用.

```javascript
// 例子一
function foo() {
  console.log(this);
}

var obj = {
  name: "beanbag",
  foo: foo,
};

obj.foo(); // obj对象
// 例子二
var obj = {
  name: "beanbag",
  eating: function () {
    console.log(this.name + "吃东西");
  },
  running: function () {
    console.log(this.name + "在学习");
  },
};

var fn = obj.eating;
fn();
// 例子三
function foo() {
  console.log(this);
}

var obj1 = {
  name: "obj1",
  foo: foo,
};

var obj2 = {
  name: "obj2",
  obj1: obj1,
};

obj2.obj1.foo(); // obj1
```

### 3. 显示绑定

隐式绑定有一个前提条件:

- 必须在调用的对象内部有一个对函数的引用（比如一个属性）；
- 如果没有这样的引用，在进行调用时，会报找不到该函数的错误；
- 正是通过这个引用，间接的将 this 绑定到了这个对象上

如果我们不希望在 对象内部 包含这个函数的引用，同时又希望在这个对象上进行强制调用，该怎么做呢？

- JavaScript 所有的函数都可以使用 call 和 apply 方法（这个和 Prototype 有关）。
  - 它们两个的区别这里不再展开
  - 其实非常简单，第一个参数是相同的，后面的参数，apply 为数组，call 为参数列表
- 这两个函数的第一个参数都要求是一个对象，这个对象的作用是什么呢？就是给 this 准备的
- 在调用这个函数时，会将 this 绑定到这个传入的对象上

因为上面的过程，我们明确的绑定了 this 指向的对象，所以称之为**显示绑定**。

#### 基本方式

```javascript
function foo() {
  console.log(this);
}

foo.call(window);
foo.call({ name: "beanbag", age: 12 });
foo.apply(123);
```

#### call 和 apply 的区别：

```javascript
function sum(num1, num2) {
  console.log(num1 + num2);
}

sum.call("call", 10, 20);
sum.apply("apply", [10, 20]);
```

#### bind 方式绑定

使用 call 和 apply 有一个问题，当我们多次需要绑定在同一个指向的时候，每次都需要填写 this 的绑定会很繁琐，所以就可以使用`bind`

```javascript
function foo() {
  console.log(this);
}

var fn = foo.bind("bind");
fn();
fn();
fn();
```

这里需要注意一下，我们的`fn`函数这里看到是一个独立函数调用的，但是在调用之前我们使用`bind`绑定了 this，所以需要注意一下优先级的关系

默认绑定和显示绑定 `bind` 冲突: 优先级(显示绑定 > 默认绑定)

### 4. new 绑定

this 指向的就是创建出来的对象

- JavaScript 中的函数可以当做一个类的构造函数来使用，也就是使用 new 关键字
- 使用 new 关键字来调用函数是，会执行如下的操作：
  1. 创建一个全新的对象；
  2. 这个新对象会被执行 prototype 连接；
  3. 这个新对象会绑定到函数调用的 this 上（this 的绑定在这个步骤完成）
  4. 如果函数没有返回其他对象，表达式会返回这个新对象；

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

var p1 = new Person("beanbag", 22);
console.log(p1.name, p1.age);
```
