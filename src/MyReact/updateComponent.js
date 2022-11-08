import diff from "./diff";

export default function updateComponent(virtualDOM, oldComponent, oldDOM, container){
  // 更新props
  oldComponent.updateProps(virtualDOM.props)
  // 通过新的props获得最新的virtualDOM
  let nextVirtualDOM = oldComponent.render()
  diff(nextVirtualDOM, container, oldDOM)
}