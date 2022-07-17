<template>
  <h2>HomeContent: {{ name }} - {{ age }}</h2>
  <h2>{{ length }}</h2>
</template>

<script>
export default {
  inject: ["name", "age", "length"],
};
</script>

<style></style>
