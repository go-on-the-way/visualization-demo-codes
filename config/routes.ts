export default [
  { path: '/', exact: true, component: '@/pages/login' },
  { path: '/login', exact: true, component:'@/pages/login' },
  { path: '/register', exact: true, component: '@/pages/user/register' },
  { path: '/modify', exact: true, component: '@/pages/user/modify' },
  { path: '/list-render-demo', exact: true, component: '@/pages/list-render-demo' },
  { path: '/home', component: '@/pages/portal',
    routes: [
      { path: '/home/editor', component: '@/pages/lowcode' },
      { path: '/home/handsontable', component: '@/pages/handsontable' },
      { path: '/home/monaco-editor', component: '@/pages/monaco-editor' },
      { path: '/home/media-preview', component: '@/pages/media-preview' },
      { path: '/home/fr-generator', component: '@/pages/fr-generator' },
      { path: '/home/scheduler', component: '@/pages/scheduler' },
      { path: '/home/three', component: '@/pages/three' },
    ]
  },
  { path: '*', component: '@/pages/index' },
];


// 封装异步组件
// import { dynamic } from 'umi';
// export default dynamic({
//   loader: async function () {
//     // 这里的注释 webpackChunkName 可以指导 webpack 将该组件 HugeA 以这个名字单独拆出去
//     const { default: HugeA } = await import(
//       /* webpackChunkName: "external_A" */ './HugeA'
//     );
//     return HugeA;
//   },
// });

// 使用异步组件
// import React from 'react';
// import AsyncHugeA from './AsyncHugeA';
// 像使用普通组件一样即可
// dynamic 为你做:
// 1. 异步加载该模块的 bundle
// 2. 加载期间 显示 loading（可定制）
// 3. 异步组件加载完毕后，显示异步组件
// export default () => {
//   return <AsyncHugeA />;
// };

