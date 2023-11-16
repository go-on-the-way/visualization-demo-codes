declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

declare module 'common-module' {
  // select 值集
  export interface SelectVals {
    text: string;
    value: string;
    id?: string;
  }
  export interface DicVals {
    [key: string]: SelectVals[]
  }
  // 接口返回结果
  export interface ResponseType {
    success?: boolean;
    result?: any;
    message?: string | null;
    code?: string | number;
    [propName: string]: any;
  }

  // 分页查询接口返回结果
  export interface PageResultType<T> {
    content: T[];
    totalElements?: number;
    number?: number;
    size?: number;
    [propName: string]: any;
  }
  // 分页的pager
  export interface Pager {
    totalElements: number;
    number: number;
    size: number;
  }

  export interface PageResponseType<T> {
    success: boolean;
    result: PageResultType<T>;
    message: string | null;
    code: string | number;
  }

  // 分页查询数据
  export interface PaginationAttrType {
    current: number;
    pageSize: number;
    total: number;
    onChange?: (pn: number, ps: number) => any;
    onShowSizeChange?: (pn: number, ps: number) => any;
    showSizeChanger?: boolean;
    showQuickJumper?: boolean;
  }
  // 接口返回结果
  export interface ResponseFormet {
    formArr: any[];
    formArrObj: object;
  }
  // 有些不确定name的type类型
  export interface NoNameType {
    [key: string]: any;
  }
  // key-value
  export interface KeyValueString {
    [key: string]: string;
  }
  // 渲染form标签(自定义)
  export interface FormDicType {
    txt: string; // 参数名字
    key: string; // 参数名
    keyName?: string; // select另外存的一个值
    type: string;// 类型
    isRequired?: boolean;// 是否是必填
    list?: any[]; // 非动态selet的list
    attrCode?: string; // type如果是字典请求
    blurLoading?: string;// 模糊搜索的loading对应名字
    blurList?: string;// 模糊搜索的list对应名字
    blurSearch?: string;// 模糊搜索的search对应名字
    radioArr?: FormDicType[];// radio数组
    disabled?: boolean;
    selectTableObj?: any;
    maxLength?: number;
    formatType?: string; // 格式化内容
    initialValue?: any; //默认值
  }
}


declare module 'schema-form' {
  import { IFormProps } from '@formily/core/esm/types';
  import { ISchema, ISchemaFieldReactFactoryOptions } from '@formily/react';
  import { Form } from '@formily/core/esm/models';
  import { History } from 'history';
  import { match } from 'react-router';
  type PageType = 'NORMAL' | 'DETAIL' | 'SEARCH';
  interface routeProps {
    history?: History,
    match?: match,
    [propsName: string]: any,
  }
  interface EmptyNode {
    key: string;
    sequence: number;
    groupCode?: string;
    labelCol?: number;
    wrapperCol?: number;
    component?: string;
    eventMap?: any;
    empty_columns?: Field[];
    needChild?: boolean;
    emptyArrayChild?: string[];
    original?: null | any;
    [propsName: string]: any;
  }

  interface createSchema {
    (createSchemaFieldConfig?: ISchemaFieldReactFactoryOptions, formConfig?: IFormProps, extProps?: any): createSchemaReturn
  }

