<template>
  <div @click="divClick">home组件</div>
  <h2>{{ age }}</h2>
  <h2>{{ name }}</h2>
</template>

<script>
export default {
  name: "home",
  props: {
    name: {
      type: String,
      default: "",
    },
    age: {
      type: Number,
      default: 1,
    },
  },
  emits: ["pageClick"],
  methods: {
    divClick() {
      this.$emit("pageClick");
    },
  },
};
</script>

<style></style>
