<template>
  <div>
    <h3>当前计数： {{ counter }}</h3>
    <h3>*2: {{ doubleCounter }}</h3>
    <button @click="increament">+1</button>
    <button @click="decreament">-1</button>
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
    increament() {
      this.counter++;
    },
    decreament() {
      this.counter--;
    },
  },
  computed: {
    doubleCounter() {
      return this.counter * 2;
    },
  },
};
</script>

<style></style>
