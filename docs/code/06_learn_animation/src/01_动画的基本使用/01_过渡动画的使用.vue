<template>
  <div>
    <button @click="isShow = !isShow">切换</button>

    <transition name="why">
      <h2 v-if="isShow">hello</h2>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: true,
    };
  },
};
</script>

<style scoped>
.why-enter-from,
.why-leave-to {
  opacity: 0;
  /* transform: translateX(-100px); */
}

.why-enter-to,
.why-leave-from {
  opacity: 1;
  /* transform: translateX(0); */
}

.why-enter-active,
.why-leave-active {
  transition: opacity 2s ease;
}
</style>
