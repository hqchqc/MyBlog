<template>
  <div>
    <button @click="increament">+1</button>
    <button @click="decreament">-1</button>

    <input v-model.number="num" />
    <button @click="increamrntN">+n</button>
  </div>
</template>

<script>
export default {
  // emits: ["add", "sub", "addN"],
  emits: {
    add: null,
    sub: null,
    addN: (payload, a, b) => {
      console.log("payload", payload, a, b);
      if (payload > 10) {
        return true;
      }
      return false;
    },
  },
  data() {
    return {
      num: 0,
    };
  },
  methods: {
    increament() {
      console.log("+1");
      this.$emit("add");
    },
    decreament() {
      console.log("-1");
      this.$emit("sub");
    },
    increamrntN() {
      console.log("+N");
      this.$emit("addN", this.num, "aa", 11);
    },
  },
};
</script>

<style></style>
