import isFunction from "./isFunction";
import mountNativeElement from "./mountNativeElement";

export default function mountComponent(virtualDOM, container){
  let nextVirtualDOM = null;
  if(virtualDOM.type.prototype && virtualDOM.type.prototype.render){
    // 类组件
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
  return virtualDOM.type()
}