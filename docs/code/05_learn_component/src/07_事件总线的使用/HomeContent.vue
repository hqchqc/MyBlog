<template>
  <h2>HomeContent: {{ name }} - {{ age }}</h2>
  <h2>{{ length.value }}</h2>
</template>

<script>
import emitter from "./utils/eventBus";

export default {
  inject: ["name", "age", "length"],
  created() {
    // 1. 取消所有监听
    // emitter.all.clear();
    // 2. 取消监听某一个
    // emitter.off('beanbag',函数实例)

    emitter.on("beanbag", (data) => {
      console.log("收到事件总线啦", data);
    });

    emitter.on("none", (data) => {
      console.log(11);
      console.log("没有的事件", data);
    });

    emitter.on("*", (type, data) => {
      console.log(11);
      console.log("监听所有事件", type, data);
    });
  },
};
</script>

<style></style>
