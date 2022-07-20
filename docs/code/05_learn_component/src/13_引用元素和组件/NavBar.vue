<template>
  <div>
    <h2>NavBar</h2>
    <h3>{{ title }}</h3>
    <button @click="getNode">获取父组件和跟组件</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "通过ref拿navbar组件的data",
    };
  },
  methods: {
    btnClick() {
      console.log("hello");
    },
    getNode() {
      // 获取父组件和根组件
      console.log(this.$parent, this.$root);
    },
  },
};
</script>

<style></style>
