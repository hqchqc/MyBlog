import { computed } from "@vue/reactivity";
import { ref } from "vue";

export default function () {
  const counter = ref(0);
  const doubleCounter = computed(() => counter.value * 2);

  const increament = () => {
    counter.value++;
  };

  const decreament = () => {
    counter.value--;
  };

  return {
    counter,
    doubleCounter,
    increament,
    decreament,
  };
}
