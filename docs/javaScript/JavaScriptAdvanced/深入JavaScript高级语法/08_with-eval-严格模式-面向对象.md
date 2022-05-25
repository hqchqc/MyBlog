# 08_with-eval-严格模式-面向对象

## with 语句

with 语句可以扩展一个语句的作用域链，其实就是可以改变某一个地方的作用域，优先访问 with 参数中的作用域；

```javascript
var obj = {
  name: "beanbag",
  age: 18,
};

var name = "全局的name";

with (obj) {
  console.log(name);
  console.log(age);
}
```

- 不建议使用 with 语句，因为它可能混淆错误和兼容性问题的根源

## eval 函数

- eval 是一个特殊的函数，它可以将传入的字符串当作 JavaScript 代码来运行

```javascript
var str = 'var message = "hello"; console.log(message)';
eval(str);
```

- 不建议在开发中使用 eval:
  - eval 代码的可读性非常的查(代码的可读性是高质量代码的重要原则)
  - eval 是一个字符串，那么有可能在执行的过程中被可以篡改，那么可能会造成攻击的风险
  - eval 的执行必须经过 JS 解释器，不能被 JS 引擎优化

## 严格模式

### 认识严格模式

- 在 ECMAScript5 标准中，JavaScript 提出了严格模式的概念(Strict Mode)

  - 严格模式很好理解，是一种具有限制性的 JavaScript 模式，从而使代码隐式的脱离了懒散(sloppy)模式
  - 支持严格模式的浏览器在检测到代码中有严格模式时，会以更加严格的方式对代码进行检测和执行

- 严格模式对正常的 JavaScript 语义进行了一些限制
  - 严格模式通过抛出错误来消除一些原有的静默(silent)错误
  - 严格模式让 JS 引擎在执行代码时可以进行更多的优化(不需要对一些特殊的语法进行处理)
  - 严格模式禁用了在 ECMAScript 未来版本中可能会定义的一些语法

### 开启严格模式

- 那么如何开启严格模式呢?严格模式支持粒度化的迁移

  - 可以支持在 js 文件中开启严格模式
  - 也支持对某一个函数开启严格模式

- 严格模式通过在文件或者函数开头使用 use strict 来开启

### 严格模式限制

- 这里我们来说几个严格模式下的严格语法限制：

  - JavaScript 被设计未新手开发者更容易上手，所以有时候本来错误语法，被认为也是可以正常被解析的
  - 但是这种方式可能带来留下安全隐患
  - 在严格模式下，这种失误就会被当作错误，一边可以快速的发现和修正

- 1. 无法意外的创建全局变量
  ```javascript
  "use strict";
  accident = "accident"; // Uncaught ReferenceError: accident is not defined
  ```
- 2. 严格模式会使引起静默失败(silently fail,注: 不报错也没有任何效果)的赋值操作抛出异常
  ```javascript
  true.accident = 123;
  ```
- 3. 严格模式下试图删除不可删除的属性

  ```javascript
  var obj = {};
  Object.defineProperty(obj, "accident", {
    configurable: false,
  });

  delete obj.accident; // Uncaught TypeError: Cannot delete property 'accident' of #<Object>
  ```

- 4. 严格模式下不允许函数参数有相同的名称

  ```javascript
  function accident(x, y, x) {
    console.log(x, y, x);
  }
  accident(1, 2, 3); // Uncaught SyntaxError: Duplicate parameter name not allowed in this context
  ```

- 5. 不允许 0 的八进制语法

  ```javascript
  var num = 0123; // Uncaught SyntaxError: Octal literals are not allowed in strict mode.
  ```

- 6. 在严格模式下，不允许使用 with

  ```javascript
  var obj = {
    name: "accident",
    age: 100,
  };
  function foo() {
    var name = 10,
      age = 20;
    with (obj) {
      console.log(name, age);
    }
  }
  foo(); // Uncaught SyntaxError: Strict mode code may not include a with statement
  ```

- 7. 在严格模式下，eval 不再为上层引用变量(没有严格模式的情况下，eval 中执行的字符串中定义的变量是会到上层作用域中的)

  ```javascript
  var test = 'var testEval = "accident"; console.log(testEval)';
  eval(test);
  console.log(testEval); //  Uncaught ReferenceError: testEval is not defined
  ```

- 8. 严格模式下，this 绑定不会默认转成对象(自执行函数不会绑定 window)

  ```javascript
  function foo() {
    console.log(this);
  }

  foo(); // undefined

  var obj = () => {
    console.log(this);
  };

  obj(); // window

  setTimeout(() => {
    console.log(this); // window
  });

  setTimeout(function () {
    console.log(this); // window
  });
  ```

## 面向对象基础

### 面向对象是显示的抽象方式

- 对象是 JavaScript 中一个非常重要的概念，这是因为对象可以将多个相关联的数据封装到一起，更好的描述一个事务
- 用对象来描述事务，更有利于我们将现实的事务，抽离成代码中某个数据结构
  - 所以有一些编程语言就是纯面向对象的编程语言，比如 Java
  - 你在实现任何现实抽象时都需要先创建一个类，根据类再去创建对象

### JavaScript 的面向对象

- JavaScript 其实支持多种编程范式的，包括函数式编程和面向对象编程

  - JavaScript 中的对象被设计成一组属性的无序集合，像是一个哈希表，有 key 和 value 组成
  - key 是一个标识符名称，value 可以是任意类型，也可以是其它对象或者函数类型
  - 如果值是一个函数，那么我们可以称之为是对象的方法

