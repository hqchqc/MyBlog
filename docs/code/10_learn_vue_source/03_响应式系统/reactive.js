class Dep {
  constructor() {
    this.subscribers = new Set();
  }

  depend() {
    if (acticeEffect) {
      this.subscribers.add(acticeEffect);
    }
  }

  notify() {
    this.subscribers.forEach((effect) => effect());
  }
}
let acticeEffect = null;

function watchEffect(effect) {
  acticeEffect = effect;
  // dep.depend();
  effect();
  acticeEffect = null;
}

// Map({key:value}): key是一个字符串
// WeakMao({key(对象):value}): key是一个对象,弱引用
const targetMap = new WeakMap();
function getDep(target, key) {
  // console.log("target", targetMap.get(target));
  // 根据target对象取出对应的Map对象
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }
  // 2. 取出对应的dep对象
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Dep();
    depsMap.set(key, dep);
  }
  return dep;
}

// vue3对raw进行数据劫持
function reactive(raw) {
  return new Proxy();
}

// 测试代码
const info = reactive({
  counter: 100,
  name: "why",
});
const foo = reactive({
  height: 1.88,
});

watchEffect(function doubleCounter() {
  console.log("effect1", info.counter * 2, info.name);
});

watchEffect(function powerCounter() {
  console.log("effect2", info.counter * info.counter);
});

watchEffect(function () {
  console.log("effect3", info.counter + 10, info.name);
});

watchEffect(function () {
  console.log("effect4", foo.height);
});

// dep.addEffect(doubleCounter);
// dep.addEffect(powerCounter);

// info.counter++;
// dep.notify();

// info.counter++;
info.name = "lilei";
