# 14\_导航守卫、keep-alive、项目相关

## 一. 导航守卫

- 背景：有时候在我们的项目中，需要在跳转路由的时候进行相关操作，比如有这么一个需求，当我们跳转页面时，页面的 title 会随之发生改变，这时候就要用到我们的导航守卫。**导航守卫主要是用来监听路由的进入和离开，vue-router 提供的 beforeEach 和 afterEach 的钩子函数，他们会在路由即将改变前和改变后触发**
- 相关知识： 1. 生命周期函数
  在 Vue 中有几个生命周期函数需要我们了解一下
  `created() `: 组件被创建完成后回调
  `destroyed() `: 组件被销毁后回调
  `mounted() `: 创建组件后(template)挂载在 DOM 上回调
  `updated() `: 界面发生更新时回调
  几个生命周期函数配合我们的全局守卫是比较好用的，上面那个案例我们使用 created 函数也是可以解决的，但是一旦项目较大的时候，会比较不方便 2. 全局守卫
  `beforeEach()`，在源码中描述它为 guard，也就是守卫
  `afterEach` 在源码中描述它为 hook，也就是钩子
  在以上两个全局守卫中都需要我们传递一个匿名函数进行回调，在上面那个函数也就是`router.beforeEach()`需要我们往匿名函数中传递三个参数(to,from,next)，我们必须在手动调用 next(),使它进行路由跳转，下面一个函数就不需要传递 next
  **to: 代表即将要进入的目标的路由对象
  from: 当前导航即将要离开的路由对象
  next: 调用该方法后才能进入下一个钩子** 3. 路由独享的守卫及组件内的守卫
  在 vue 中还存在有其它的守卫，也就是路由独享的守卫和组件内的守卫，路由独享的守卫比如有 **beforeEnter**,组件内的守卫比如有 **beforeRouterEnter 及 beforeRouterUpdate**，这些了解即可，用到的时候可以翻阅文档

- 使用
  在配置路由的 index.js 中，使用相关的导航守卫即可，这里使用 beforeEach 做示范

```javascript
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  document.title = to.matched[0].meta.title;
  next();
});
```

meta 是在配置路由时加入的数据里面包含有 title，matched[0]的使用时由于存在嵌套路由，所以拿不到首页的 title，所以我们要到 matched 数组中拿到

```javascript
const routes = [
  {
    path: "",
    redirect: "/home",
  },
  {
    path: "/user/:userId",
    component: user,
    meta: {
      title: "用户",
    },
    // beforeEnter: (to, from, next) => {
    //     console.log('我是路由独享守卫');
    //     next();
    // }
  },
  {
    path: "/home",
    component: index,
    children: [
      {
        path: "",
        redirect: "message",
      },
      {
        path: "message",
        component: indexMessage,
      },
      {
        path: "news",
        component: indexNews,
      },
    ],
    meta: {
      title: "首页",
    },
  },
  {
    path: "/about",
    component: about,
    meta: {
      title: "关于",
    },
  },
  {
    path: "/profile",
    component: profile,
    meta: {
      title: "档案",
    },
  },
];
```

## 二. keep-alive

- 背景：在我们前几天的学习中，曾经提过一个需求我们当时没有实现，也就是在一个页面中存在嵌套路由，当我们点击嵌套路由中的那个路由时，跳转到其它路由，我们希望在跳转回来时，界面仍然跳转到之前访问的嵌套路由的那个页面，这就需要我们的 keep-alive，**它是 Vue 内置的一个组件，可以使被包含的组件保留状态或避免重新渲染**
- 使用：此函数的使用较为简单，只需要在`<router-view>`标签的外部包一层`keep-alive`即可，这里我们结合了组件内的守卫`beforeRouteLeave`和`activated`的使用完成了上面那个需求，在首页这个组件中使用组件内的守卫`beforeRouteLeave`拿到现在访问的路径，当再次访问此组件时，使用`activated`手动进行路由跳转，路径指定为使用组件内的守卫拿到的那个路径即可

```javascript
activated() {
    this.$router.push(this.path);
},
beforeRouteLeave (to, from, next) {
    this.path = this.$route.path;
    next();
}
```

- 补充：需要注意的是`activated()和deactivated()`两个函数**只有在该组件为保持状态时，也就是使用了 keep-alive 时才有效**，否则都是重新创建，并不是处于活跃的。
  另外这个 keep-alive 标签中有两个属性，`include`和`exclude`包含和排除，后面可以跟字符串或者是正则表达式，**只有匹配到的组件才会被缓存或是不缓存**，多个组件之间用逗号分隔，不能有空格。例如

```javascript
<keep-alive exclude="user,profile">
  <router-view></router-view>
</keep-alive>
```

## 三. 项目相关(TabBar 的封装)

这是后面需要完成的一个项目中的一个组件，到最后我再把整个项目一起放上来好了
