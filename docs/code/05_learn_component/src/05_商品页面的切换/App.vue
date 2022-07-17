<template>
  <tab-control :titles="titles" @itemClick="itemClick"></tab-control>
  <h2>{{ contents[currentIndex] }}</h2>
</template>

<script>
import TabControl from "./TabControl.vue";

export default {
  components: {
    TabControl,
  },
  data() {
    return {
      titles: ["衣服", "鞋子", "裤子"],
      contents: ["衣服页面", "鞋子页面", "裤子页面"],
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
    },
  },
};
</script>

<style></style>
