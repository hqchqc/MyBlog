function foo(num1, num2, num3) {
  console.log(this, num1, num2, num3);
}

foo.call("abc");
foo.apply("abc");
foo.bind("abc", 1, 2, 3)();

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

foo._call("abc");

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

foo._apply("abc", [12]);

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

foo._bind("abc", 1, 3)(2);
foo._bind("abc", 1, 3, 2)();

function baz() {
  console.log(arguments.callee);
}

baz();

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

  // 4. Array.f
  var newArr4 = Array.from(arguments);
  console.log(newArr4);

  // return newArr;
}

foo(1, 2, 3, 4);

function foo() {
  var bar = () => {
    console.log(arguments);
  };
  return bar;
}

var fn = foo(1, 2, 3);
fn();
