<template>
  <div>
    <div>Category组件</div>
    <button @click="counter++">{{ counter }}</button>
  </div>
</template>

<script>
export default {
  name: "category",
  data() {
    return {
      counter: 0,
    };
  },
};
</script>

<style></style>
