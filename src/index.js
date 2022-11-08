import MyReact from './MyReact/index.js'

const root = document.getElementById('root')

const virtualDOM = (
  <div className="app">
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4需要删除的节点</li>
    </ul>
    <h1>hello</h1>
    <div>
      嵌套第一层
      <div>嵌套第二层</div>
    </div>
    {false && <div>不该出现的JSX</div>}
    {true && <div>该出现的JSX</div>}
    文本
    <button onClick={() => alert("👋")}>按钮</button>
    <input value="123" className="input-class"></input>
    <input type="checkbox" checked></input>
  </div>
)

function MyComponent(){
  return <div>1234</div>
}

function Demo(props){
  return <div>
    {props.name}
    <MyComponent></MyComponent>
  </div>
}

class ClassComponent extends MyReact.Component{
  constructor(props){
    super(props)
    this.state = {
      title: '默认title'
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(){
    this.setState({title: '修改后的title'})
  }
  render(){
    console.log(this.state.title)
    return <div>
      <h1>{this.state.title}</h1>
      {this.props.name}
      {this.props.age}
      hello class Component
      <button onClick={this.handleClick}>修改title</button>
      </div>
  }
}

// MyReact.render(<ClassComponent name="张三" age={18}></ClassComponent>, root)

// setTimeout(() => {
//   MyReact.render(<ClassComponent name="李四" age={20}></ClassComponent>, root)
//   // MyReact.render(<Demo name="李四" age={20}></Demo>, root)
// }, 2000)

// const newVirtualDOM = (
//   <div className="app123">
//     <ul>
//       <li>12</li>
//       <li>22</li>
//       <li>32</li>
//     </ul>
//     <h1>new Hello world</h1>
//     <span>
//       修改后的嵌套第一层
//       <div>修改后的嵌套第二层</div>
//     </span>
//     {false && <div>不该出现的JSX</div>}
//     {true && <div>该出现的JSX</div>}
//     修改后的文本
//     <button onClick={() => alert("👋")}>按钮</button>
//     <input></input>
//     <input type="checkbox"></input>
//   </div>
// )

// MyReact.render(virtualDOM, root)

// setTimeout(() => {
//   MyReact.render(newVirtualDOM, root)
// }, 5000)

class DemoRef extends MyReact.Component{
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(){
    console.log(this.input.value)
  }
  render(){
    return <div>
      <input type="text" value="123" ref={input => this.input = input}></input>
      <button onClick={this.handleClick}>获取值</button>
    </div>
  }
}

MyReact.render(<DemoRef></DemoRef>, root)