import { G6Type } from "./index";

export const registerHvhEdge = (G6: G6Type) => {
  G6.registerEdge("hvh", {
    draw(cfg: any, group: any) {
      const startPoint = cfg.startPoint;
      const endPoint = cfg.endPoint;
      const modle = cfg.targetNode.getModel();

      const shape = group.addShape("path", {
        attrs: {
          stroke: "#333",
          path: [
            ["M", startPoint.x, startPoint.y],
            modle.level > 3
              ? ["L", endPoint.x - (3 / 4) * modle.size[0], startPoint.y] // 三分之一处
              : ["L", startPoint.x, endPoint.y / 3 + (2 / 3) * startPoint.y], // 三分之一处
            modle.level > 3
              ? ["L", endPoint.x - (3 / 4) * modle.size[0], endPoint.y] // 三分之二处
              : ["L", endPoint.x, endPoint.y / 3 + (2 / 3) * startPoint.y], // 三分之二处
            ["L", endPoint.x, endPoint.y],
          ],
        },
        // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
        name: "path-shape",
      });
      return shape;
    },
  });
};
