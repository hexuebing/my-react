export default function updateNodeElement(newElement, virtualDOM){
  // 获取对象对应的属性
  const props = virtualDOM.props
  for (const propsName in props) {
    const value = props[propsName];
    if(propsName.startsWith('on')){
      const eventName = propsName.toLowerCase().slice(2)
      newElement.addEventListener(eventName, value)
    }else if(propsName === 'value' || propsName === 'checked'){
      newElement[propsName] = value
    }else if(propsName !== 'children'){
      newElement.setAttribute(propsName === 'className' ? 'class' : propsName, value)
    }
  }
}