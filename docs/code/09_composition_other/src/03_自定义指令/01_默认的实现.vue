<template>
  <div>
    <input type="text" ref="input" />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const input = ref(null);
onMounted(() => {
  input.value.focus();
});
</script>

<style></style>
