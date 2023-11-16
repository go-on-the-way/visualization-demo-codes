import { Rule } from 'antd/lib/form';
import { ColumnsType } from 'antd/lib/table';
import { PageResultType } from 'common-module';
import { Field } from 'schema-form';

export interface EditableColField {
  required?: boolean; // 是否必填
  rules?: Rule[] | undefined; // 规则信息
  component?: string; // 组件
  onChange?: (e: any, data?: any) => void;
  [props: string]: any;
}

export interface TableRenderProps {
  metas?: Field[];
  defaultColumns?: ColumnsType<object>;
  handleSearch?: Function; // 查询方法
  searchParams?: any; // 查询参数
  data?: PageResultType<any>; // 离线分页数据
  history?: any;
  match?: any;
  extraAction?: any; // 其他表头操作
  rowsRender?: object | {};
  operation?: Function | any; // 操作列
  isRequesting?: boolean | false;
  tableSize?: 'small' | 'middle' | 'large' | undefined;
  extraPropsForOp?: any;
  defaultExpandedRowKeys?: any;
  onExpandedRowsChange?: any;
  rowKey?: any;
  expandedRowKeys?: any;
  tableExpandControl?: any;
  onExpand?: any;
  operWidth?: number; // 操作列宽
  rowSelection?: any;
  bordered?: boolean;
  onTableChange?: (page: any) => void;
  operAuths?: any[]; // 操作列权限，用于设置列宽
  className?: string;
  pagination?: boolean | true; // 是否分页
  footer?: any;
  resetColumns?: (columns: ColumnsType<object>) => ColumnsType<object>;
  scrollX?: number | string, // 纵向滚动条长度
  scrollRowNum?: number, // 多少行数据触发纵向滚动条
  [propsname: string]: any;
}
