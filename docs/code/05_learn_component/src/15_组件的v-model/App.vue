<template>
  <div>
    <!-- <input v-model="message" /> -->

    <my-input v-model="message" v-model:title="title" />
    <!-- <my-input :modelValue="message" @update:model-value="message = $event" /> -->

    <h2>{{ message }}</h2>
    <h2>{{ title }}</h2>
  </div>
</template>

<script>
import MyInput from "./MyInput.vue";
export default {
  components: {
    MyInput,
  },
  data() {
    return {
      message: "Hello Vue!",
      title: "this is title",
    };
  },
};
</script>

<style></style>
