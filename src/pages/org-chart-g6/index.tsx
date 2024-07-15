
import { useState, FC, useMemo, useEffect } from "react";
import { RouteComponentProps } from "react-router";


import { G6, registerCustomNode } from './custom-node';
import { initTreeGraph } from './util';

import './index.less';

interface OrgChartProps extends RouteComponentProps {}

const data = {
  id: 'A',
  level: 1,
  img: 'https://img2.baidu.com/it/u=2583033771,2680726687&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  children: [
    {
      id: 'A1',
      level: 2,
      img: 'https://t7.baidu.com/it/u=1238366780,2528041473&fm=193',
      children: [
        { id: 'A11', level: 3 },
        {
          id: 'A12',
          level: 3,
          children: [
            { id: 'A121', level: 4, img: 'https://img95.699pic.com/xsj/0x/0p/f6.jpg%21/fw/700/watermark/url/L3hzai93YXRlcl9kZXRhaWwyLnBuZw/align/southeast' },
            { id: 'A122', level: 4 }, { id: 'A123', level: 4 }, { id: 'A124', level: 4 }]
        },
        {
          id: 'A13',
          level: 3,
          children: [{ id: 'A131', level: 4, img: 'https://img3.yun300.cn/repository/image/UPBwItXRQtqwMoLR4Fa-iw.jpg?tenantId=170650&viewType=1' }, { id: 'A132', level: 4 }, { id: 'A133', level: 4 }, { id: 'A134', level: 4, img: 'https://data.ac-illust.com/data/thumbnails/71/710c8330cdf354bd19901cb6829ac26d_t.jpeg' }]
        },
        { id: 'A14', level: 3 }
      ],
    },
    {
      id: 'A2',
      level: 2,
      children: [
        {
          id: 'A21',
          level: 3,
          children: [{ id: 'A211', level: 4 }, { id: 'A212', level: 4, img: 'https://img1.baidu.com/it/u=192319177,4159199999&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500' }],
        },
        {
          id: 'A22',
          level: 3,
          children: [{ id: 'A221', level: 4 }, { id: 'A222', level: 4 }, { id: 'A223', level: 4, img: 'https://img0.baidu.com/it/u=3971823387,1392643094&fm=253&fmt=auto&app=138&f=PNG?w=500&h=500' }, { id: 'A224', level: 4 }]
        },
      ],
    },
  ],
};

const OrgChart: FC<OrgChartProps> = ({}) => {

  useEffect(() => {
    registerCustomNode();
    initTreeGraph(G6, data);
  }, [])

  return (
    <div className="org-chart-container">
      <div id="container" className="main-map"></div>
      <div id="minimap" className="mini-map"></div>
    </div>
  );
};

export default OrgChart;
