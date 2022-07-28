<template>
  <div id="app">
    <teleport to="#why">
      <h1>当前计数</h1>
      <button>+1</button>
      <HelloWorld />
    </teleport>
  </div>
  <teleport to="#why">
    <spa>hh</spa>
  </teleport>
</template>

<script setup>
import { getCurrentInstance } from "vue";
import HelloWorld from "./HelloWorld.vue";

const instance = getCurrentInstance();
console.log(instance.appContext.config.globalProperties.$name);
</script>

<style></style>
