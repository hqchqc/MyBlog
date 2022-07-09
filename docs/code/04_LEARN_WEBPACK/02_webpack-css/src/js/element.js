// css-loader配置方式一  内联配置
// import "css-loader!../css/style.css";
import "../css/style.css";
import "../css/title.less";

const divEl = document.createElement("div");
divEl.className = "title";
divEl.innerHTML = "Hello World";

document.body.appendChild(divEl);
