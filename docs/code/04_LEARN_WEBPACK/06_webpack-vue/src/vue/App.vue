<template>
  <h2>Vue</h2>
  <h3>{{ title }}</h3>

  <hello-word-vue />
</template>

<script>
import HelloWordVue from "./HelloWord.vue";
export default {
  components: {
    HelloWordVue,
  },
  data() {
    return {
      title: "厉害",
    };
  },
};
</script>

<style scoped>
h2 {
  color: aquamarine;
}
</style>
