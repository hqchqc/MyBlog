<template>
  <div>
    <!-- 不能访问子组件中的title -->
    <!-- <child-cpn>
      <button>{{ title }}</button>
    </child-cpn> -->

    <show-names :names="names">
      <template v-slot="slotProps">
        <button>{{ slotProps.item }}-{{ slotProps.index }}</button>
      </template>
    </show-names>

    <show-names :names="names">
      <template v-slot="slotProps">
        <strong>{{ slotProps.item }}-{{ slotProps.index }}</strong>
      </template>
    </show-names>

    <!-- 独占默认插槽的缩写 -->
    <!-- 如果还有其它插槽则必须写template -->
    <show-names :names="names" v-slot="slotProps">
      <strong>{{ slotProps.item }}-{{ slotProps.index }}</strong>
    </show-names>
  </div>
</template>

<script>
import ChildCpn from "./ChildCpn.vue";
import ShowNames from "./ShowNames.vue";

export default {
  components: {
    ChildCpn,
    ShowNames,
  },
  data() {
    return {
      names: ["why", "are", "you", "so", "cute"],
    };
  },
};
</script>

<style></style>
