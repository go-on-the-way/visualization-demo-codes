import React, { Fragment } from 'react';

// 当 React 渲染一个订阅了这个 Context 对象的组件，这个组件会从组件树中离自身最近的那个匹配的 Provider 中读取到当前的 context 值。
// 只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效。此默认值有助于在不使用 Provider 包装组件的情况下对组件进行测试。
// 注意：将 undefined 传递给 Provider 的 value 时，消费组件的 defaultValue 不会生效。
// 因为 context 会根据引用标识来决定何时进行渲染（本质上是 value 属性值的浅比较），
// 所以这里可能存在一些陷阱，当 provider 的父组件进行重渲染时，可能会在 consumers 组件中触发意外的渲染。
const MyContext =React.createContext({
  a:1234,
  b:2345
})

MyContext.displayName = 'thisIsMyContext'

class ChildComponent extends React.Component {
  static contextType?: React.Context<any> | undefined = MyContext;
  constructor(props: any) {
    super(props);
  }
  componentDidMount() {
    console.log('componentDidMount');
  }
  render() {
    return <Fragment>
      <input type="text" value={this.context.b}/>;
      <MyContext.Consumer>
        {
          value=>{
            return <h1>{value}</h1>
          }
        }
      </MyContext.Consumer>
    </Fragment>
  }
}

class Test extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = this.context
  }
  componentDidMount() {
    console.log('componentDidMount');
  }
  render() {
    return <MyContext.Provider value={{a:2,b:3}}>
      <ChildComponent></ChildComponent>
      </MyContext.Provider>
  }
}

export default Test;
