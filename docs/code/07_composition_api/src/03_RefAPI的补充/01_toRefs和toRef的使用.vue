<template>
  <h3>{{ name }}</h3>
  <h3>{{ age }}</h3>
  <button @click="changeAge">修改age</button>
</template>

<script setup>
import { reactive, toRef, toRefs } from "vue";

// 解构会丢失响应式
// 相当于 let name = 'why'
// toRefs就是解决这个问题 必须传一个reactive对象
// toRefs 针对所有属性
// toRef 针对某一个属性

// 1. toRefs
// let { name, age } = toRefs(
//   reactive({
//     name: "why",
//     age: 18,
//   })
// );

// 2. toRef
const info = reactive({
  name: "why",
  age: 18,
});
const { name } = info;
const age = toRef(info, "age");

const changeAge = () => {
  age.value++;
  console.log("age", age);
};
</script>

<style></style>
