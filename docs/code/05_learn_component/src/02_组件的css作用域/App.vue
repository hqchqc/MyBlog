<template>
  <h2 class="title">App</h2>
  <hello-world></hello-world>
</template>

<script>
import HelloWorld from "./HelloWorld.vue";

export default {
  components: { HelloWorld },
  data() {
    return {};
  },
};
</script>

<style scoped>
/* 尽量避免 */
/* h2 {
  color: aqua;
} */
.title {
  color: red;
}
</style>
