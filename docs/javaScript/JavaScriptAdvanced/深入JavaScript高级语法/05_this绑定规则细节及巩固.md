# 05\_ this 绑定规则细节及巩固

## 内置函数的绑定思考

在有一些内置函数中 this 是在其内部做处理的，我们是感知不到的，是一个黑盒，只能通过测试来推断出 this 的指向。

### 1. setTimeout

```javascript
setTimeout(function () {
  console.log(this); // window
}, 2000);

setTimeout(() => console.log(this), 1000); // 看上层作用域中的this指向
```

这里如果`setTimeout`传递的是`function`则这里的`this`打印的是 window

### 2. 监听点击

```javascript
const boxDiv = document.querySelector(".box");
boxDiv.onclick = function () {
  console.log(this); // box元素
};
```

这里返回的是 boxDiv 元素，调用的时候实际上是执行`boxDiv.onclick()`，所以是一个隐式绑定

### 3. 数组 forEach / map / filter / find

```javascript
var names = ["abc", "cba", "nba"];

names.forEach(function (item) {
  console.log(item, this); // window
});
```

很多类似以上这样的函数支持传入第二个参数，绑定 this

## 规则优先级

### 1. 默认规则的优先级最低

默认绑定在遇到任何于其它规则一起出现时，优先级都是最低的

### 2. 显示绑定优先级高于隐式绑定

代码测试：

```javascript
function bar() {
  console.log(this);
}

var obj = {
  name: "obj",
  foo: function () {
    console.log(this);
  },
  bar: bar.bind("aaa"),
};

obj.foo.call("abc"); // abc
obj.foo.apply("abc"); // abc

obj.bar(); // aaa
```

### 3. new 绑定优先级高于隐式绑定

代码测试：

```javascript
var obj = {
  name: "obj",
  foo: function () {
    console.log(this);
  },
};

var f = new obj.foo();
```

### 4. new 绑定优先级高于显示绑定

> new 关键字不能和 call / apply 一起使用

代码测试：

```javascript
function foo() {
  console.log(this);
}

var bar = foo.bind("aaa");

var obj = new bar();
```

## 规则之外

### 1. 忽略显示绑定

当绑定的`this`为`null`或者`undefined`时，它会自动将`this`绑定为全局对象

```javascript
function foo() {
  console.log(this);
}

foo.apply("abc");
foo.call({});

foo.apply(null); // window
foo.apply(undefined); // window
```

### 2. 间接函数引用

创建一个函数的间接引用，这种情况默认使用默认绑定规则

```javascript
function foo() {
  console.log(this);
}

var obj1 = {
  name: "obj1",
  foo: foo,
};

var obj2 = {
  name: "obj2",
};

obj1.foo();

(obj2.foo = obj1.foo)(); // window
```

### 3. 箭头函数

> 这里对箭头函数的使用就不叙述了，都会吧 hhh ~

- 箭头函数不会绑定 this、arguments 属性
- 箭头函数不能作为构造函数来使用(不能和 new 一起来使用，会抛出错误)
- 箭头函数不适用 this 的四种标准规则(也就是不绑定 this)，而是根据外层作用域来决定 this

```javascript
var name = "why";

var foo = () => {
  console.log(this);
};

foo(); // window
foo.call("aa"); // window
```

## 面试题

### 面试题一

```javascript
var name = "window";

var person = {
  name: "person",
  sayName: function () {
    console.log(this.name);
  },
};

function sayName() {
  var sss = person.sayName;
  sss(); // window
  person.sayName(); // person
  person.sayName(); // 这里应该是 (person.sayName)() 被编译器格式化了  person
  (b = person.sayName)(); // window  间接函数引用
}

sayName();
```

### 面试题二

```javascript
var name = "window";

var person1 = {
  name: "person1",
  foo1: function () {
    console.log(this.name);
  },
  foo2: () => console.log(this.name),
  foo3: function () {
    return function () {
      console.log(this.name);
    };
  },
  foo4: function () {
    return () => {
      console.log(this.name);
    };
  },
};

var person2 = { name: "person2" };

person1.foo1(); // person1
person1.foo1.call(person2); // person2

person1.foo2(); // window
person1.foo2.call(person2); // window

person1.foo3()(); // person1 -> window(这里当时做错了)
person1.foo3.call(person2)(); // person2 -> window(这里当时做错了)
person1.foo3().call(person2); // person2

person1.foo4()(); // person1
person1.foo4.call(person2)(); // person2
person1.foo4().call(person2); // person1
```

### 面试题三

```javascript
var name = "window";
function Person(name) {
  this.name = name;
  (this.foo1 = function () {
    console.log(this.name);
  }),
    (this.foo2 = () => console.log(this.name)),
    (this.foo3 = function () {
      return function () {
        console.log(this.name);
      };
    }),
    (this.foo4 = function () {
      return () => {
        console.log(this.name);
      };
    });
}
var person1 = new Person("person1");
var person2 = new Person("person2");

person1.foo1(); // person1
person1.foo1.call(person2); // person2

person1.foo2(); // person1
person1.foo2.call(person2); // person1

person1.foo3()(); // window
person1.foo3.call(person2)(); // window
person1.foo3().call(person2); // person2

person1.foo4()(); // person1
person1.foo4.call(person2)(); // person2
person1.foo4().call(person2); // person1
```

### 面试题四

```javascript
var name = "window";
function Person(name) {
  this.name = name;
  this.obj = {
    name: "obj",
    foo1: function () {
      return function () {
        console.log(this.name);
      };
    },
    foo2: function () {
      return () => {
        console.log(this.name);
      };
    },
  };
}
var person1 = new Person("person1");
var person2 = new Person("person2");

person1.obj.foo1()(); // window
person1.obj.foo1.call(person2)(); // window
person1.obj.foo1().call(person2); // person2

person1.obj.foo2()(); // person1 -> obj (这里当时做错了)
person1.obj.foo2.call(person2)(); // person2
person1.obj.foo2().call(person2); // person1 -> obj (这里当时做错了)
```

### 注意

> 要注意一下要区分在 var a = { } 这样的字面量形式声明对象的时候，括号内是没有作用域的哦 只有函数的括号内才有哦~
