/* 创建对象的几种方式 */

// 1. 对象字面量
const obj = {
  name: "beanbag",
  age: 18,
};

// 2. 工厂模式
function createObj(name, age) {
  const obj = {
    name,
    age,
  };
  obj.studying = function () {
    console.log("studying!");
  };

  return obj;
}
const o = createObj("beanbag", 18);
console.log(o);

// 3. 构造函数模式
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.studying = function () {
    console.log("studying~");
  };
}

const p1 = new Person("beanbag", 18);
console.log(p1.age);
// console.log(p1.studying());

// 4. 原型模式
function Animal(type) {
  this.type = type;
}
Animal.prototype.eating = function () {
  console.log("eating~");
};

const animal = new Animal("dog");
console.log(animal);
animal.eating();

/* 继承的几种方式 */

// 1. 原型链继承
function Person() {
  this.name = "lalala";
}
Person.prototype.studying = function () {
  console.log("studying~");
};

function Student() {
  this.sno = 100;
}

Student.prototype = new Person();

Student.prototype.eating = function () {
  console.log("eating!");
};

// 2. 借用构造函数继承
function Person(name) {
  this.name = name;
}

Person.prototype.eating = function () {
  console.log("eating");
};

function Student(name, score) {
  Person.call(this, name);
  this.score = score;
}

Student.prototype = new Person();

Student.prototype.running = function () {
  console.log("running");
};

// 3. 原型式继承 (对象的继承方式)
const obj1 = {
  name: "lalala",
  age: 18,
};

const obj2 = Object.create(obj1);
console.log(obj2.name, obj2.age);

function create(o) {
  function Fn() {}
  Fn.prototype = o;
  const obj = new Fn();
  return obj;
}

function createObj(o) {
  const obj = {};
  Object.setPrototypeOf(obj, o);
  return obj;
}

// 4. 寄生式继承 (对象的继承方式)
const obj3 = {
  name: "lalala",
  age: 18,
};

function createObj3(score) {
  const obj4 = Object.create(obj3);
  obj4.score = score;
  return obj4;
}

const c1 = createObj3(100);
const c2 = createObj3(200);

// 5. 寄生组合式继承
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.studying = function () {
  console.log("studying~");
};

function Student(name, age, score) {
  Person.call(this, name, age);
  this.score = score;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.running = function () {
  console.log("running");
};
