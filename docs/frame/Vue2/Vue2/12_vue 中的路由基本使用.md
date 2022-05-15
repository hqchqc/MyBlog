# 12_vue 中的路由基本使用

## 一. 概念相关

- 什么是路由

  ​ 路由就是通过互联的网络把信息从源地址传输到目的地址的活动(维基百科)

  ​ 路由器提供了两种机制，路由和转送

  1. 路由：路由是决定数据包从来源到目的地的途径

  2. 转送：转送是将输入端的数据转移到合适的输出端

     路由表：本质上就是一个映射表，决定了数据包的指向

- 什么是前端渲染、前端路由、后端渲染、后端路由

  ​ **在网站开发早期阶段（后端路由阶段）**，整个 html 页面是由服务器来渲染的，并返回给客户端进行展示，这种由服务器完成网址与对应页面的映射叫做后端路由，当然缺点也是非常明显的，后端人员需要负责整个页面的开发，对前端开发人员要求高，html 代码和数据混合在一起都非常糟糕，**到了网站开发的中期（前后端分离阶段）**，随着 Ajax 技术的出现，有了前后端分离的开发模式，后端专注于数据的处理，而前端专注页面的交互和可视化上，目前很多的网站依然采用这种模式，到目前的一部分公司已经到了**单页面富应用阶段（SPA）**，也就是在前后端分离的基础上加了一层前端路由，也就是前端来维护一套路由规则。

## 二. 如何改变 URL 并使页面不刷新

- hash

  vue-router 默认的使用方式，地址栏会有一个#号，在浏览器中可以使用`location.hash = 'home'`来观察其模式，使用这个模式可以实现

- HTML5 的 history 模式（地址栏不会出现# 所以较多使用）

  1. `history.pushState({},'','home')`它采用的是**栈结构**，可以记录我们浏览的历史，我们可以用前进和后退的方式对页面进行访问。
  2. `history.replaceState({},'','home')`和第一个 pushState 模式不同的是他不能使用我们的前进和后退对我们的页面进行访问
  3. `history.go(-1)`栈中弹出一个地址
  4. `history.back`此方法等价于`history.go(-1)`
  5. `history.forward`此方法等价于`history.go(1)`

## 三.vue-router 安装和配置方式

- 概念

  Vue 中的 route 是基于路由和组件的，路由用于设定访问路径，将路径和组件映射起来，在 vue-router 的单页面富应用中，页面的路径的改变就是组件的切换

- 安装：`npm install vue-router --save`

- 使用：

- 1. 导入路由对象，并且调用`Vue.use(插件)`安装插件
  2. 创建路由实例，并且传入路由映射配置
     2.1. 创建路由组件
     2.2. 配置路由映射，即组件和路径的映射关系
     2.3. 使用路由，通过 `router-link`和`router-view`标签
  3. 在 Vue 实例中挂在创建的路由实例

  下面是完整的 vue-router 代码 router 文件夹下的 index.js

  ```javascript
  import VueRouter from "vue-router";
  import Vue from "vue";
  import index from "../components/index.vue";
  import about from "../components/about.vue";

  // 1.导入路由对象 安装插件
  Vue.use(VueRouter);

  // 2.创建路由实例，并且传入路由映射配置
  const routes = [
    {
      path: "",
      redirect: "/home",
    },
    {
      path: "/home",
      component: index,
    },
    {
      path: "/about",
      component: about,
    },
  ];

  const router = new VueRouter({
    routes,
    // mode: 'history',
    // linkActiveClass: 'active'
  });

  // 3.在Vue实例中挂载创建的路由实例
  export default router;
  ```

  App.vue 代码：

  ```javascript
  <template>
    <div id="app">
      <router-link to="/home">首页</router-link>
      <router-link to="/about">关于</router-link>
      <router-view></router-view>
    </div>
  </template>

  <script>
  export default {
    name: 'App',
  }
  </script>

  <style>
  </style>

  ```

  components 文件夹下的 about.vue 组件

  ```javascript
  <template>
      <div>
          <p>我是关于组件嗷 别认错了</p>
      </div>
  </template>

  <script>
  export default {
      name: 'about'
  }
  </script>

  <style>

  </style>
  ```

  components 文件夹下的 index.vue 组件

  ```javascript
  <template>
      <div>
          <p>我是首页组件嗷</p>
      </div>
  </template>

  <script>
  export default {
      name: 'index'
  }
  </script>

  <style>

  </style>
  ```

  main.js 文件

  ```JavaScript
  import Vue from 'vue'
  import App from './App'
  import routes from './router/index.js'

  Vue.config.productionTip = false

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router:routes,
    render: h => h(App)
  })

  ```

  注意：这里面有一个坑，**在创建路由实例的时候，让我们传入路由映射配置时，这里我写的是`routes`，倘若你想叫其他名字，就必须写成`routes: 你的名字`。否则就必须定义为 routes**，main.js 中挂载实例的时候也同理，简写可以直接写`router`,如果你要自己命名，就必须写成`router: 你的名字`，千万要注意!

