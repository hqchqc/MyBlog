<template>
  <div>{{ data }}</div>
  <h2>{{ message }}</h2>
  <button @click="sayHi">点我</button>
</template>

<script>
import { demoMixin } from "./mixins/demoMixin";
export default {
  mixins: [demoMixin],
  data() {
    return {
      data: "这是App",
      message: "App的message",
    };
  },
  created() {
    console.log("这是App的created");
  },
};
</script>

<style></style>
