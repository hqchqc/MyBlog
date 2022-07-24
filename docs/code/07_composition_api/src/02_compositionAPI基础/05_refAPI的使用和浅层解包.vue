<template>
  <div>
    <!-- 当我们在template模板中使用ref对象，他会自动进行解包 -->
    <h2>{{ counter }}</h2>
    <button @click="increament">+1</button>

    <h2>info:{{ info.counter }}</h2>
    <h2>reactive: {{ reactiveInfo.counter }}</h2>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

// 对参数有限制 只能传对象或数组
// const state = reactive({
//   counter: 100,
// });

const counter = ref(100);

const info = {
  counter,
};

const reactiveInfo = reactive(info);

const increament = () => {
  // state.counter++;
  counter.value++;
  console.log(counter);
};
</script>

<style></style>
