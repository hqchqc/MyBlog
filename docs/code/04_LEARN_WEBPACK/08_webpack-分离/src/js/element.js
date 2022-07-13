// css-loader配置方式一  内联配置
// import "css-loader!../css/style.css";
import "../css/style.css";
import "../css/title.less";
import "../css/image.css";
import "../font/iconfont.css";

import img from "../img/CAR_E70_WHITE.png";

const divEl = document.createElement("div");
divEl.className = "title";
divEl.innerHTML = "Hello World";

// 1.设置背景
const bgDivEl = document.createElement("div");
bgDivEl.className = "image-bg";

// 2.图片
const imgEl = document.createElement("img");
imgEl.src = img;

// 3.字体
const iEl = document.createElement("i");
iEl.className = "iconfont icon-fendiqidian";

// console.log(content.length);
console.log("ee");
console.log("ee");

document.body.appendChild(divEl);
document.body.appendChild(bgDivEl);
document.body.appendChild(imgEl);
document.body.appendChild(iEl);
