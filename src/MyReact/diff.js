import createDOMElement from "./createDOMElement"
import mountElement from "./mountElement"
import updateNodeElement from "./updateNodeElement"
import updateTextNode from "./updateTextNode"
import diffComponent from "./diffComponent"
import unmountNode from "./unmountNode"

/**
 * 
 * @param {*} virtualDOM 虚拟DOM
 * @param {*} container 更新的DOM所放的地方
 * @param {*} oldDOM 旧的dom对象
 */
export default function diff(virtualDOM, container, oldDOM){
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM
  const oldComponent = oldVirtualDOM && oldVirtualDOM._component
  if(!oldDOM){
    mountElement(virtualDOM, container)
  }else if(typeof virtualDOM.type === "function"){
    // 函数组件和类组件需要单独处理比对
    diffComponent(virtualDOM, oldComponent, oldDOM, container)
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

    // 1. 将所有key属性的子元素放到一个单独的对象中
    const keyMap = new Map()
    for(let i = 0; i< oldDOM.childNodes.length; i++){
      let domElement = oldDOM.childNodes[i]
      if(domElement.nodeType === 1){ // 判断不是文本节点 为何是1？？？
        let key = domElement.getAttribute("key")
        if(key) keyMap.set(key, domElement)
      }
    }
    // 子节点都没key
    const hasNoKey = keyMap.size === 0
    if(hasNoKey){
      virtualDOM.children.forEach((child, i) => {
        diff(child, oldDOM, oldDOM.childNodes[i])
      });
    }else{
      // 2. 循环 virtualDOM 的子元素，获取 元素的key属性
      virtualDOM.children.forEach((child, i) => {
        let key = child.props.key
        if(key){
          let domElement = keyMap.get(`${key}`)
          if(domElement){
            // 3. 看当前位置是不是我们期望的元素
            if(oldDOM.childNodes[i] && oldDOM.childNodes[i] !== domElement){
              // 非当前期望的节点，则插入到旧的前面 [1,2,3,4] -> [1,3,4] 将会把3插入到2前面
              oldDOM.insertBefore(domElement, oldDOM.childNodes[i])
            }
          }else{
            // 新增元素
            mountElement(child, oldDOM, oldDOM.childNodes[i])
          }
        }
      })
    }

    // 获取所有老的节点
    const oldChildNodes = oldDOM.childNodes
    // 老节点数量多，需要更新完毕删除部分老节点
    if(oldChildNodes.length > virtualDOM.children.length){
      // 如果没有key，那说明按照原先的删除方式，从末尾删除就可以
      if(hasNoKey){
        // 指针先指到老节点的末位，直到数量相等
        let i = oldChildNodes.length - 1
        while(i > virtualDOM.children.length - 1){
          oldDOM.removeChild(oldChildNodes[i])
          i--
        }
      }else{
        for (let index = 0; index < oldChildNodes.length; index++) {
          const oldChildNode = oldChildNodes[index];
          let oldChildNodeKey = oldChildNode._virtualDOM.props.key
          let found = false // 标记是否在新的里面还继续有相同的key
          for (let n = 0; n < virtualDOM.children.length; n++) {
            const newChildNode = virtualDOM.children[n];
            if(oldChildNodeKey === newChildNode.props.key){
              found = true
              break
            }
          }
          if(!found){
            unmountNode(oldChildNode)
          }
        }
      }
      
    }
  }
}