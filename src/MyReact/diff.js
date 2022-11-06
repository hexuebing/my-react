import createDOMElement from "./createDOMElement"
import mountElement from "./mountElement"
import updateNodeElement from "./updateNodeElement"
import updateTextNode from "./updateTextNode"

/**
 * 
 * @param {*} virtualDOM 虚拟DOM
 * @param {*} container 更新的DOM所放的地方
 * @param {*} oldDOM 久的dom对象
 */
export default function diff(virtualDOM, container, oldDOM){
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM
  if(!oldDOM){
    mountElement(virtualDOM, container)
  }else if(virtualDOM.type !== oldVirtualDOM.type && typeof virtualDOM !== 'function'){
    // 类型不同的节点，直接使用新DOM替换旧的DOM
    const newElement = createDOMElement(virtualDOM)
    oldDOM.parentNode.replaceChild(newElement, oldDOM)
  }else if(oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type){
    if(virtualDOM.type === "text"){
      // 更新文本内容
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM)
    } else {
      // 更新元素属性
      updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM)
    }
    virtualDOM.children.forEach((child, i) => {
      diff(child, oldDOM, oldDOM.childNodes[i])
    });
  }
}