import FormComponentProps from 'antd/es/form';

// eslint-disable-next-line import/no-extraneous-dependencies
import { RouteComponentProps } from 'react-router-dom';

// 公用form 和 route 参数
// @ts-ignore
export interface CommonModelProps extends FormComponentProps, RouteComponentProps {
    [propsname: string]: any;
    match?: any;
}
export declare interface PageConfig {
    formLabel?: 'left' | 'right' | 'top';
    layout?: number | undefined;
    group?: group[];
    width?: number;
    pageDatas: Meta[];
    code?: string;
    [propsName: string]: any;
}

export declare interface group {
    code: string;
    lngName: any; // 国际化
    name: string;
    seq: number;
    children?: Meta[];
}

export enum FormType {
    CREATE = 'CREATE',
    EDIT = 'EDIT',
    DISPLAY = 'DISPLAY',
    SEARCH = 'SEARCH',
}

export interface Meta {
    props: MetaMeta;
    value?: any; // 初始值
    type?: string; // meta类型值
    detailValue?: any; // id组件 对应的 值
    key: string; // 表单对应key值
    label?: string; // 表单描述
    historyValue?: any; // 历史值
    needAnchor?: boolean; // 是否需要锚点
    isTitle?: boolean; // 是否为分组
    code?: string; // 分组code
}

export interface MetaMeta {
    required?: string; // 是否必填
    inputValueComponentType?: string; // 输入组件类型
    searchValueComponentType?: string; // 搜索组件类型
    isSearch?: boolean | string; // 是否可搜索
    isBaseSearch?: boolean | string; // 是否默认搜索
    defaultValue?: any; // 初始值
    style?: any;
    isPageTitle?: any; // 是否为标题
    colspanNum?: number; // 跨列
    max?: number; // 最大长度
    min?: number; // 最小长度
    regExp?: any; // 正则表达式
    precision?: number; // 数字精度
    groupInfo?: string; // 分组编码
    groupInfoName?: string; // 分组名称
    groupOrder?: string; // 分组顺序
    groupAuthCode?: string; // 分组权限编码
    sequence?: number; // 顺序
    authCode?: string; // 权限编码
    name?: string; // 名称
    dataType?: 'string' | 'object' | 'array' | 'number' | string; // 数据类型
    attrCode?: string; // 字典编码
    visible?: string;
    isPrimaryKey?: string; // 是否主键
    isTableColumn?: string; // 是否列表显示
    isBaseTableColumn?: string; // 是否列表默认显示
    disabled?: string; // 是否禁用
    group?: any;
    columnRenderType?: 'NUMBER' | 'DATE_V1' | 'DICT_TYPE' | 'ARRAY' | 'IMG'; // 列表格式化类型
    remoteUrl?: string; // 远程调用地址
    codeMapping?: string; // 编码映射字段
    nameMapping?: string; // 名称映射字段
    params?: any[]; // 调用参数
    method?: 'GET' | 'POST'; // 请求方式
    expStyle?: any;
    noValueName?: boolean;
    icon?: string;
    hook?: any;
    hideName?: string; // '1'为隐藏
    copParams?: any; // 配置额外得组件需要传入得参数
    [other: string]: any;
}
