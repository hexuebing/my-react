import createDOMElement from "./createDOMElement";

export default function mountNativeElement(virtualDOM, container){
  let newElement = createDOMElement(virtualDOM)
  //将转换后的真实dom节点放到容器中
  container.appendChild(newElement)
  // 如果是类组件，说明存在实例
  if(virtualDOM._component){
    virtualDOM._component.DOM= newElement
  }
}