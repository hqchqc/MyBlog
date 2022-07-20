<template>
  App组件
  <home />

  <!-- 提供两个插槽 (悬念 悬而未决的) -->
  <suspense>
    <template #default>
      <async-category />
    </template>
    <!-- default不能加载时加载loading -->
    <template #fallback>
      <loading />
    </template>
  </suspense>
</template>

<script>
// vue3中的分包
import { defineAsyncComponent } from "vue";

import Home from "./Home.vue";
import Loading from "./Loading.vue";
// import AsyncCategory from "./AsyncCategory.vue";

// 写法一 工厂函数
const AsyncCategory = defineAsyncComponent(() => import("./AsyncCategory.vue"));

// 写法二
// const AsyncCategory = defineAsyncComponent({
//   loader: () => import("./AsyncCategory.vue"),
//   loadingComponent: Loading,
//   // 加载失败的组件
//   // errorComponent:
//   // 延迟加载 在显示loading组件之前等待多长时间
//   delay: 20000,
//   onError: (err, retry, fail, attempts) => {
//     // err 错误信息
//     // retry：调用retry尝试重新加载
//     // fail：只是加载程序结束退出
//     // attempts：记录尝试的次数
//   },
// });

export default {
  components: {
    Home,
    AsyncCategory,
    Loading,
  },
  data() {
    return {
      counter: 11,
    };
  },
};
</script>

<style></style>
