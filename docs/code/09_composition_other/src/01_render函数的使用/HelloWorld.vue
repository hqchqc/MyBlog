<script>
import { h } from "vue";

export default {
  render() {
    return h("div", null, [
      h("h2", null, "hello world"),
      this.$slots.default
        ? this.$slots.default({ name: "hqc" })
        : h("h2", null, "我是默认值"),
    ]);
  },
};
</script>

<style></style>
