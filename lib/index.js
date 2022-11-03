import MyReact from './MyReact/index.js';
const virtualDOM = MyReact.createElement("div", {
  className: "app"
}, MyReact.createElement("h1", null, "hello"));
console.log(123);