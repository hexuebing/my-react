import mountElement from "./mountElement"
import updateComponent from "./updateComponent"

export default function diffComponent(virtualDOM, oldComponent, oldDOM, container){
  if(isSameComponent(virtualDOM, oldComponent)){
    console.log('同一个组件')
    updateComponent(virtualDOM, oldComponent, oldDOM, container)
  }else{
    console.log('不是同一个组件')
    mountElement(virtualDOM, container, oldDOM)
  }
}

function isSameComponent(virtualDOM, oldComponent){
  return virtualDOM && oldComponent && virtualDOM.type === oldComponent.constructor
}