<template>
  <my-slot-cpn>
    <button>我是按钮</button>
  </my-slot-cpn>

  <my-slot-cpn>
    <my-button></my-button>
  </my-slot-cpn>

  <my-slot-cpn></my-slot-cpn>
</template>

<script>
import MySlotCpn from "./MySlotCpn.vue";
import MyButton from "./MyButton.vue";

export default {
  components: {
    MySlotCpn,
    MyButton,
  },
};
</script>

<style></style>