  interface createSchemaReturn {
    form: Form<any>,
    Render: React.FC<SchemaFormRenderProps>,
  }
  interface SchemaFormRenderProps {
    pageConfig?: PageConfigNew; // 页面配置信息
    pageCode?: string; // 页面 code
    schema: ISchema;
    bizArray?: string[]
  }
  interface SchemaFormRenderState { }
  interface Field {
    key: string;
    value?: any; // 编辑使用 value
    detailValue?: any; // 详情使用 value
    defaultValue?: any; // 默认值
    historyValue?: any; // 历史值
    name?: string;
    title?: string;
    type?: string; // 数据类型
    required?: string;
    dataType?: 'string' | 'object' | 'array' | 'number' | string; // 数据类型
    // TODO:是否需要编辑属性 editable
    [propsName: string]: any;
  }
  interface uiProps {
    colspanNum?: number;
    sequence?: number;
    component?: string;
    groupCode?: string;
    hideName?: string;
    [propsName: string]: any;
  }
  type xComponentProps = {
    [propsName: string]: any;
  };
  type baseComponentProps = {
    disabled?: string;
    [propsName: string]: any;
  };
  interface PageConfigNew {
    labelAlign?: 'left' | 'right' | 'top';
    layout?: number | undefined;
    labelWidth?: number;
    labelCol?: number;
    wrapperCol?: number;
    group?: group[];
    scenes?: string; // 场景
    pageDatas?: Field[];
    [propsName: string]: any;
  }
  interface group {
    code?: string;
    lngName?: any; // TODO: 国际化
    name?: string;
    seq?: number;
    children?: Field[];
  }
  enum FormType {
    CREATE = 'CREATE',
    EDIT = 'EDIT',
    DISPLAY = 'DISPLAY',
    SEARCH = 'SEARCH',
  }
  interface MetaSorted {
    buttons?: Field[];
    columns?: Field[];
    empty_columns?: Field[];
    tableButtons?: Field[];
    searchColumns?: Field[];
    tableColumns?: Field[];
    searchButtons?: Field[];
    pageConfig?: PageConfigNew;
    values?: any;
    detailValues?: any;
    valuesADetail?: any;
    remotes?: any;
    schema?: any;
    colsMap?: any;
    ArrayTableList?: Field[];
    ArrayColList?: Field[];
    bizArray?: string[];
    depsArray?: string[];
    emptyArrayChild?: string[];
  }

  type FieldItemProps = {
    meta: Field;
  };

  interface FieldGroupProps {
    title: string;
    children?: JSX.Element;
    [propsName: string]: any;
  }

  interface FieldLayOutProps {
    key?: string;
    labelCol?: number;
    wrapperCol?: number;
    labelAlign?: 'left' | 'right' | 'top';
    columns?: number;
    children?: JSX.Element;
    [propsName: string]: any;
  }
}

declare module "hoc-form" {
  import { ColumnsType } from "antd/lib/table";
  import { routeProps } from "schema-form";
  import { IFormProps } from "@formily/core/esm/types";
  import { ISchemaFieldReactFactoryOptions } from "@formily/react";
  import { PageConfigNew } from "schema-form";

