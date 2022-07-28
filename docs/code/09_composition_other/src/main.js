import { createApp } from "vue";
import registerDirectives from "./directives/index";
import pluginObject from "./05_plugins/plugins_object";
import pluginFunction from "./05_plugins/plugin_function";
// import App from './App.vue'
// import App from "./02_jsx的使用/App.vue";
// import App from "./03_自定义指令/App.vue";
import App from "./04_teleport内置组件/App.vue";

const app = createApp(App);

registerDirectives(app);

app.use(pluginObject);
app.use(pluginFunction);

// 全局指令
// app.directive("focus", {
//   mounted: (el) => el.focus(),
// });

app.mount("#app");
