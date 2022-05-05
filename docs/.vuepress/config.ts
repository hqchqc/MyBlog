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
          "/books/TypeScript入门教程.md",
          "/books/ECMAScript6入门教程.md",
          "/books/JavaScript高级程序设计(第四版).md",
        ],
      },
      {
        text: "框架学习",
        children: ["/frame/React.md", "/frame/Vue2.md", "/frame/Vue3.md"],
      },
      {
        text: "JavaScript",
        children: [
          "/javaScript/排序算法.md",
          {
            link: "/javaScript/深入JavaScript高级语法",
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
      "/javaScript/": [
        {
          text: "深入JavaScript高级语法",
          children: [
            "/javaScript/深入JavaScript高级语法/01_浏览器工作原理和 V8 引擎.md",
            "/javaScript/深入JavaScript高级语法/02_函数执行过程和作用域链.md",
            "/javaScript/深入JavaScript高级语法/03_闭包的定义和内存模型.md",
          ],
        },
      ],
    },
  },
});
