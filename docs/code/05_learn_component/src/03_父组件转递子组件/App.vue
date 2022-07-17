<template>
  <h2>我是父组件</h2>

  <!-- 属性推荐短横线写法 -->
  <show-message :title="title" :content="content"></show-message>
  <show-message :title="title" :content="content"></show-message>
  <!-- 非prop的Attribute -->
  <!-- 1. 如果组件有单个根节点 这个class自动添加到子组件的根节点 -->
  <!-- 2. 不希望组件的根元素继承attribute可以在子组件中的inheritAttrs设置为false 这时可以 通过$attrs来访问所有的非props的attribute-->
  <!-- 3. 多个根节点 会触发警告-->
  <multi-root-element class="00" id="11"></multi-root-element>

  <show-message
    class="OoO"
    id="pp"
    :title="title"
    :content="content"
  ></show-message>
</template>

<script>
import ShowMessage from "./ShowMessage.vue";
import MultiRootElement from "./MultiRootElement.vue";

export default {
  components: { ShowMessage, MultiRootElement },
  data() {
    return {
      title: "123",
      content: "我是content",
    };
  },
};
</script>

<style></style>
