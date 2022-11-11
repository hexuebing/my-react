export default function unmountNode(node){
  const virtualDOM = node._virtualDOM
  // 1. 文本节点直接删除
  if(virtualDOM.type === 'text'){
    node.remove()
    return;
  }
  // 2. 如果节点是组件生成的，那么需要调用卸载生命周期
  let component = virtualDOM._component
  if(component) {
    component.componentWillUnmount()
  }

  // 3. 处理ref属性
  if(virtualDOM?.props?.ref){
    virtualDOM.props.ref(null)
  }

  // 4. 处理节点事件函数
  for (const propName in virtualDOM.props) {
    if(propName.startsWith('on')){
      const eventName = propName.toLowerCase().slice(2)
      const eventHandler = virtualDOM.props[propName]
      node.removeEventListener(eventName, eventHandler)
    }
  }

  // 5. 递归删除子节点
  if(node.childNodes.length > 0){
    node.childNodes.forEach(childNode => {
      unmountNode(childNode)
    })
  }

  // 删除节点
  node.remove()
}