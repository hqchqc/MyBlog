<template>
  <div>
    <h3>{{ info.name }}</h3>
    <h3>{{ name }}</h3>
    <button @click="changeData">xiua</button>
  </div>
</template>

<script setup>
import { reactive, watch, ref } from "vue";

const info = reactive({ name: "why", age: 18 });
const name = ref("why");

// watch([info, name], (newValue, oldValue) => {
//   console.log("newValue", newValue);
//   console.log("oldValue", oldValue);
// });

watch([() => ({ ...info }), name], (newValue, oldValue) => {
  console.log("newValue", newValue);
  console.log("oldValue", oldValue);
});

const changeData = () => {
  info.name = "aa";
};
</script>

<style></style>
