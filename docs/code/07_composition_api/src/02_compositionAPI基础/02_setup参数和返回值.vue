<template>
  <h2>home</h2>
  <h2>{{ message }}</h2>
  <h2>{{ a }}</h2>
  <button @click="increament">+1</button>
</template>

<script setup>
// 参数一 props 父组件传递过来属性
const props = defineProps({
  message: String,
});
let a = 10;
const increament = () => {
  a++;
  console.log(a);
};

// 参数二 context 父组件传递过来的上下文
// attr: useAttrs
// slot
// emit: defineEmits

// 返回值可以直接在temlate中使用

console.log(props.message);
</script>

<style></style>
