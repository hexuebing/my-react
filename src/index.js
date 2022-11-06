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

function Demo(){
  return <MyComponent></MyComponent>
}

MyReact.render(<Demo></Demo>, root)