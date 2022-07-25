import { ref, watch } from "vue";

export default function (title = "这是默认的title") {
  const titleRef = ref(title);
  watch(
    titleRef,
    (newValue) => {
      console.log("newValue", newValue);
      document.title = newValue;
    },
    {
      immediate: true,
    }
  );

  return titleRef;
}
