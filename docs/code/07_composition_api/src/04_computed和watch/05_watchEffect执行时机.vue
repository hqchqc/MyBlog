<template>
  <div>
    <h1 ref="title">哈哈哈</h1>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";

const title = ref(null);

watchEffect(
  () => {
    console.log("title.value", title.value);
  },
  {
    // flush: 'pre' // pre:提前执行，post:放到最后执行
    flush: "post",
  }
);
</script>

<style></style>
