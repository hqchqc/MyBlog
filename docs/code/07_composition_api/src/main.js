import { createApp } from "vue";
// import App from "./01_mixin和extends/App";
// import App from "./02_compositionAPI基础/App.vue";
// import App from "./03_RefAPI的补充/App.vue";
import App from "./04_computed和watch/App.vue";

const app = createApp(App);

// 全局混入
app.mixin({
  data() {
    return {
      message2: "这是全局的mixin",
    };
  },
  created() {
    console.log("全局混入");
  },
});

app.mount("#app");