- 一些参数的问题

  1. 在 vue-router 中，可以添加一个默认的路径，比如开发过程中我们需要用户已进入我们的网页首先就跳转到某一个页面时，就需要我们添加一个默认的路径,这时你需要再配置一个映射关系，代码如下：

     ```javascript
     const routes = [
       {
         path: "", //此处不写就代表一个默认路径，或者只写一个/
         redirect: "/home", //此处指默认路径重定向的路径
       },
       {
         path: "/home",
         component: index,
       },
       {
         path: "/about",
         component: about,
       },
     ];
     ```

  2. 在 vue-router 的默认配置中是使用 hash 模式的，我们可以将它修改为 history 模式，只需要在创建实例的时候再传入一个参数，如下：

     ```javascript
     const router = new VueRouter({
       routes,
       mode: "history", //将模式修改为history
       // linkActiveClass: 'active'
     });
     ```

  3. router-link 的其它属性

     - tag：可以指定 router-link 之后在页面上不被渲染成 a 标签，可以指定渲染成按钮等其它标签

       `<router-link to='/about' tag="button">关于</router-link>`

     - replace: 不会留下 history 记录，也就是不能使用前进后退键跳转页面

       `<router-link to='/about' replace>关于</router-link>`

     - active-class: 当我们选中标签时，默认会将此标签新增一个 router-link-active 样式，我们可以重新命名这个样式，只需要使用这个属性(以下这个案例就被修改为 active)

       `<router-link to='/home' active-class='active'>首页</router-link>`

       当我们需要修改多个名称时，不必每一个都这样修改，可以直接在创建实例的时候传入一个属性，如下：

       ```javascript
       const router = new VueRouter({
         routes,
         mode: "history",
         linkActiveClass: "active",
       });
       ```

- 通过代码跳转页面

  有时候我们没有在模板中定义 router-link 这个标签，我们可以使用通过代码跳转页面的方式进行，比如我们定义的是 button 标签，这时候我们只要监听 button 的点击事件，并在事件中使用$**router**属性即可实现页面跳转，此属性是 vue-router 给每一个组件中都会默认添加的属性，使用代码如下：

  ```javascript
  <template>
    <div id="app">
      <router-link to="/home">首页</router-link>
      <router-link to="/about">关于</router-link>
      <router-view></router-view>
    </div>
  </template>

  <script>
  export default {
    name: 'App',
     methods: {
       clickHome(){
          this.$router.push('/home');
         // this.$router.replace('/home');
         console.log('aa');
       },
       clickAbout(){
          this.$router.push('/about');
         // this.$router.replace('/about');
         console.log('bb');
      }
     },
  }
  </script>

  <style>
  </style>

  ```

  同样的我们也可以使用 replace 等方法进行控制页面跳转。
