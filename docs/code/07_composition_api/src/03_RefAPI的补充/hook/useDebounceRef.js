import { customRef } from "vue";

// 自定义ref
export default function (value) {
  let timer = null;
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          value = newValue;
          trigger(newValue);
        }, 1000);
      },
    };
  });
}
