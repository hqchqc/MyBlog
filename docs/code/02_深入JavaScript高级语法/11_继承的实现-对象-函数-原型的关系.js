var obj = {
  name: "beanbag",
  age: 18,
};

function createObject(o) {
  var newObj = {};
  Object.setPrototypeOf(newObj, o);
  return newObj;
}

var info = {};
