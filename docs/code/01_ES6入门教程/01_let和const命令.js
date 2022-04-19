var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6]();

var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6]();

for (var i = 0; i < 10; i++) {
  var i = "abc";
  console.log(i + i);
}
{
  console.log(foo);
  var foo = 123;

  // console.log(foo2);
  // let foo2 = 12300;
}

// if (true) {
//   foo = 4; //start
//   console.log(foo);

//   let foo = 3; // TDZ end
//   console.log(foo);

//   foo = 333;
//   console.log(foo);
// }

// 变量提升 暂时性死区

// {
//   var a = 10;
//   if (true) {
//     a = 100;
//     let a = 1000;
//   }
// }

{
  if (true) {
    var a = 10;
    console.log(a);
  }
  function as() {
    var a = 100;
    console.log(a, "a2");
  }
  as();

  console.log(a);
}

{
  var temp = new Date();
  console.log(temp, "temp1");

  function a() {
    console.log(temp);
    if (false) {
      var temp = "hello";
    }
  }
  a();
}
{
  function a1s() {
    var a = 10;
    console.log(a, "a1");
    if (true) {
      var a = 100;
      console.log(a, "a2");
    }
    console.log(a, "a3");
  }
  a1s();
  console.log(a);
}
{
  function f() {
    console.log("I am outside");
  }
  (function () {
    if (false) {
      function f() {
        console.log("I am inside");
      }
    }
    console.log(fn);
    fn();
  })();
}
