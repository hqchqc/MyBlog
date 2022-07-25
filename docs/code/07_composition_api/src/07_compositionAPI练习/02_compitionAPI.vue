<template>
  <div>
    <h3>当前计数： {{ counter }}</h3>
    <h3>*2: {{ doubleCounter }}</h3>
    <button @click="increament">+1</button>
    <button @click="decreament">-1</button>
  </div>
</template>

<script setup>
import useCounter from "./hooks/useCounter";
const { counter, doubleCounter, increament, decreament } = useCounter();
</script>

<style></style>
