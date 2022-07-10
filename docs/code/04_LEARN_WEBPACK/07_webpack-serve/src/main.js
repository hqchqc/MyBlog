import { sum } from "./js/math";
const { priceFormat } = require("./js/format");

// 需要指定一下版本 因为是在webpack中使用 需要存在compiler模块 只有runttime是不够的
// import { createApp } from "vue/dist/vue.esm-bundler.js";
import { createApp } from "vue";

import App from "./vue/App.vue";

import "./js/element";

console.log(sum(1, 2));
console.log(priceFormat());

const message = "babel的使用";
const names = ["babel", "webpack", "react"];

names.forEach((item) => {
  console.log("item", item);
});

console.log("message", message);

// vue代码
// const app = createApp({
//   template: `#my-app`,
//   data() {
//     return {
//       title: "Vue",
//     };
//   },
// });

const app = createApp(App);
app.mount("#app");

console.log("测试直接脚本加 -watch自动编译");
console.log("测试配置项watch");
