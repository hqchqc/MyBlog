var obj = {
  _weight: "2kg",
  set weight(value) {
    this._weight = value;
  },
  get weight() {
    return this._weight;
  },
};

Object.defineProperties(obj, {
  type: {
    configurable: false,
    enumerable: false,
    value: "animal",
    writable: false,
  },
  // weight: {
  //   configurable: true,
  //   enumerable: true,
  //   get: function () {
  //     return this._weight;
  //   },
  //   set: function (value) {
  //     this._weight = value;
  //   },
  // },
});

console.log(obj.type);
console.log(obj);

obj._weight = "3kg";
console.log(obj);

// 1. 阻止扩展 (添加属性)
Object.preventExtensions(obj);
obj.extension = "extension";

console.log(obj);

// 2. 阻止删除 配置
Object.seal(obj);
delete obj._weight;
console.log(obj);

// 3. 组织编辑 写入
Object.freeze(obj);
obj._weight = "100kg";
console.log(obj);

console.log(Object.getOwnPropertyDescriptor(obj, "_weight"));
console.log(Object.getOwnPropertyDescriptors(obj));

// 工厂模式 不知道类型
function factoryFn(name, age, address) {
  var obj = {};
  obj.name = name;
  obj.age = age;
  obj.address = address;

  obj.eatting = function () {
    console.log(obj.name + "正在吃饭");
  };
  obj.running = function () {
    console.log(obj.name + "正在跑步");
  };
  return obj;
}

var p1 = factoryFn("张三", 20, "深圳市");
var p2 = factoryFn("李四", 30, "杭州市");

console.log(p1, p2);

function foo() {}
var f1 = new foo();

console.log(foo === foo.prototype.constructor);
console.log(foo.prototype);
console.log(Object.getOwnPropertyDescriptors(f1.__proto__));
console.log(Object.getOwnPropertyDescriptors(foo.prototype));
console.log(Object.getOwnPropertyDescriptors(foo));
Object.defineProperty(foo.prototype, "constructor", {
  enumerable: true,
});
console.log(Object.getOwnPropertyDescriptors(foo.prototype));

function Person(name, age) {
  this.name = name;
  this.age = age;

  this.eating = function () {
    console.log(this.name + "在吃东西");
  };

  this.running = function () {
    console.log(this.name + "在跑步");
  };
}

var p1 = new Person("张三", 18);
var p2 = new Person("李四", 28);
console.log(p1, p2);
