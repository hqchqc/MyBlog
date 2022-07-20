<template>
  <div>
    <home />
    {{ msg }}
    <button @click="btnClick">查看update</button>
  </div>
</template>

<script>
import Home from "./Home.vue";

export default {
  components: {
    Home,
  },
  data() {
    return {
      msg: "Hello Vue!",
    };
  },
  methods: {
    btnClick() {
      this.msg = "Hello Vue11111!";
    },
  },
  beforeCreate() {
    console.log("组件还没有创建");
  },
  created() {
    console.log("组件实例已经创建");
  },
  beforeMount() {
    console.log("模板已编译 组件已挂载");
  },
  mounted() {
    console.log("$el已创建 真正可以获取组件了");
  },
  beforeUnmount() {
    console.log("销毁之前");
  },
  unmounted() {
    console.log("销毁之后");
  },
  beforeUpdate() {
    console.log("数据发生改变 界面更新(DOM)之前");
  },
  updated() {
    console.log("数据发生改变 界面更新(DOM)之后");
  },
  // 还有两个生命周期函数是和keepalive相关的
  // 因为keepalive是不会销毁的 所以unmounted不会被调用
  // 1. acticated  2. deactivated
  activated() {
    console.log("keep alive中使用的 选中时激活");
  },
  deactivated() {
    console.log("keep alive中使用的 离开选中时激活");
  },
};
</script>

<style></style>
