<template>
  <div>
    <h2 v-format-time="'YYYY/MM/DD'">{{ timestamp }}</h2>
  </div>
</template>

<script setup>
const timestamp = 1658932112;
</script>

<style></style>
