// const names = ["abc", "cab", "nba"];
// names.forEach(function () {
//   console.log(this);
// });

// names.forEach(function () {
//   console.log(this);
// }, "aaa");

// names.map(function () {
//   console.log(this);
// });

// names.filter(function () {
//   console.log(this);
// });

// names.find(function () {
//   console.log(this);
// });

// function bar() {
//   console.log(this);
// }

// var obj = {
//   name: "obj",
//   foo: function () {
//     console.log(this);
//   },
//   bar: bar.bind("aaa"),
// };

// obj.foo.call("abc");
// obj.foo.apply("abc");

// obj.bar();

// var obj = {
//   name: "obj",
//   foo: function () {
//     console.log(this);
//   },
// };

// var f = new obj.foo();

// function foo() {
//   console.log(this);
// }

// var bar = foo.bind("aaa");

// var obj = new bar();

// function foo() {
//   console.log(this);
// }

// foo.apply("abc");
// foo.call({});

// foo.apply(null);
// foo.apply(undefined);

// function foo() {
//   console.log(this);
// }

// var obj1 = {
//   name: "obj1",
//   foo: foo,
// };

// var obj2 = {
//   name: "obj2",
// };

// obj1.foo();

// (obj2.foo = obj1.foo)(); // window

// var a = () => console.log(this);

// var b = new a();
// console.log(b);

// var name = "why";

// var foo = () => {
//   console.log(this);
// };

// foo(); // window
// foo.call("aa"); // window

// var name = "window";

// var person = {
//   name: "person",
//   sayName: function () {
//     console.log(this.name);
//   },
// };

// function sayName() {
//   var sss = person.sayName;
//   sss(); // window
//   person.sayName(); // person
//   person.sayName(); // 这里应该是 (person.sayName)() 被编译器格式化了  window
//   (b = person.sayName)(); // window
// }

// sayName();

// var name = "window";

// var person1 = {
//   name: "person1",
//   foo1: function () {
//     console.log(this.name);
//   },
//   foo2: () => console.log(this.name),
//   foo3: function () {
//     return function () {
//       console.log(this.name);
//     };
//   },
//   foo4: function () {
//     return () => {
//       console.log(this.name);
//     };
//   },
// };

// var person2 = { name: "person2" };

// person1.foo1(); // person1
// person1.foo1.call(person2); // person2

// person1.foo2(); // window
// person1.foo2.call(person2); // window

// person1.foo3()(); // person1  window
// person1.foo3.call(person2)(); // person2  window
// person1.foo3().call(person2); // person2

// person1.foo4()(); // person1
// person1.foo4.call(person2)(); // person2
// person1.foo4().call(person2); // person1

// var name = "window";
// function Person(name) {
//   this.name = name;
//   (this.foo1 = function () {
//     console.log(this.name);
//   }),
//     (this.foo2 = () => console.log(this.name)),
//     (this.foo3 = function () {
//       return function () {
//         console.log(this.name);
//       };
//     }),
//     (this.foo4 = function () {
//       return () => {
//         console.log(this.name);
//       };
//     });
// }
// var person1 = new Person("person1");
// var person2 = new Person("person2");

// person1.foo1(); // person1
// person1.foo1.call(person2); // person2

// person1.foo2(); // person1
// person1.foo2.call(person2); // person1

// person1.foo3()(); // window
// person1.foo3.call(person2)(); // window
// person1.foo3().call(person2); // person2

// person1.foo4()(); // person1
// person1.foo4.call(person2)(); // person2
// person1.foo4().call(person2); // person1

// var name = "window";
// function Person(name) {
//   this.name = name;
//   this.obj = {
//     name: "obj",
//     foo1: function () {
//       return function () {
//         console.log(this.name);
//       };
//     },
//     foo2: function () {
//       return () => {
//         console.log(this.name);
//       };
//     },
//   };
// }
// var person1 = new Person("person1");
// var person2 = new Person("person2");

// person1.obj.foo1()(); // window
// person1.obj.foo1.call(person2)(); // window
// person1.obj.foo1().call(person2); // person2

// person1.obj.foo2()(); // person1 -> obj （
// person1.obj.foo2.call(person2)(); // person2
// person1.obj.foo2().call(person2); // person1 -> obj

{
  var name = "windows";
  var obj1 = {
    name: "oo",
    foo: () => {
      console.log(this.name, this);
    },
  };
}

{
  let name = "name2";
  const obj2 = {
    name: "pp",
    foo: () => {
      console.log(this.name, this);
    },
  };
  obj2.foo();
}

obj1.foo();
