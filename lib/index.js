import MyReact from './MyReact/index.js';
const virtualDOM = MyReact.createElement("div", {
  className: "app"
}, MyReact.createElement("h1", null, "hello"), MyReact.createElement("div", null, "\u5D4C\u5957\u7B2C\u4E00\u5C42", MyReact.createElement("div", null, "\u5D4C\u5957\u7B2C\u4E8C\u5C42")), false && MyReact.createElement("div", null, "\u4E0D\u8BE5\u51FA\u73B0\u7684JSX"), true && MyReact.createElement("div", null, "\u8BE5\u51FA\u73B0\u7684JSX"), MyReact.createElement("button", {
  onClick: () => alert("👋")
}, "\u6309\u94AE"));
console.log(virtualDOM);