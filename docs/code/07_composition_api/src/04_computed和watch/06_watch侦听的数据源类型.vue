<template>
  <div>
    <h3>{{ info.name }}</h3>
    <h3>{{ name }}</h3>
    <button @click="changeData">xiua</button>
  </div>
</template>

<script setup>
import { reactive, watch, ref } from "vue";

// 惰性的
// 更具体的说明哪些状态发生变化
// 访问侦听状态变化前后的值

const info = reactive({
  name: "why",
  age: 18,
});

// 1. 侦听watch时 传入getter函数
// watch(
//   () => info.name,
//   (newValue, oldValue) => {
//     console.log("newValue", newValue);
//     console.log("oldValue", oldValue);
//   }
// );

// 2. 传入一个可响应式对象  reactive对象和ref对象
//    如果是reactive对象 但是newValue和oldValue本省都是reactive对象
//          ref
// watch(
//   () => info.name,
//   (newValue, oldValue) => {
//     console.log("newValue", newValue);
//     console.log("oldValue", oldValue);
//   }
// );

let name = ref("why");
// watch(name, (newValue, oldValue) => {
//   console.log("newValue", newValue);
//   console.log("oldValue", oldValue);
// });

watch(
  () => ({ ...info }),
  (newValue, oldValue) => {
    console.log("newValue", newValue);
    console.log("oldValue", oldValue);
  }
);

const changeData = () => {
  info.name = "aa";
  name.value = "hqc";
};
</script>

<style></style>
