<template>
  <nav-bar :additionSlotName="name">
    <template #leftSlot>
      <my-button>左侧按钮</my-button>
    </template>

    <template v-slot:centerSlot>
      <h2>我是标题</h2>
    </template>

    <template v-slot:rightSlot>
      <i>右边</i>
    </template>

    <template v-slot:[name]>
      <i>动态命名插槽</i>
    </template>
  </nav-bar>
</template>

<script>
import NavBar from "./NavBar.vue";
import MyButton from "./MyButton.vue";

export default {
  components: {
    NavBar,
    MyButton,
  },
  data() {
    return {
      name: "beanbag",
    };
  },
};
</script>

<style scoped></style>
