function foo() {
  console.log(this);
}

var obj1 = {
  name: "obj1",
  foo: foo,
};

var obj2 = {
  name: "obj2",
  obj1: obj1,
};

obj2.obj1.foo();

function sum(num1, num2) {
  console.log(num1 + num2);
}

sum.call("call", 10, 20);
sum.apply("apply", [10, 20]);
