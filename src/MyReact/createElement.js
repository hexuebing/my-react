export default function createElement (type, props, ...children){
  const childElement = children.reduce((result, child) => {
    if(child !== true && child !== false && child !== null){
      if(child instanceof Object){
        result.push(child)
      }else{
        // 文本节点专门转化为一个对象
        result.push(createElement('text', { textContent: child}))
      }
    }
    return result
  }, [])
  return {
    type, props: Object.assign({}, props, {children: childElement}), children: childElement
  }
}