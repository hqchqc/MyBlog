<template>
  <div>
    <h2>{{ name }} - {{ age }}</h2>
    <button @click="changeName">change name</button>
    <button @click="changeAge">change age</button>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";

const name = ref("why");
const age = ref(18);

const changeName = () => (name.value = "aa");
const changeAge = () => {
  age.value++;
  if (age.value > 25) {
    stop();
  }
};

// 会立即执行一次
// 会自动收集可响应式的依赖
const stop = watchEffect((onInvalidate) => {
  // 根据name和age两个变量发送网络请求
  onInvalidate(() => {
    // 在这里清除额外的副作用
    // request.cancel();
  });
  console.log("name", name.value, age.value);
});
</script>

<style></style>
