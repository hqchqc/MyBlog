function foo(num) {
  function bar(count) {
    console.log(num + count);
  }
  return bar;
}

const add5Fn = foo(5);
add5Fn(10);
