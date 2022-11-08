import updateNodeElement from "./updateNodeElement"
import mountElement from "./mountElement"

export default function createDOMElement(virtualDOM){
  let newElement = null
  if(virtualDOM.type === "text"){
    newElement = document.createTextNode(virtualDOM.props.textContent)
  }else{
    // 元素是普通节点
    newElement = document.createElement(virtualDOM.type)
    // 为节点添加属性
    updateNodeElement(newElement, virtualDOM)
  }
  // 为真实dom对戏那个添加一个属性用来保存virtualDOM
  newElement._virtualDOM = virtualDOM
  //递归创建子节点
  virtualDOM.children.forEach(child => {
    mountElement(child, newElement) // 所有子节点都调用一次，这里判断是不是原生DOM
  });

  if(virtualDOM.props && virtualDOM.props.ref){
    virtualDOM.props.ref(newElement)
  }
  return newElement
}