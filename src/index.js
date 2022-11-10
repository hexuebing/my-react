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
    console.log(this.classCompt)
    console.log(this.demo)
  }
  render(){
    return <div>
      <input type="text" value="123" ref={input => this.input = input}></input>
      <button onClick={this.handleClick}>获取值</button>
      <ClassComponent name="张三" age={18} ref={classCompt => this.classCompt = classCompt}></ClassComponent>
      <Demo ref={demo => this.demo = demo}></Demo>
    </div>
  }
}

class DemoKey extends MyReact.Component{
  constructor(props){
    super(props)
    this.state = {
      persons: [
        {id: 1, name: '章三'},
        {id: 2, name: '里斯'},
        {id: 3, name: '王武'},
        {id: 4, name: '找刘'}
      ]
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(){
    const newState = JSON.parse(JSON.stringify(this.state))
    // const start = newState.persons.shift()
    // newState.persons.push(start)
    newState.persons.splice(1, 0, {id: 88, name: '小飞棍来啦'})
    this.setState(newState)
  }
  render(){
    return <ul>
      {this.state.persons.map((p) => {
        return <li key={p.id}>{p.name}</li>
      })}
      <button onClick={this.handleClick}>改变顺序</button>
    </ul>
  }
}

MyReact.render(<DemoKey></DemoKey>, root)