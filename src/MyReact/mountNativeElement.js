import mountElement from "./mountElement";
import updateNodeElement from "./updateNodeElement";

export default function mountNativeElement(virtualDOM, container){
  let newElement = null
  if(virtualDOM.type === "text"){
    newElement = document.createTextNode(virtualDOM.props.textContent)
  }else{
    // 元素是普通节点
    newElement = document.createElement(virtualDOM.type)
    updateNodeElement(newElement, virtualDOM)
  }
  //递归创建子节点
  virtualDOM.children.forEach(child => {
    mountElement(child, newElement) // 所有子节点都调用一次，这里判断是不是原生DOM
  });
  //将转换后的真实dom节点放到容器中
  container.appendChild(newElement)
}