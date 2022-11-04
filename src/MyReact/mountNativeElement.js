import mountElement from "./mountElement";

export default function mountNativeElement(virtualDOM, container){
  let newElement = null
  if(virtualDOM.type === "text"){
    newElement = document.createTextNode(virtualDOM.props.textContent)
  }else{
    // 元素是普通节点
    newElement = document.createElement(virtualDOM.type)
  }
  //递归创建子节点
  virtualDOM.children.forEach(child => {
    mountElement(child, newElement)
  });
  //将转换后的真实dom节点放到容器中
  container.appendChild(newElement)
}