<script>
import { h } from "vue";
import HelloWorld from "./HelloWorld.vue";

export default {
  render() {
    return h(HelloWorld, null, {
      default: (props) => {
        return h("h2", null, `app 传到hello world中的内容 ${props.name}`);
      },
    });
  },
};
</script>

<style></style>
