<template>
  <div>
    <h3>当前计数： {{ counter }}</h3>
    <h3>*2: {{ doubleCounter }}</h3>
    <button @click="increament">+1</button>
    <button @click="decreament">-1</button>
    <button @click="changeInfo">修改data</button>

    <h3>{{ data }}</h3>
    <p class="content"></p>

    <div class="scroll">
      <div class="scroll-x">scrollX: {{ scrollX }}</div>
      <div class="scroll-y">scrollY: {{ scrollY }}</div>
    </div>

    <div class="mouse">
      <div class="mouse-x">mouseX: {{ mouseX }}</div>
      <div class="mouse-y">mouseY: {{ mouseY }}</div>
    </div>
  </div>
</template>

<script setup>
import {
  useCounter,
  useTitle,
  useScrollPosition,
  useMousePosition,
  useLocalStorage,
} from "./hooks";
// counter
const { counter, doubleCounter, increament, decreament } = useCounter();

// title
const titleRef = useTitle("hqc");
setTimeout(() => {
  titleRef.value = "hqc2";
}, 3000);

// scroll
const { scrollX, scrollY } = useScrollPosition();

// mouse
const { mouseX, mouseY } = useMousePosition();

// localStorage
const data = useLocalStorage("info", {
  name: "vaoderwhy",
  age: 18,
});

const changeInfo = () => {
  data.value = "hhh";
};
</script>

<style>
.content {
  width: 3000px;
  height: 5000px;
}

.scroll {
  position: fixed;
  right: 30px;
  bottom: 30px;
}

.mouse {
  position: fixed;
  right: 30px;
  bottom: 80px;
}
</style>
