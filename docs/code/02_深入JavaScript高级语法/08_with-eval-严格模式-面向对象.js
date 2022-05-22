// var str = 'var message = "hello"; console.log(message)';
// eval(str);

// // var name = "beanbag";
// // var obj = {
// //   name: "with语句输出",
// // };
// // function foo() {
// //   console.log(name);
// //   with (obj) {
// //     console.log(name);
// //   }
// // }
// // foo();

// var obj = {
//   name: "beanbag",
//   age: 18,
// };

// var name = "全局的name";

// with (obj) {
//   console.log(name);
//   console.log(age);
// }

// "use strict";

// accident = "accident"; // Uncaught ReferenceError: accident is not defined

// var obj = {};
// Object.defineProperty(obj, "accident", {
//   configurable: false,
// });

// delete obj.accident; // Uncaught TypeError: Cannot delete property 'accident' of #<Object

// function accident(x, y, x) {
//   console.log(x, y, x);
// }
// accident(1, 2, 3);

// var num = 0123;

// var obj = {
//   name: "accident",
//   age: 100,
// };
// function foo() {
//   var name = 10,
//     age = 20;
//   with (obj) {
//     console.log(name, age);
//   }
// }
// foo();

// var test = 'var testEval = "accident"; console.log(testEval)';
// eval(test);
// console.log(testEval); //  Uncaught ReferenceError: testEval is not defined

// function foo() {
//   console.log(this);
// }

// foo(); // undefined

// var obj = () => {
//   console.log(this);
// };

// obj(); // window

// setTimeout(() => {
//   console.log(this); // window
// });

// setTimeout(function () {
//   console.log(this); // window
// });

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

var obj = {
  gender: "girl",
  height: "180cm",
};

Object.defineProperty(obj, "attribute", {
  value: "Attribute",
  // 可写
  writable: false,
  // 可删除
  configurable: false,
  // 可枚举
  enumerable: false,
});

obj.attribute = "write";

delete obj.attribute;

console.log(obj, Object.keys(obj));

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
