import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";

export default defineUserConfig<DefaultThemeOptions>({
  // 站点配置
  lang: "en-US",
  title: "beanBag",
  description: "记录前端开发日常",
  base: "/",
  head: [["link", { rel: "icon", href: "/image/header.png" }]],
  plugins: [
    ["@vuepress/pwa"],
    [
      "@vuepress/plugin-pwa-popup",
      {
        locales: {
          "/": {
            message: "New content is available.",
            buttonText: "Refresh",
          },
          "/zh/": {
            message: "发现新内容可用",
            buttonText: "刷新",
          },
        },
      },
    ],
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
          "/books/ECMAScript6入门教程.md",
          "/books/JavaScript高级程序设计(第四版).md",
        ],
      },
      { text: "框架学习", children: ["/frame/React.md", "/frame/Vue.md"] },
      {
        text: "JavaScript",
        children: ["/javaScript/Algorithm.md"],
      },

      //格式三：跳转至外部网页，需http/https前缀
      { text: "Github", link: "https://github.com/hqchqc" },
    ],
  },
});
