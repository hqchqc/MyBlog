class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  eating() {
    console.log(this.name + " eating Person~");
  }

  static studying() {
    console.log(this.name + " studying Person Static~");
  }
}

class Student extends Person {
  constructor(name, age, sno) {
    super(name, age);
    this.sno = sno;
  }

  running() {
    console.log(this.name + "running~");
  }

  static studying() {
    super.studying();
    console.log("123");
    // console.log(this.name + " studying Student~ -=-=-=-=-");
  }
  eating() {
    super.eating();
    console.log("-=-");
  }
}

const stu = new Student("beanbag", 18, 100);
stu.running();
stu.eating();
Person.studying();
Student.studying();
stu.eating();
console.log(stu);

// 静态方法是放在类上的(构造函数)，而不是构造函数的原型上。
console.log(Object.getOwnPropertyDescriptor(Person));
