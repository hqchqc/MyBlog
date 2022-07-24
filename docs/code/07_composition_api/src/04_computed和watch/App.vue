<template>
  <div>
    <h3>{{ info.name }}</h3>
    <h3>{{ name }}</h3>
    <button @click="changeData">xiua</button>
  </div>
</template>

<script setup>
import { reactive, watch, ref } from "vue";

const info = reactive({ name: "why", age: 18, friends: { name: "kobe" } });
const name = ref("why");

watch(
  () => ({ ...info }),
  (newValue, oldValue) => {
    console.log("newValue", newValue);
    console.log("oldValue", oldValue);
  },
  {
    deep: true,
    immediate: true,
  }
);

const changeData = () => {
  // info.name = "james";
  info.friends.name = "my";
};
</script>

<style></style>
