function foo() {
  console.log(this);
}

// 1.
foo();

// 2.
var obj = {
  name: "beanbag",
  foo: foo,
};
obj.foo();

// 3.
foo.apply("abc");

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

function foo() {
  console.log(this);
}

foo();

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

var obj = {
  name: "beanbag",
  foo: function () {
    console.log(this);
  },
};

var bar = obj.foo;
bar();
