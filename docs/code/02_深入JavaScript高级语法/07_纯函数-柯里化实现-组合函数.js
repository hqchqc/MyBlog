var names = ["abc", "cba", "nba", "dna"];

var newNames = names.slice(0, 2);
console.log(newNames);

var newNames2 = names.splice(0, 2);
console.log(newNames2);
console.log(names);

var add3 = (x) => (y) => (z) => x + y + z;

console.log(add3(10)(20)(30));

function add2(x) {
  x = x + 2;
  return function (y) {
    y = y * 2;
    return function (z) {
      z = z ** 2;
      return x + y + z;
    };
  };
}

function makeAdder(num) {
  return function (count) {
    return num + count;
  };
}

var add5 = makeAdder(5);
add5(10);
add5(100);

var add10 = makeAdder(10);
add10(10);
add10(100);

function log(date, type, message) {
  console.log(
    `[${date.getHours()}:${date.getMinutes()}] [${type}] [${message}]`
  );
}
log(new Date(), "DEBUG", "修复问题");
log(new Date(), "FEATURE", "新功能");

// function log(date) {
//   return function (type) {
//     return function (message) {
//       console.log(
//         `[${date.getHours()}:${date.getMinutes()}] [${type}] [${message}]`
//       );
//     };
//   };
// }
var log = (date) => (type) => (message) =>
  console.log(
    `[${date.getHours()}:${date.getMinutes()}] [${type}] [${message}]`
  );

var logBug = log(new Date())("DEBUG");
logBug("一个错误");
logBug("两个个错误");

var logFeautre = log(new Date())("FEATURE");
logFeautre("新增功能1");
logFeautre("新增功能2");

function Currying(fn) {
  function curried(...args) {
    if (args.length >= fn.length) {
      return fn.call(this, ...args);
    } else {
      return function (...rest) {
        return curried.call(this, ...args, ...rest);
      };
    }
  }
  return curried;
}

function add(x, y, z) {
  return x + y + z;
}

var curryAdd = Currying(add);
console.log(curryAdd(10, 20, 30));
console.log(curryAdd(10, 20)(30));
console.log(curryAdd(10)(20)(30));

function compose(fn1, fn2) {
  return function (x) {
    return fn2(fn1(x));
  };
}

function double(num) {
  return num * 2;
}
function square(num) {
  return num ** 2;
}
var calcFn = compose(double, square);
console.log(calcFn(20), "104");

function compose(...fns) {
  for (var i = 0; i < fns.length; i++) {
    if (typeof fns[i] !== "function") {
      throw new TypeError("Expected argumnets are functions");
    }
  }
  return function (...args) {
    var index = 0;
    var result = index ? fns[index].call(this, ...args) : args;
    while (++index < fns.length) {
      result = fns[index].call(this, result);
    }
    return result;
  };
}

var calcFn = compose(double, square);
calcFn(10);
