<template>
  <div>
    <p>{{ data }}</p>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: "这是BasePage",
      message: "这是BasePage的message",
    };
  },
  created() {
    console.log("这是这是BasePage的created");
  },
};
</script>

<style></style>
