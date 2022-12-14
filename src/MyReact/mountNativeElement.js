import createDOMElement from "./createDOMElement";
import unmountNode from "./unmountNode"

export default function mountNativeElement(virtualDOM, container, oldDOM){
  let newElement = createDOMElement(virtualDOM)
  if(oldDOM){
    // 如果存在旧的节点，插入节点就可以插入到旧的前面
    container.insertBefore(newElement, oldDOM)
  }else{
    //将转换后的真实dom节点放到容器中
    container.appendChild(newElement)
  }
  if(oldDOM){
    unmountNode(oldDOM)
  }
  
  // 如果是类组件，说明存在实例
  if(virtualDOM._component){
    virtualDOM._component.DOM= newElement
  }
}