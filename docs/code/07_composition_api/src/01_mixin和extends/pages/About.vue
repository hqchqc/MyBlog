<template>
  <div>
    <h1>About</h1>
    <h2>{{ data }}</h2>
    <h2>{{ message }}</h2>
  </div>
</template>

<script>
import BasePageVue from "./BasePage.vue";

export default {
  extends: BasePageVue,
  data() {
    return {
      data: "这是About",
      message: "About的message",
    };
  },
  created() {
    console.log("这是About的created");
  },
};
</script>

<style></style>
