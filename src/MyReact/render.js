import diff from './diff'

/**
 * 
 * @param {*} virtualDOM 虚拟dom
 * @param {*} container 绘制的真实dom的父节点
 * @param {*} oldDOM 容器里面的，根结点真实的DOM对象，上面挂着自己的虚拟dom对象
 */
export default function render(virtualDOM, container, oldDOM = container.firstChild){
  diff(virtualDOM, container, oldDOM)
}