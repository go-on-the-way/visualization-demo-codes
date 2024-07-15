import { G6Type } from "./index";
import { userSvg, teamSvg } from './svg';

export const registerCardNode = (G6: G6Type) => {
  G6.registerNode('card-node', {
    draw: (cfg: any, group: any) => {
      const r = 2;
      const color = '#5B8FF9';
      const w = cfg.size[0];
      const h = cfg.size[1];
      const shape = group.addShape('rect', {
        attrs: {
          x: cfg.level > 3 ? 0 : -w / 2,
          y: -h / 2,
          width: w, //200,
          height: h, // 60
          stroke: color,
          radius: r,
          fill: '#fff',
        },
        // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
        name: 'main-box',
        draggable: true,
      });

      group.addShape('rect', {
        attrs: {
          x: cfg.level > 3 ? 0 : -w / 2,
          y: -h / 2,
          width: w, //200,
          height: h / 3, // 60
          fill: color,
          radius: [r, r, 0, 0],
        },
        // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
        name: 'title-box',
        draggable: true,
      });

      // title text
      group.addShape('text', {
        attrs: {
          textBaseline: 'middle',
          x: cfg.level > 3 ? 8 : -w / 2 + 8,
          y: -h / 3,
          lineHeight: 1,
          text: cfg.id,
          fill: '#fff',
          fontSize: 14,
          fontWeight: 500
        },
        // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
        name: 'title',
      });
      group.addShape('dom', {
        attrs: {
          x: cfg.level > 3 ? 8 : -w / 2 + 8,
          y: -h / 12,
          width: h / 2,
          height: h / 2,
          html: cfg.img ? `
            <div style="width: 100%; height: 100%; border-radius: 50%; overflow: hidden;">
              <img alt="img" style="width: 100%; height: 100%;" src="${cfg.img}" />
            </div>
          ` : `
            <div style="width: 100%; height: 100%; border-radius: 50%; overflow: hidden;">
              ${cfg.level > 3 ? userSvg : teamSvg}
            </div>
          `,
        },
        // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
        name: `dom-shape`,
      });
      group.addShape('text', {
        attrs: {
          textBaseline: 'middle',
          x: cfg.level > 3 ? 12 + h / 2 : -w / 2 + 12 + h / 2,
          y: h / 6,
          lineHeight: 1,
          text: `${cfg.id}:描述信息`,
          fill: 'rgba(0,0,0, 1)',
          fontSize: 12
        },
        // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
        name: `description`,
      });
      cfg.children &&
        group.addShape('marker', {
          attrs: {
            x: cfg.level === 3 ? -w / 4 : 0,
            y: h / 2,
            r: 7,
            cursor: 'pointer',
            symbol: cfg.collapsed ? G6.Marker.expand : G6.Marker.collapse,
            stroke: '#fa5a01',
            lineWidth: 1,
            fill: '#fff',
          },
          // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
          name: 'collapse-icon',
        });

      return shape;
    },
    setState(name, value, item) {
      if (name === 'collapsed') {
        const marker = item?.get('group').find((ele: any) => ele.get('name') === 'collapse-icon');
        const icon = value ? G6.Marker.expand : G6.Marker.collapse;
        marker.attr('symbol', icon);
      }
    },
  });
}