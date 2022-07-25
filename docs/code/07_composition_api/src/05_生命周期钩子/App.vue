<template>
  <button @click="increament">{{ counter }}</button>
</template>

<script setup>
import { onMounted, onUnmounted, onUpdated, ref } from "vue";

const counter = ref(0);

const increament = () => {
  counter.value++;
};

// 可以注册多个生命周期
onMounted(() => {
  console.log("mounted1");
});

onMounted(() => {
  console.log("mounted2");
});

onUpdated(() => {
  console.log("updated");
});

onUnmounted(() => {
  console.log("unmounted");
});
</script>

<style></style>
