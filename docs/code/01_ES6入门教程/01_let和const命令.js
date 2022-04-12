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

if (true) {
  foo = 4; //start
  console.log(foo);

  let foo = 3; // TDZ end
  console.log(foo);

  foo = 333;
  console.log(foo);
}

// 变量提升 暂时性死区
