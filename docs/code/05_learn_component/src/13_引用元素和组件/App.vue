<template>
  <div>
    <h2 ref="title1">hhh1</h2>
    <h2 ref="title2">hhh2</h2>
    <h2 ref="title3">hhh3</h2>

    <nav-bar ref="navBar" />

    <button @click="btnClick">获取元素</button>
  </div>
</template>

<script>
import NavBar from "./NavBar.vue";
export default {
  components: {
    NavBar,
  },
  methods: {
    btnClick() {
      console.log(this.$refs.navBar.btnClick());
    },
  },
};
</script>

<style></style>
