<template>
  <h2>About组件</h2>
  <button @click="btnClick">About组件按钮点击</button>
</template>

<script>
import emitter from "./utils/eventBus";

export default {
  data() {
    return {};
  },
  methods: {
    btnClick() {
      console.log(" 2", 1);
      emitter.emit("beanbag", {
        message: "发出事件",
      });
    },
  },
};
</script>

<style></style>
