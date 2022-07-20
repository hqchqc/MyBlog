<template>
  <!-- <h2>{{ modelValue }}</h2>
  <button @click="btnClick">按钮</button> -->

  <!-- <input :value="modelValue" @input="btnClick" /> -->

  <!-- <input v-model="value"/> -->

  <input v-model="value" />
  <input v-model="computedTitle" />
</template>
v-model:ti

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue", "update:title"],
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
    computedTitle: {
      get() {
        return this.title;
      },
      set(value) {
        this.$emit("update:title", value);
      },
    },
  },
};
</script>

<style></style>
