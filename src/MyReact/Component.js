import diff from "./diff"

export default class Component {
  constructor(props){
    this.props = props
  }

  setState(state){
    this.state = Object.assign({}, this.state, state)
    // 获取到最新的虚拟DOM
    let virtualDOM = this.render()
    // 获取旧的虚拟DOM对象，通过旧的DOM对象上面的_virtualDOM来获取
    let oldDOM = this.DOM
    diff(virtualDOM, oldDOM.parentNode, oldDOM)
  }

  set DOM(dom){
    this._dom = dom
  }

  get DOM(){
    return this._dom
  }

  updateProps(props){
    this.props = props
  }
}