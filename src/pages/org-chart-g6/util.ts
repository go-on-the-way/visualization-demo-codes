// import HierarchyLayout from '@antv/hierarchy';

import { G6Type } from './custom-node';

const HierarchyLayout = require('@antv/hierarchy');

/**
 * 重置组织树数据
 * @param treeData
 * @returns
 */
export const resetTreeData = (treeData: any) => {
  return {
    ...treeData,
    children: treeData.level === 3 ? undefined : treeData.children.map((o: any) => {
      return resetTreeData(o);
    })
  }
}


/**
 * 初始化树图
 * @param G6
 * @param treeData
 */
export const initTreeGraph = (G6: G6Type, treeData: any) => {
  const Hierarchy = HierarchyLayout || (window as any).Hierarchy;
  const container = document.getElementById('container') as HTMLElement;
  const width = container.scrollWidth;
  const height = container.scrollHeight || 500;

  // 实例化 minimap 插件
  const minimap = new G6.Minimap({
    container: 'minimap',
    size: [160, 80],
    type: 'delegate'
  });

  const graph = new G6.TreeGraph({
    container: 'container',
    width,
    height,
    renderer: 'svg',
    linkCenter: true,
    modes: {
      default: [
        'drag-canvas',
        'zoom-canvas',
      ],
    },
    defaultNode: {
      type: 'card-node',
      size: [150, 60],
    },
    defaultEdge: {
      type: 'hvh',
    },
    layout: ((currentData: any) => {
      let subtrees: any[] = [];

      G6.Util.traverseTree(treeData, (sub: any) => {
        if (sub.level === 3) {
          subtrees.push(sub);
        }
      });
      const indentedConfig = {
        direction: "LR",
        indent: 80,
        getHeight: function getHeight() {
          return 40;
        },
        getWidth: function getHeight() {
          return 30;
        }
      };
      const config = {
        direction: "TB",
        getHeight: function getHeight() {
          return 80;
        },
        getWidth: function getWidth() {
          return 80;
        },
        getVGap: function getVGap() {
          return 30;
        },
        getHGap: function getHGap() {
          return 60;
        },
        preventOverlap: true
      };
      const treeLayoutData = Hierarchy["compactBox"](currentData, config);

      subtrees.forEach(subtree => {
        const subtreeLayoutData = Hierarchy["indented"](
          subtree,
          indentedConfig
        );

        let x: number, y: number;
        G6.Util.traverseTree(treeLayoutData, (sub: any) => {
          if (sub.id === subtree.id) {
            x = sub.x;
            y = sub.y;
          }
        });
        G6.Util.traverseTree(subtreeLayoutData, (sub: any) => {
          sub.x = x;
          sub.y += y;
        });
        G6.Util.traverseTree(treeLayoutData, (sub: any) => {
          sub.children?.forEach((child: any, i: number) => {
            if (child.id === subtree.id) {
              sub.children.splice(i, 1, subtreeLayoutData);
            }
          });
        });
      })

      return treeLayoutData;
    }) as any,
    plugins: [minimap]
  });

  graph.data(resetTreeData(treeData));
  graph.render();
  graph.fitView();
  graph.on('node:click', (e:any) => {
    if (e.target.get('name') === 'collapse-icon') {
      e.item.getModel().collapsed = !e.item.getModel().collapsed;
      graph.setItemState(e.item, 'collapsed', e.item.getModel().collapsed);
      graph.layout();
    }
  });

  if (typeof window !== 'undefined')
    window.onresize = () => {
      if (!graph || graph.get('destroyed')) return;
      if (!container || !container.scrollWidth || !container.scrollHeight) return;
      graph.changeSize(container.scrollWidth, container.scrollHeight);
    };
}