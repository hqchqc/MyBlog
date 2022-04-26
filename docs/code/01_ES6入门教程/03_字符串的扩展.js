console.log("\u0062");
console.log("\u{20BB7}");

for (let key of "中文") {
  console.log(key);
}

let test = String.fromCodePoint(0x20bb7);
for (let i = 0; i < test.length; i++) {
  console.log(test[i]);
}

for (let key of test) {
  console.log(key);
}
console.log(`a\`a\``);
console.log(`'b'`);
