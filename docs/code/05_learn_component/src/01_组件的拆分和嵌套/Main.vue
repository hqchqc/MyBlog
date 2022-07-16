<template>
  <div class="main">
    <main-banner></main-banner>
    <main-product-list-vue></main-product-list-vue>
  </div>
</template>

<script>
import MainBanner from "./MainBanner.vue";
import MainProductListVue from "./MainProductList.vue";

export default {
  components: { MainBanner, MainProductListVue },
};
</script>

<style></style>
