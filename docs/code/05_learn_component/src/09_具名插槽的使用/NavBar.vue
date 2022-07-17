<template>
  <div class="nav-bar">
    <div class="left">
      <!-- slot默认有一个名字叫default -->
      <slot name="leftSlot"></slot>
    </div>
    <div class="center">
      <slot name="centerSlot"></slot>
    </div>
    <div class="right">
      <slot name="rightSlot"></slot>
    </div>
    <div class="addition">
      <slot :name="additionSlotName"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    additionSlotName: String,
  },
  // data() {
  //   return {
  //     additionSlotName: "additionSlot",
  //   };
  // },
};
</script>

<style scoped>
.nav-bar {
  display: flex;
}

.left,
.right,
.addition {
  width: 80px;
  background-color: aqua;
}

.left,
.right,
.center {
  height: 44px;
}

.center {
  flex: 1;
  background-color: antiquewhite;
}
</style>
