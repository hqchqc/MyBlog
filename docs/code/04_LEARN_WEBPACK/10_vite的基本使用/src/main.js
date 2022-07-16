import { sum } from "./js/math";
import _ from "lodash-es";
import "./css/style.css";
import "./css/title.less";
import mul from "./ts/mul.ts";
import { createApp } from "vue";
import App from "../vue/App.vue";

console.log("hello");
console.log(sum(20, 30));

console.log(_.join(["a", "b", "c"], "~"));
console.log(mul(20, 30));

// 需要解决的问题： 1. 网络请求多 资源占用大  2. 导入时需要填写文件后缀

const titleEl = document.createElement("div");
titleEl.className = "title";
titleEl.innerHTML = "hello vite";
document.body.appendChild(titleEl);

createApp(App).mount("#app");

// 会在nodemodules中的.vite文件里预打包nodemodules里的一些模块
