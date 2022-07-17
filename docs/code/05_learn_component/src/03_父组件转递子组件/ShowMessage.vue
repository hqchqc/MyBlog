<template>
  <div>
    <h2 :class="$attrs.class">{{ title }}</h2>
    <h2>{{ content }}</h2>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  // 1. 数组写法 不能对props做任何限制
  // props: ["title", "content"],

  // 2. 对象写法 做限制 类型 是否必传 默认值
  props: {
    title: String,
    content: {
      type: String,
      // required: true,
      default: "123",
    },
    // 多个可能的类型
    propsB: [String, Number],
    // 如果是引用数据类型则default的类型必须是函数
    propsA: {
      type: Object,
      // 多次使用子组件会有问题 必须是函数 改一个全都会被改
      // default: { name: "hhh" },
      default() {
        return { name: "hhh" };
      },
    },
    propsC: {
      validator(value) {
        return ["success", "warning"].includes(value);
      },
    },
  },
};
</script>

<style></style>
