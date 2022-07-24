<template>
  <div>
    <h2>{{ state.counter }}</h2>
    <button @click="increament">+1</button>
  </div>
</template>

<script setup>
import { reactive } from "vue";

let counter = 100;
const state = reactive({
  counter,
});

const increament = () => {
  state.counter++;
};
</script>

<style></style>
