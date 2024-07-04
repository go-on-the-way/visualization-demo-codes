import dagre from 'dagre';
import { Graph, Node, Dom } from '@antv/x6';
import { MiniMap } from '@antv/x6-plugin-minimap'
import { Export } from '@antv/x6-plugin-export'
import { Scroller } from '@antv/x6-plugin-scroller'

// 初始化graph
export function initGraph(){
    const graph = new Graph({
        container: document.getElementById('container')!,
        panning: true,
        mousewheel: true,
        connecting: {
          anchor: 'orth',
        },
    });

    const minimap = new MiniMap({
        container: document.getElementById('minimap')!,
        width:200,
        height:200
    })

    // graph.use(
    //     new Scroller({
    //       enabled: true,
    //     })
    // );

    graph.use(new Export());

    return { graph, minimap };
}

// 自动布局
export function layout(graph:any) {
    const nodes = graph.getNodes()
    const edges = graph.getEdges()
    const g = new dagre.graphlib.Graph()
    const dir:string = 'TB'
    g.setGraph({ rankdir: dir, nodesep: 150, ranksep: 150 })
    g.setDefaultEdgeLabel(() => ({}))
  
    const width = 260
    const height = 90

    nodes.forEach((node:any) => {
      g.setNode(node.id, { width, height })
    })
  
    edges.forEach((edge:any) => {
      const source = edge.getSource()
      const target = edge.getTarget()
      g.setEdge(source.cell, target.cell)
    })
  
    // 计算布局
    dagre.layout(g)

    g.nodes().forEach((id) => {
      const node = graph.getCellById(id) as Node
      if (node) {
        const pos = g.node(id)
        node.position(pos.x, pos.y)
      }
    })
  
    edges.forEach((edge:any) => {
      const source = edge.getSourceNode()!
      const target = edge.getTargetNode()!
      const sourceBBox = source.getBBox()
      const targetBBox = target.getBBox()
  
      console.log(sourceBBox, targetBBox)
  
      if ((dir === 'LR' || dir === 'RL') && sourceBBox.y !== targetBBox.y) {
        const gap =
          dir === 'LR'
            ? targetBBox.x - sourceBBox.x - sourceBBox.width
            : -sourceBBox.x + targetBBox.x + targetBBox.width
        const fix = dir === 'LR' ? sourceBBox.width : 0
        const x = sourceBBox.x + fix + gap / 2

        edge.setVertices([
          { x, y: sourceBBox.center.y },
          { x, y: targetBBox.center.y },
        ])

      } else if (
        (dir === 'TB' || dir === 'BT') &&
        sourceBBox.x !== targetBBox.x
      ) {
        const gap =
          dir === 'TB'
            ? targetBBox.y - sourceBBox.y - sourceBBox.height
            : -sourceBBox.y + targetBBox.y + targetBBox.height
        const fix = dir === 'TB' ? sourceBBox.height : 0
        const y = sourceBBox.y + fix + gap / 2

        edge.setVertices([
          { x: sourceBBox.center.x, y },
          { x: targetBBox.center.x, y },
        ])

      } else {
        edge.setVertices([])
      }
    })
}