- 如何创建一个对象呢？
  - 早期使用创建对象的方式最多的是使用 Object 类，`var obj = new Object()`，并且使用 new 关键字来创建一个对象
    - 这是因为早期很多 JavaScript 开发者是从 Java 过来的，它们也更习惯于 Java 中通过 new 的方式创建一个对象
  - 后来很多开发者为了方便起见，都是直接通过字面量的形式来创建对象
    - 这种形式开起来更加的简洁，并且对象和属性之间的内聚性也更强，所以这种方式后来就流行了起来

```javascript
// 1. 通过new方式创建
var Animal = new Object();
Animal.type = "cat";
Animal.weight = "2kg";

console.log(Animal);

// 2. 通过对象字面量创建
var Person = {
  gender: "boy",
  height: "180cm",
};
console.log(Person);
```

### 对属性操作的控制

在之前我们的属性都是直接定义在对象内部，或者直接添加到对象内部的：

- 但是这样来做的时候我们就不能对这个属性进行一些限制：比如这个属性是否可以通过 delete 删除？这个属性是否在 for-in 遍历的时候被遍历出来呢？
- 如果我们想要对一个属性进行比较精准的操作控制，那么我们就可以使用属性操作符
- 通过属性操作符可以精准的添加或修改对象的属性
- 属性描述符需要使用`Object.defineProperty`来对属性进行添加或者修改

### Object.defineProperty

- `Object.defineProperty()`方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象
- 可以接收三个参数
  - obj: 要定义属性的对象
  - prop: 要定义或修改的属性的名称或 Symbol
  - description: 要定义或修改的属性描述符
- 返回值
  - 被传递给函数的对象

### Object.defineProperties

- 该方法可以直接在一个对象上定义多个新的属性或修改现有属性，并且返回该对象

```javascript
var obj = {
  _weight: "2kg",
  set weight(value) {
    this._weight = value;
  },
  get weight() {
    return this._weight;
  },
};

Object.defineProperties(obj, {
  type: {
    configurable: false,
    enumerable: false,
    value: "animal",
    writable: false,
  },
  weight: {
    configurable: true,
    enumerable: true,
    get: function () {
      return this._weight;
    },
    set: function (value) {
      this._weight = value;
    },
  },
});
```

### 属性描述符分类

属性描述符的类型有两种

- 数据属性(Data Properties)描述符(Descriptor)
- 存取属性(Accessor 访问器 Properties)描述符(Descriptor)

![属性描述符分类](https://raw.githubusercontent.com/hqchqc/staticRepo/master/images/20220522000007.png)

可以看到如果是存取属性描述符的话是不能有 value 和 writable 属性的，取而代之的是 set 和 get

#### 1. 数据属性描述符

数据属性描述符有如下四个特性：

- Configurable：表示属性是否可以通过 delete 删除属性，是否可以修改它的特性，或者是否可以将它修改为存取属性
  描述符；
  - 当我们直接在一个对象上定义某个属性时，这个属性的 Configurable 为 true；
  - 当我们通过属性描述符定义一个属性时，这个属性的 Configurable 默认为 false；
- Enumerable：表示属性是否可以通过 for-in 或者 Object.keys()返回该属性；
  - 当我们直接在一个对象上定义某个属性时，这个属性的 Enumerable 为 true；
  - 当我们通过属性描述符定义一个属性时，这个属性的 Enumerable 默认为 false；
- Writable：表示是否可以修改属性的值；
  - 当我们直接在一个对象上定义某个属性时，这个属性的 Writable 为 true；
  - 当我们通过属性描述符定义一个属性时，这个属性的 Writable 默认为 false；
- value：属性的 value 值，读取属性时会返回该值，修改属性时，会对其进行修改；
  - 默认情况下这个值是 undefined

```javascript
var obj = {
  gender: "girl",
  height: "180cm",
};

Object.defineProperty(obj, "attribute", {
  value: "Attribute",
  // 可写
  writable: false,
  // 可删除 可重新配置为存取属性描述符 可以重新配置属性描述符
  configurable: false,
  // 可枚举
  enumerable: false,
});

obj.attribute = "write";

delete obj.attribute;

console.log(obj, Object.keys(obj));
```

#### 2. 存取属性描述符

数据存取描述符有如下四个特性：

- Configurable：表示属性是否可以通过 delete 删除属性，是否可以修改它的特性，或者是否可以将它修改为存取属性
  描述符；
  - 和数据属性描述符是一致的；
  - 当我们直接在一个对象上定义某个属性时，这个属性的 Configurable 为 true；
  - 当我们通过属性描述符定义一个属性时，这个属性的 Configurable 默认为 false；
- Enumerable：表示属性是否可以通过 for-in 或者 Object.keys()返回该属性；
  - 和数据属性描述符是一致的；
  - 当我们直接在一个对象上定义某个属性时，这个属性的 Enumerable 为 true；
  - 当我们通过属性描述符定义一个属性时，这个属性的 Enumerable 默认为 false；
- get：获取属性时会执行的函数。默认为 undefined
- set：设置属性时会执行的函数。默认为 undefined

```javascript
var obj2 = {
  type: "animal",
  name: "cat",
  _test: "assas",
};

// 存取描述符
Object.defineProperty(obj2, "test", {
  configurable: true,
  enumerable: true,
  set: function (value) {
    this._test = value;
    console.log("set被调用");
  },
  get: function () {
    console.log("get被调用");
    return this._test;
  },
});

console.log(obj2.test);
// obj2.name;
obj2._test = "_test";
console.log(Object.keys(obj2), obj2.test);
```

使用场景：

- 隐藏某一个私有属性不希望直接被外界使用和赋值
- 如果我们希望截获某一个属性它的访问和设置值的过程时，也会使用存取属性描述符
