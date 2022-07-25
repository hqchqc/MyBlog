<template>
  <Home />
  <button @click="increament">{{ counter }}</button>
</template>

<script setup>
import { provide, readonly, ref } from "vue";
import Home from "./Home.vue";

const name = ref("coderwhy");
// ref更方便组件抽取
let counter = ref(100);
provide("name", readonly(name));
provide("counter", readonly(counter));

const increament = () => {
  counter.value++;
};
</script>

<style></style>
