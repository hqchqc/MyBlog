import { sum } from "./js/math";
const { priceFormat } = require("./js/format");
import "./js/element";

console.log(sum(1, 2));
console.log(priceFormat());

const message = "babel的使用";
const names = ["babel", "webpack", "react"];

names.forEach((item) => {
  console.log("item", item);
});

console.log("message", message);