  // noraml
  interface baseProps {
    pageCode?: string; // 配置 code
    metasConfig?: PageConfigNew; // 列表页 meta
    filedConfig?: ISchemaFieldReactFactoryOptions; // 配置私有组件，scope 方法
    formConfigs?: IFormProps; // 交互事件
    anchor?: boolean; // 是否需要锚点导航
    modelCode?: string; // 模型 code
    backBtnHook?: any; // 处理返回按钮事件
    events?: any; // 事件注册
    needGroup?: boolean; // 页面是否需要分组
    dealMetas?: (data: any[]) => void; // 处理 metas
    getInitFormData?: (params: any) => Promise<any>; // 远程请求初始化 json
    getMetaWithValue?: (params: any) => Promise<any>; // 远程请求 meta 配置+value
    bindLogicParams?: any; // 外部传入的流程参数
    [propsName: string]: any;
  }
  interface backProps extends baseProps, routeProps {
    type?: "NORMAL" | "DETAIL";
    remoteUrl?: string;
    remoteParams?: any;
    method?: "post" | "get";
    nobtns?: boolean; // 展示底部配置按钮
    needFooter?: boolean; // 展示底部 footer
    initBackBtn?: boolean; // 初始化返回按钮
  }
  interface WithNormalHoc {
    (props: baseProps): React.ComponentClass<backProps>;
  }
  // list
  interface hocEvents {
    tableButtonsEvents?: any;
    buttonsEvents?: any;
  }
  interface CreateModalListProps extends routeProps {
    pageCode?: string; // 模型 code
    metasConfig?: any; // 列表页 meta
    modalMetasConfig?: any; // 弹窗 编辑 meta
    noModal?: boolean; // 为 true 则为单纯列表页面
    pageApi?: string; // 分页 api
    dealMetaBeforeRender?: (config: any) => any;
    dealModalMetasBeforeRender?: (metas: any) => any; // 处理弹窗 meta模型渲染
    events?: hocEvents;
    handleSave?: (data: any) => any; // 弹窗保存方法
    rowSelection?: any; // 单据选择
    rowKey?: string; // table key
    noTableOpCol?: boolean; // 操作列是否存展示
    modalCode?: string; // 弹窗 code
    noQueryKeys?: boolean; // 兼容非元模型模式
    noCache?: boolean; // 是否启用缓存
    formatSearchData?: <T>(params: any) => T; // 处理查询条件 format
    operWidth?: number;
    editable?: boolean; // 是否可编辑
    editableIdKey?: string; // 可编辑行唯一标识字段
    editableColsMap?: {
      [colKey: string]: any;
    }; // 可编辑列组件渲染信息(可编辑状态下不传，默认编辑全部列字段)
    onEditableRowSave?: (data: any) => Promise<void> | void; // 可编辑行保存回调
    nested?: boolean; // 是否可嵌套子表格
    nestedTableColumns?: ColumnsType<any>; // 嵌套表格的columns
    nestedTableDataKey?: string; // 嵌套表格数据对应主表格数据的字段
    extraPrams?: any;
    filedConfig?: ISchemaFieldReactFactoryOptions;
    formConfigs?: IFormProps;
    match?: any;
    modalfiledConfig?: any;
    modalformConfigs?: any;
    reloadFlag?: any;
    validator?: Validator;
    showWay?: "modal" | "drawer";
    clearSelectedRowKeys?: () => {} | (() => void);

    /**
     * 点击查询按钮查询数据的方法，如果传入这个方法就使用这个方法查询数据，否则根据pageApi使用组件默认的查询数据的方法。
     * */
    queryDataFunc?: (params: {
      queryKeys: {
        pageCode: string;
        [name: string]: any;
      };
      pageNo: number;
      pageSize: number;
    }) => Promise<any>;
  }
  interface Validator {
    checkNormalBtns?: (key: string, row: any) => boolean;
    checkColBtns?: (key: string, row: any) => boolean;
  }
  interface CreateModalListHoc {
    (props: CreateModalListProps): React.FC<CreateModalListProps>;
  }
  // tree-list
  export interface WithTreeListProps {
    method?: "GET" | "POST";
    treeParams: {}; // 参数
    url: string;
    pageApi: string;
    async?: boolean;
    searchCode?: string;
    noQueryKeys?: boolean;
    nodeKeys?: string[]; // 节点取值
    paramsMap?: string[]; // 参数映射
    events?: hocEvents; // 时间
    modalCode?: string;
    noModal?: boolean;
    modalfiledConfig?: any;
    modalformConfigs?: (params: any) => void;
    history?: any;
    nodeSelect?: any;
    rowSelection?: any;
    rowKey?: string;
    handleSave?: (values: any) => any;
    onCancel?: any;
    metasConfig?: any; // 列表离线数据
    modalMetasConfig?: any; // 弹窗离线数据
    outerNode?: any; // 根节点
    keyName?: any; // value 映射
    titleName?: any; // title 映射
    cantUnSelect?: boolean; // 禁止取消选择
    defaultSelectedKeys?: any[]; // 默认选中的key
    defaultExpandedKeys?: any[];
    nodeButtons?: any[]; // 选择树节点右边按钮
    extraPrams?: any;
    api?: any; // 详情弹窗配置
    validator?: Validator;
    match?: any;
  }
}