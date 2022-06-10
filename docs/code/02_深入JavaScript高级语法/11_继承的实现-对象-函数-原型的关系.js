// // var obj = {
// //   name: "beanbag",
// //   age: 18,
// // };

// // function createObject(o) {
// //   var newObj = {};
// //   Object.setPrototypeOf(newObj, o);
// //   return newObj;
// // }

// // var info = {};

// var personObj = {
//   running: function () {
//     console.log("running");
//   },
// };

// function createStudent(name) {
//   var stu = Object.create(personObj);
//   stu.name = name;
//   stu.studying = function () {
//     console.log("studying~");
//   };
//   return stu;
// }

// var stuObj1 = createStudent("beanbag");
// var stuObj2 = createStudent("bean");
// console.log(stuObj1, stuObj2);

// function Person(name, age, friends) {
//   this.name = name;
//   this.age = age;
//   this.friends = friends;
// }

// Person.prototype.running = function () {
//   console.log("running");
// };

// Person.prototype.eating = function () {
//   console.log("eating");
// };

// function Student(name, age, friends, sno, score) {
//   Person.call(this, name, age, friends);
//   this.sno = sno;
//   this.score = score;
// }

// Student.prototype = Object.create(Person.prototype);
// // Student.prototype.constructor = Student;
// Object.defineProperty(Student.prototype, "constructor", {
//   enumerable: false,
//   configurable: true,
//   writable: true,
//   value: Student,
// });

// Student.prototype.studying = function () {
//   console.log("studying");
// };

// var stu3 = new Student("beanbag", 18, ["bean", "bag"], "001", 100);
// console.log(stu3);

function createObject(o) {
  function Fn() {}
  Fn.prototype = o;
  return new Fn();
}

function inheritPrototype(subType, superType) {
  // var prototype = Object.create(superType.prototype);
  subType.prototype = createObject(superType.prototype);
  Object.defineProperty(subType.prototype, "constructor", {
    enumerable: false,
    configurable: true,
    writable: true,
    value: subType,
  });
}

// var obj = {
//   name: "beanbag",
//   age: 18,
// };

// var info = Object.create(obj, {
//   address: {
//     value: "深圳市",
//     enumerable: true,
//   },
// });

// // hasOwnProperty方法判断
// console.log(info.hasOwnProperty("address")); // true
// console.log(info.hasOwnProperty("name")); //false

// // in操作符 (不管在当前对象还是原型中,只要存在都返回true)
// console.log("address" in info); // true
// console.log("name" in info); // true

// // for in
// for (var key in info) {
//   console.log(key);
// }

// function Person() {}

// function Student() {}

// inheritPrototype(Student, Person);

// var stu = new Student();

// // Person的prototype是否出现在stu的原型链上
// console.log(stu instanceof Student); // true
// console.log(stu instanceof Person); // true
// console.log(stu instanceof Object); // true

function Person() {}

var p = new Person();

console.log(Person.prototype.isPrototypeOf(p)); // true

var obj = {
  name: "beanbag",
  age: 18,
};

var info = Object.create(obj);

console.log(obj.isPrototypeOf(info)); // true
