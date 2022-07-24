<template>
  <div>
    <h2>{{ counter }}</h2>
    <button @click="increment">+1</button>
    <button @click="decreament">-1</button>

    <h2>{{ double }}</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 0,
    };
  },
  methods: {
    increment() {
      this.counter++;
    },
    decreament() {
      this.counter--;
    },
  },
  computed: {
    double() {
      return this.counter * 2;
    },
  },
};
</script>

<style></style>
