import isFunction from "./isFunction"
import mountNativeElement from "./mountNativeElement"
import mountComponent from "./mountComponent"

export default function mountElement(virtualDOM, container, oldDOM){
  if(isFunction(virtualDOM)){
    // 组件
    mountComponent(virtualDOM, container, oldDOM)
  }else{
    // 原生DOM
    mountNativeElement(virtualDOM, container, oldDOM)
  }
  
}