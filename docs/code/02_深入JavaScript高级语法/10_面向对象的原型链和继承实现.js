// function Student(name, age, sno) {
//   this.name = name;
//   this.age = age;
//   this.sno = sno;
// }

// Student.prototype.eating = function () {
//   console.log(this.name + " eating");
// };

// Student.prototype.studying = function () {
//   console.log(this.name + " studying");
// };

// function Teracher(name, age, tno) {
//   this.name = name;
//   this.age = age;
//   this.tno = tno;
// }

// Teracher.prototype.eating = function () {
//   console.log(this.name + " eating");
// };

// Teracher.prototype.teaching = function () {
//   clg(this.name + " teaching");
// };

// function Person() {
//   this.name = "why";
// }

// Person.prototype.eating = function () {
//   console.log(this.name + " eating");
// };

// function Student() {
//   this.sno = 100;
// }

// Student.prototype = new Person();

// Student.prototype.studying = function () {
//   console.log(this.name + " studying");
// };

// var stu1 = new Student();
// console.log(stu1.name);
// stu1.eating();

// function Person(name, age) {
//   this.name = name;
//   this.age = age;
// }

// Person.prototype.running = function () {
//   console.log(this.name + " running~");
// };

// var p1 = new Person("why", 18);

// // p1.__proto__.__proto__.grade = "yes";

// Object.prototype.grade = "yes";

// console.log(p1);
// console.log(p1.grade);

// console.log(p1.valueOf());
// console.log(p1.toString());

function Person(name, friends) {
  this.name = name;
  this.friends = friends;
}

Person.prototype.eating = function () {
  console.log(this.name + " eating");
};

function Student(name, sno, friends) {
  // constructor stealing
  Person.call(this, name, friends);
  this.sno = sno;
}

Student.prototype = new Person();

Student.prototype.studying = function () {
  console.log(this.name + " studying" + this.sno);
};

var stu1 = new Student("beanbag", 100, ["lilei"]);
var stu2 = new Student("why", 200, ["lucy"]);

stu1.friends.push("hanmeimei");

console.log(stu1, stu2);
console.log(stu1.__proto__.constructor);

console.log(Object.getOwnPropertyDescriptors(stu1.__proto__.constructor));
