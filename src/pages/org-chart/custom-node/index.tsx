import {
  PlusCircleOutlined,
  MinusCircleOutlined
} from '@ant-design/icons';
import { useState } from "react";
import './index.less';
import { layout, createNode, createEdge, findDescendants } from "../tool";

const CustomNode = (props:any) => {
  let { node, cell } = props;
  const { orgName, isLeaf, graph } = node.getData();
  const [ type,setType ] = useState('close');

  const triggerClick = (type:'open'|'close')=>{
    const nodes = graph.getNodes()
    const edges = graph.getEdges()
    switch (type) {
      case "open":
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
            layout(graph);
          });
        break;
      case "close":
          let removeNodeIds = findDescendants(nodes,node).map(item=>item.id);
          graph.removeCells(removeNodeIds);
          layout(graph);
        break;
      default:
        break;
    } 
    setType(type);
  }

  return (
    <div className="custom-node">
      <h1 className="custom-node__title">{orgName}</h1>
      <div className="custom-node__body">
        <img src="https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*kUy8SrEDp6YAAAAAAAAAAAAAARQnAQ" alt="" />
        <div style={{ display:'flex',flex:1, flexDirection:'column'}}>
            <div>职位</div>
            <div>姓名</div>
        </div>
      </div>
      {
        !isLeaf && <div className="custom-node__footer">
            {
              type === 'close' && <span className="custom-node-open__btn">
                  <PlusCircleOutlined onClick={(event)=>{ triggerClick('open') }}/>
                </span>
            }
            {
              type === 'open' && <span className="custom-node-close__btn">
                <MinusCircleOutlined onClick={(event)=>{ triggerClick('close') }} />
              </span>
            }
          </div>
        }
    </div>
  )
}

export default CustomNode;