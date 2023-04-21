import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  nodeModulesTransform: {
    type: 'all',// none
    exclude:[]
  },
  externals: {
   
  },
  scripts: [],
  routes,
  fastRefresh: {},
});
