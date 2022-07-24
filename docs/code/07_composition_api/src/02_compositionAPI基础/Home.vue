<template>
  <div>
    <h2>{{ counter }}</h2>
    <button @click="increament">+1</button>
    <button @click="update">update</button>
  </div>
</template>

<script setup>
import { readonly, ref, reactive } from "vue";

const counter = ref(100);

// readonly 是通过Proxy来实现的 劫持set方法

// 1. 普通对象
const info1 = {
  name: "why",
};
let readonlyInfo1 = readonly(info1);

// 2. 响应式对象
const info2 = reactive({
  name: "why",
});
const readonlyInfo2 = readonly(info2);

// 3. ref
const info3 = ref("why");
const readonlyInfo3 = readonly(info3);

const increament = () => {
  counter.value++;
};

const update = () => {
  readonlyInfo1.name = "1";
  readonlyInfo2.name = "2";
  readonlyInfo3.value = "3";
};
</script>

<style></style>
