function calc(num1, num2, fn) {
  fn(num1, num2);
}

function add(num1, num2) {
  console.log(num1 + num2);
}

function sub(num1, num2) {
  console.log(num1 - num2);
}

function mul(num1, num2) {
  console.log(num1 * num2);
}

calc(10, 20, add);
calc(10, 20, sub);
calc(10, 20, mul);