// 监听自定义事件
export function eventsHandler(graph:any) {
    graph.on('node:open', ({ e, node }:any) => {
        e.stopPropagation();

        let avatarUrl = 'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*kUy8SrEDp6YAAAAAAAAAAAAAARQnAQ';
        let data = [
        {
            orgName:'部门1-x中心-新增',
            job:'中心主任',
            name:'王五',
            avatar:avatarUrl,
            isLeaf:false
        },
        {
            orgName:'部门1-x中心-新增',
            job:'中心主任',
            name:'王五',
            avatar:avatarUrl,
            isLeaf:true
        },
        {
            orgName:'部门1-x中心-新增',
            job:'中心主任',
            name:'王五',
            avatar:avatarUrl,
            isLeaf:false
        }
        ];
        data.forEach(item => {
            let newNode = createNode(graph,{
                ...item,
                parentId:node.id
            })
            createEdge(graph,node,newNode);
        });
        node.setAttrs({
            '.btn.add':{
                visibility:'hidden'
            },
            '.btn.del':{
                visibility:'visible'
            }
        });
        layout(graph);
    })

    graph.on('node:close', ({ e, node }:any) => {
        e.stopPropagation();
        const nodes = graph.getNodes();
        let removeNodeIds = findDescendants(nodes,node).map(item=>item.id);
        graph.removeCells(removeNodeIds);
        node.setAttrs({
            '.btn.add':{
                visibility:'visible'
            },
            '.btn.del':{
                visibility:'hidden'
            }
        });
        layout(graph);
    })
}

// 找出一个节点的所有子孙节点
export function findDescendants(nodes:any[],curNode:any){
    let descendantsNodes:any[] = [];

    function findNodes(parentNode:any){
        let arr = nodes.filter(itemNode=>{
            const { parentId } = itemNode.getData();
            return parentId === parentNode.id
        })
        descendantsNodes = descendantsNodes.concat(arr);
        for (let i = 0; i < arr.length; i++) {
            findNodes(arr[i])
        }
    }

    findNodes(curNode);

    return descendantsNodes
}

// 创建节点
export function createNode(graph:any,props:any){
    let x6Node = graph.addNode({
        shape: 'org-node',
        data:{
            graph,
            ...props
        },
        attrs: {
            '.image': { xlinkHref: props.avatar },
            '.rank': {
              text: Dom.breakText(props.job, { width: 160, height: 45 }),
            },
            '.name': {
              text: Dom.breakText(props.name, { width: 160, height: 45 }),
            },
            '.btn.add':{
                visibility:props.isLeaf?'hidden':'visible'
            },
            '.btn.del':{
                visibility:'hidden'
            }
        }
    });

    return x6Node
}

// 创建连线
export function createEdge(graph:any,parentNode:any,node:any){
    let x6Edge = graph.addEdge({
        shape: 'org-edge',
        source: { cell: parentNode.id },
        target: { cell: node.id },
    })

    return x6Edge
}

// 生成nodes和edges
export function genNodesAndEdges(nodeData:any,nodes:any[],edges:any[],parentNode:any,graph:any){
    let node = createNode(graph,{
        parentId:parentNode?.id,
        orgName:nodeData.orgName,
        job:nodeData.job,
        name:nodeData.name,
        avatar:nodeData.avatar,
        isLeaf:nodeData.isLeaf
    });

    nodes.push(node);

    if(parentNode){
        edges.push(createEdge(graph,parentNode,node))
    }

    if(nodeData.children && nodeData.children.length > 0){
        nodeData.children.forEach((item:any)=>{
            genNodesAndEdges(item,nodes,edges,node,graph);
        })
    }
}

export function createNodesAndEdges(data:any,graph:any){
    let avatarUrl = 'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*kUy8SrEDp6YAAAAAAAAAAAAAARQnAQ';
    let nodes:any[] = [];
    let edges:any[] = [];
    let originData = data || {
        orgName:'根节点名称',
        job:'CEO总经理',
        name:'张三',
        avatar:avatarUrl,
        isLeaf:false
    };

    genNodesAndEdges(originData,nodes,edges,null,graph);

    return {
        nodes,
        edges
    }
}


// 开始
export function start(graph:any,minimap:any){
    let { nodes, edges } = createNodesAndEdges(null,graph);
    graph.resetCells([...nodes, ...edges]);
    layout(graph);
    // 布局完成后引入小地图插件，否则渲染不出来
    graph.use(minimap);

    eventsHandler(graph);
    // graph.zoomToFit({ padding: 20, maxScale: 1 });
    graph.zoomTo(0.8)
    graph.centerContent()
}