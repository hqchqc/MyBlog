function foo() {
  var name = "beanbag";
  var age = 22;

  return function () {
    debugger;
    console.log(name);
  };
}

var fn = foo();
fn();
