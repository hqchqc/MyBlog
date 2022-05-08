function createArray() {
  var createArr = new Array(1024 * 1024).fill(1);

  return function () {
    console.log(createArr.length);
  };
}

var saveFn = [];
for (var i = 0; i < 100; i++) {
  setTimeout(() => {
    saveFn.push(createArray());
  }, i * 100);
}

setTimeout(() => {
  for (var i = 0; i < 100; i++) {
    setTimeout(() => {
      saveFn.pop();
    }, i * 100);
  }
}, 10000);
