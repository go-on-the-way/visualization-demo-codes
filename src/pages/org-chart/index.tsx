import { useEffect } from 'react';
import { Button } from 'antd';
import { Graph, Node, Point } from '@antv/x6';
import { MiniMap } from '@antv/x6-plugin-minimap'
import { Export } from '@antv/x6-plugin-export'
import { register } from '@antv/x6-react-shape'
import PageScrollContainer from '@/components/page-scroll-container';
import './index.less';
// import CustomNode from "./custom-node";
import CustomNode from "./node";
import { initGraph, start } from "./tool";

// 1、导出PNG
// 2、组织结构图渲染
// 3、缩略图

// 方案一：x6 【采用】
// 方案二：g6
const OrgChart = () => {
    let graph:any = null;
    let minimap = null;

    // 自定义节点
    // register({
    //     shape:'org-node',
    //     width: 180,
    //     height: 150,
    //     effect: ['data'],
    //     component: CustomNode,
    // })
    Graph.registerNode('org-node',CustomNode,true);
    
    // 自定义线
    Graph.registerEdge(
        'org-edge',
        {
            zIndex: -1,
            attrs: {
                line: {
                    fill: 'none',
                    strokeLinejoin: 'round',
                    strokeWidth: 2,
                    stroke: '#A2B1C3',
                    sourceMarker: null,
                    targetMarker: null,
                },
            },
        },
        true,
    )
    
    useEffect(()=>{
        let graphInstance = initGraph();
        graph = graphInstance?.graph
        minimap = graphInstance?.minimap;
        start(graph,minimap);
    },[])

    return (
        <PageScrollContainer>
            <div className="button-container">
                <Button type="primary" onClick={()=>{ 
                    graph.exportPNG('组织树')
                }}>导出PNG</Button>
            </div>
            <div className="org-chart" id="container"></div>
            <div className="org-chart-minimap" id="minimap"></div>
        </PageScrollContainer>
    );
}

export default OrgChart;