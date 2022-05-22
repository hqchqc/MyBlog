import { defineUserConfig } from "vuepress";
import { comment } from "vuepress-plugin-comment2";
import type { DefaultThemeOptions } from "vuepress";
const locale = {
  nick: "昵称",
  nickError: "昵称不能少于3个字符",
  mail: "邮箱",
  mailError: "请填写正确的邮件地址",
  link: "网址",
  placeholder: "欢迎评论哦",
  sofa: "来发评论吧~",
  submit: "提交",
  reply: "回复",
  cancelReply: "取消回复",
  comment: "评论",
  more: "加载更多...",
  preview: "预览",
  emoji: "表情",
  uploadImage: "上传图片",
  seconds: "秒前",
  minutes: "分钟前",
  hours: "小时前",
  days: "天前",
  now: "刚刚",
  uploading: "正在上传",
  login: "登录",
  logout: "退出",
  admin: "博主",
  word: "字",
  wordHint: "评论字数应在 $0 到 $1 字之间！\n当前字数：$2",
};
export default defineUserConfig<DefaultThemeOptions>({
  // 站点配置
  lang: "en-US",
  title: "beanBag",
  description: "记录前端开发日常",
  base: "/",
  head: [
    ["link", { rel: "manifest", href: "/manifest.webmanifest" }],
    ["link", { rel: "icon", href: "/image/header.png" }],
    ["link", { rel: "shortcut icon", href: "favicon.ico" }],
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    [
      "script",
      {},
      `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?41852977b8b2d3e3765fc0b54a74996f";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
      `,
    ],
  ],
  plugins: [
    ["@vuepress/pwa"],
    ["@vuepress/plugin-pwa-popup"],
    comment({
      serverURL: "https://blog-talk-api-2023sarbn-hqchqc.vercel.app/",
      type: "waline",
      locale,
    }),
  ],

  // 主题和它的配置
  theme: "@vuepress/theme-default",
  themeConfig: {
    logo: "/image/header.png",
    //顶部导航栏
    navbar: [
      //格式一：直接跳转，'/'为不添加路由，跳转至首页
      { text: "首页", link: "/" },

      //格式二：添加下拉菜单，link指向的文件路径
      {
        text: "前端书籍",
        children: [
          // {
          //   link: "/books/TypeScript/TypeScript入门教程",
          //   text: "TypeScript入门教程",
          // },
          {
            link: "/books/ECMAScript6/ECMAScript6入门教程",
            text: "ECMAScript6入门教程",
          },
          "/books/TypeScript入门教程.md",
        ],
      },
      {
        text: "框架学习",
        children: [
          {
            link: "/frame/Vue2/Vue2",
            text: "Vue2",
          },
        ],
      },
      {
        text: "JavaScript",
        children: [
          {
            link: "/javaScript/AlgorithmSort/排序算法",
            text: "排序算法",
          },
          {
            link: "/javaScript/JavaScriptAdvanced/深入JavaScript高级语法",
            text: "深入JavaScript高级语法",
          },
        ],
      },

      //格式三：跳转至外部网页，需http/https前缀
      { text: "Github", link: "https://github.com/hqchqc" },
    ],
    // 侧边栏
    // 不同子路径下的页面会使用不同的侧边栏
    sidebar: {
      "/books/ECMAScript6": [
        {
          text: "ECMAScript6入门教程",
          children: [
            "/books/ECMAScript6/ECMAScript6入门教程/01_let和const命令.md",
            "/books/ECMAScript6/ECMAScript6入门教程/02_变量的解构赋值.md",
            "/books/ECMAScript6/ECMAScript6入门教程/03_字符串的扩展.md",
          ],
        },
      ],
      "/frame/Vue2": [
        {
          text: "Vue2",
          children: [
            "/frame/Vue2/Vue2/01_初体验.md",
            "/frame/Vue2/Vue2/02_MVVM、插值操作及绑定属性.md",
            "/frame/Vue2/Vue2/03_动态绑定 style 及计算属性.md",
            "/frame/Vue2/Vue2/04_事件监听、条件判断及循环的使用.md",
            "/frame/Vue2/Vue2/05_购物车案例.md",
            "/frame/Vue2/Vue2/06_表单绑定、组件化及 ES6 语法的补充.md",
            "/frame/Vue2/Vue2/06_表单绑定、组件化及 ES6 语法的补充.md",
            "/frame/Vue2/Vue2/07_父子组件之间访问及插槽使用相关.md",
            "/frame/Vue2/Vue2/08_webpack 的使用及 ES6 相关.md",
            "/frame/Vue2/Vue2/09_webpack 中的 loader、配置 vue 及插件使用.md",
            "/frame/Vue2/Vue2/10_webpack 插件相关、配置分离及 CLI 的安装.md",
            "/frame/Vue2/Vue2/11_webpack 中 VueCLI3 的创建及 ES6 相关.md",
            "/frame/Vue2/Vue2/12_vue 中的路由基本使用.md",
            "/frame/Vue2/Vue2/13_动态路由、懒加载、嵌套路由及传递参数相关.md",
            "/frame/Vue2/Vue2/14_导航守卫、keep-alive、项目相关.md",
            "/frame/Vue2/Vue2/15_Promise 的使用及了解 Vuex.md",
            "/frame/Vue2/Vue2/16_Vuex 中各个属性的使用.md",
            "/frame/Vue2/Vue2/17_网络请求模块 axios 及项目相关.md",
            "/frame/Vue2/Vue2/18_axios.md",
            "/frame/Vue2/Vue2/19_项目相关.md",
          ],
        },
      ],
      "/javaScript/AlgorithmSort": [
        {
          text: "排序算法",
          children: [
            "/javaScript/AlgorithmSort/排序算法/01_冒泡排序.md",
            "/javaScript/AlgorithmSort/排序算法/02_选择排序.md",
            "/javaScript/AlgorithmSort/排序算法/03_插入排序.md",
            "/javaScript/AlgorithmSort/排序算法/04_希尔排序.md",
            "/javaScript/AlgorithmSort/排序算法/05_归并排序.md",
            "/javaScript/AlgorithmSort/排序算法/06_快速排序.md",
          ],
        },
      ],
      "/javaScript/JavaScriptAdvanced": [
        {
          text: "深入JavaScript高级语法",
          children: [
            "/javaScript/JavaScriptAdvanced/深入JavaScript高级语法/01_浏览器工作原理和 V8 引擎.md",
            "/javaScript/JavaScriptAdvanced/深入JavaScript高级语法/02_函数执行过程和作用域链.md",
            "/javaScript/JavaScriptAdvanced/深入JavaScript高级语法/03_闭包的定义和内存模型.md",
            "/javaScript/JavaScriptAdvanced/深入JavaScript高级语法/04_内存回收和this绑定规则.md",
            "/javaScript/JavaScriptAdvanced/深入JavaScript高级语法/05_this绑定规则细节及巩固.md",
            "/javaScript/JavaScriptAdvanced/深入JavaScript高级语法/06_实现apply、call及bind.md",
            "/javaScript/JavaScriptAdvanced/深入JavaScript高级语法/07_纯函数-柯里化实现-组合函数.md",
            "/javaScript/JavaScriptAdvanced/深入JavaScript高级语法/08_with-eval-严格模式-面向对象.md",
          ],
        },
      ],
    },
  },
});
