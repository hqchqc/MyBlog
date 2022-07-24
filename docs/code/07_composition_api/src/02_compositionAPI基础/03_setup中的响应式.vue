<template>
  <h2>{{ state.counter }}</h2>
  <button @click="increament">+1</button>
</template>

<script setup lang="ts">
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
