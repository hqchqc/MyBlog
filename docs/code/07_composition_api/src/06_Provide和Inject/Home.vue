<template>
  <span>Home</span>
  <span>{{ name }}</span>
  <span>{{ counter }}</span>
  <button @click="homeIncreament">HOme+1</button>
</template>

<script setup>
import { inject, readonly } from "vue";

// 保持单项数据流
const name = inject("name");
const counter = inject("counter");

const homeIncreament = () => {
  counter.value++;
};
</script>

<style></style>
