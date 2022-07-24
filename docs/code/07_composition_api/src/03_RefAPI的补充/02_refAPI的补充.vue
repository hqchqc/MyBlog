<template>
  <h3>{{ info }}</h3>
  <button @click="changeInfo">修改Info</button>
</template>

<script setup>
import { ref, shallowRef, toRef, toRefs, triggerRef } from "vue";

const info = shallowRef({
  name: "why",
});

const changeInfo = () => {
  info.value.name = "james";
  triggerRef(info);
};
</script>

<style></style>
