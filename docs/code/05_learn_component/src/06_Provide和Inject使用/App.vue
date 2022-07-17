<template>
  <home></home>
  <div @click="changeName">加一个name</div>
</template>

<script>
import Home from "./Home.vue";
import { computed } from "vue";

export default {
  components: {
    Home,
  },
  // provide: {
  //   name: "beanbag",
  //   age: 18,
  // },
  provide() {
    return {
      name: "beanbag",
      age: 18,
      length: computed(() => this.names.length),
    };
  },
  data() {
    return {
      names: ["abc", "cba", "nba"],
    };
  },
  methods: {
    changeName() {
      console.log(this.names);
      this.names.push("newLength");
    },
  },
};
</script>

<style></style>
