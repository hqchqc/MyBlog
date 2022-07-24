<template>
  <div>
    <input v-model="message" />
    <h2>{{ message }}</h2>
  </div>
</template>

<script setup>
import debounceRef from "./hook/useDebounceRef";

// const message = ref("Hello word");
const message = debounceRef("Hello word");
</script>

<style></style>
