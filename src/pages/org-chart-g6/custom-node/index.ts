import G6 from '@antv/g6';
import { registerCardNode } from './card-node';
import { registerHvhEdge } from './hvh-edge';

type G6Type = typeof G6;

const registerCustomNode = () => {
  registerCardNode(G6);
  registerHvhEdge(G6);
};

export {
  G6,
  G6Type,
  registerCustomNode,
};


