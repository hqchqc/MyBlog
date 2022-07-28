<template>
  <div>
    <input type="text" v-focus.aaa.bbb="'hqc'" />
  </div>
</template>

<script setup>
// 局部指令
const vFocus = {
  // 在绑定元素的attribute前 或 事件监听器应用前调用
  created: (el, binding, vnod, prevVnode) => {
    console.log(el, binding, vnod, prevVnode);
  },
  // 在元素被插入到DOM前调用
  beforeMount: () => {},
  // 在绑定元素的父组件
  // 及她自己的所有子组件被插入到DOM后调用
  mounted: (el) => el.focus(),
  // 绑定元素的父组件更新前调用
  beforeUpdate: () => {},
  // 在绑定元素的父组件及她自己的所有子组件都更新后调用
  updated: () => {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount: () => {},
  // 绑定元素的父组件卸载后调用
  unmounted: () => {},
};
</script>

<style></style>
