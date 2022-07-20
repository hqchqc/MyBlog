<template>
  <div>
    <button
      @click="itemClick(item)"
      v-for="item in tabs"
      :key="item"
      :class="{ active: currentTab === item }"
    >
      {{ item }}
    </button>

    <!-- 1. v-if的判断实现 -->
    <!-- <template v-if="currentTab === 'home'">
      <home />
    </template>

    <template v-else-if="currentTab === 'about'">
      <about />
    </template>

    <template v-else>
      <category />
    </template> -->

    <!-- 2. 动态组件实现 -->
    <!-- <component :is="currentTab" name="hhh" :age="18" @pageClick="pageClick" /> -->

    <!-- 3. 保存组件状态 使其不被销毁 -->
    <!-- include exclude max:最大缓存实例 一旦达到了 会把最近没有访问的实例销毁 -->
    <keep-alive include="home,about">
      <component :is="currentTab" name="hhh" :age="18" @pageClick="pageClick" />
    </keep-alive>
  </div>
</template>

<script>
import Home from "./pages/Home.vue";
import About from "./pages/About.vue";
import Category from "./pages/Category.vue";

export default {
  components: {
    Home,
    About,
    Category,
  },
  data() {
    return {
      tabs: ["home", "about", "category"],
      currentTab: "home",
    };
  },
  methods: {
    itemClick(item) {
      this.currentTab = item;
    },
    pageClick() {
      console.log("pageClick发生点击");
    },
  },
};
</script>

<style>
.active {
  color: royalblue;
}
</style>
