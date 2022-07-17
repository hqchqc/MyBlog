<template>
  <div class="tab-control">
    <div
      :class="{ active: currentIndex === index }"
      v-for="(items, index) in titles"
      :key="items"
      @click="itemClick(index)"
    >
      <span>{{ items }}</span>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["itemClick"],
  props: {
    titles: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("itemClick", index);
    },
  },
};
</script>

<style scoped>
.tab-control {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #f5f5f5;
  padding: 10px;
}

.active {
  color: aqua;
}

.active span {
  border-bottom: 2px solid aqua;
}
</style>
