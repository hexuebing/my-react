import MyReact from './MyReact/index.js'

const root = document.getElementById('root')

const virtualDOM = (
  <div className="app">
    <h1>hello</h1>
    <div>
      嵌套第一层
      <div>嵌套第二层</div>
    </div>
    {false && <div>不该出现的JSX</div>}
    {true && <div>该出现的JSX</div>}
    文本
    <button onClick={() => alert("👋")}>按钮</button>
    <input value="123"></input>
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
  }
  render(){
    return <div>
      {this.props.name}
      {this.props.age}
      hello class Component
      </div>
  }
}

// MyReact.render(<ClassComponent name="张三" age={18}></ClassComponent>, root)

const newVirtualDOM = (
  <div className="app123">
    <h1>new Hello world</h1>
    <div>
      修改后的嵌套第一层
      <div>修改后的嵌套第二层</div>
    </div>
    {false && <div>不该出现的JSX</div>}
    {true && <div>该出现的JSX</div>}
    修改后的文本
    <button onClick={() => alert("👋")}>按钮</button>
    <input value="789"></input>
    <input type="checkbox" checked></input>
  </div>
)

MyReact.render(virtualDOM, root)

setTimeout(() => {
  MyReact.render(newVirtualDOM, root)
}, 5000)