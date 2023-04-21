import 'antd/dist/antd.css';
// umi约定的运行时配置文件

// 修改路由
// let extraRoutes
// export function patchRoutes({ routes }:any) {
//     // merge(routes, extraRoutes);
// }

// export function render(oldRender:Function) {
//     // 请求数据更改路由，比如根据权限获取不同的路由
//     fetch('/api/xxx').then(res=>res.json()).then((res) => { 
//       extraRoutes = res.routes;
//       oldRender();
//     })
// }


// 监听路由切换
// export function onRouteChange({ routes, matchedRoutes, location, action }:any){

// }

// 修改交给 react-dom 渲染时的根组件
// export function rootContainer(container:any) {
//     return React.createElement('div', null, container);
// }