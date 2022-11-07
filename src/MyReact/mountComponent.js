import isFunction from "./isFunction";
import mountNativeElement from "./mountNativeElement";

export default function mountComponent(virtualDOM, container){
  let nextVirtualDOM = null;
  if(virtualDOM.type.prototype && virtualDOM.type.prototype.render){
    // 类组件
    nextVirtualDOM = buildClassComponent(virtualDOM)
  }else{
    // 函数组件
    nextVirtualDOM = buildFunctionComponent(virtualDOM)
  }
  // 进一步判断里面的是不是函数组件或类组件
  if(isFunction(nextVirtualDOM)){
    mountComponent(nextVirtualDOM, container)
  }else{
    mountNativeElement(nextVirtualDOM, container)
  }
}

function buildFunctionComponent(virtualDOM){
  return virtualDOM.type(virtualDOM.props || {})
}

function buildClassComponent(virtualDOM){
  const component = new virtualDOM.type(virtualDOM.props)
  // 将类组件的实例保存到virtualDOM中，便于将dom放入到实例中
  // virtualDOM._component = component
  // return component.render()
  const nextVirtualDOM = component.render()
  nextVirtualDOM._component = component
  return nextVirtualDOM
}