<template>
  <div>
    <h2>{{ firstName }} {{ lastName }}</h2>
    <h2>{{ fullName }}</h2>
    <button @click="changeName">修改firstName</button>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const firstName = ref("bean");
const lastName = ref("bag");

// 用法一: 传入getter函数
// 返回值是一个ref对象
// const fullName = computed(() => firstName.value + lastName.value);

// 用法二: 传入一个对象 包含getter和setter函数
const fullName = computed({
  get: () => firstName.value + lastName.value,
  set(newValue) {
    const names = newValue.split(" ");
    firstName.value = names[0];
    lastName.value = names[1];
  },
});

const changeName = () => {
  // firstName.value = "qc h";
  fullName.value = "qc h";
};
</script>

<style></style>
