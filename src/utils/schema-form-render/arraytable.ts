import { MetaSorted, PageConfigNew, PageType, Field } from 'schema-form';
import _, { String, isBoolean } from 'lodash';
import { IOperations } from './schema';
import COM from "./constant";
import Data from '@/db/render/demo';

export type initialSchemaType = 'NORMAL' | 'SEARCH' | 'DETAIL';

const printLog = (log: string, color: string = 'green') => {
    // @ts-ignore
    // if (DEV === 'development') {
        let error:any = {};
        console.log(`%c ... ${log} `, `font-size:12px;color:${color};background:white;`);
        if (!error.info) {
            error.info = [];
        }
        error.info.push(log);
    // }
};

// 获取是否配置序号
const getSchemaColumns = () => {
    return {
        column0: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': { title: '序号', align: 'center', fixed: 'left', width: 60 },
            properties: {
                index: {
                    type: 'void',
                    'x-component': 'ArrayTable.Index',
                },
            },
        },
    };
};

const attributes2componentProps = (reactConfig: any) => {
    const attributes: any = reactConfig.fulfill?.schema?.attributes;
    var comType = ['object',];
    function plat(o: any, prekey: any, resobj: any) {
        prekey = prekey ? prekey + '.' : '';
        var keys = Object.keys(o);
        keys.forEach(function (item) {
            var v = o[item];
            var type = typeof v;
            if (!Array.isArray(v) && v && comType.indexOf(type) != -1) {
                plat(v, prekey + item, resobj);
            } else {
                resobj[prekey + item] = v;
            }
        });
    }
    var result = {};
    attributes && plat(attributes, 'x-component-props', result);
    delete reactConfig.fulfill?.schema?.attributes;
    if (!reactConfig.fulfill) {
        reactConfig.fulfill = {};
    }

    reactConfig.fulfill.schema = {
        ...reactConfig.fulfill.schema,
        ...result,
    };
    return reactConfig;
};

//添加一个方法获取operations 操作列配置
const getTableColumn = (column: any, type: initialSchemaType) => {
    if (!column.length) {
        console.warn('请获取当前表格列');
        return;
    }
    const schemaColumns:any = {};
    column.map((meta: any, index: number) => {
        let {
            key,
            label,
            props: {
                inputValueComponentType = 'Input',
                required = '0',
                disabled = '0',
                attributes,
                reactConfig,
                validates,
            },
        } = meta;
        schemaColumns[`${key}`] = {
            type: 'void',
            'x-component': 'ArrayTable.Column',

            'x-component-props': {
                width: attributes?.width,
                title: label,
                editable:
                    type === 'DETAIL'
                        ? false
                        : attributes?.hasOwnProperty('editable')
                            ? attributes?.editable
                            : true,
                columnRenderType: attributes?.columnRenderType,
                colName: attributes?.colName,
            },
            properties: {
                [key]: {
                    type: 'string',
                    required: required === "1" ||
                        required === "true" ||
                        required === true ||
                        false,
                    disabled: Boolean(+disabled),
                    'x-disabled': Boolean(+disabled),
                    'x-decorator': 'FormItem',
                    'x-decorator-props': {
                        feedbackLayout: 'popover',
                    },
                    'x-component': inputValueComponentType,
                    'x-component-props': {
                        ...attributes,
                        editable: type === 'DETAIL' ? false : attributes?.editable,
                    },
                    'x-reactions': {
                        ...(reactConfig && attributes2componentProps(reactConfig)),
                    },
                    'x-validator': {
                        ...validates,
                    },
                },
            },
        };
    });
    return schemaColumns;
};
// 操作按钮转化模式
const transformBtn = (operations: any, eventMap: any) => {
    // todo: 添加按钮需要动态的添加对应的key 还需要去ArrayTable里面进行扩展
    const btnName:any = {
        shanchu: 'remove',
        bianji: 'edit',
        chakan: 'detail',
    };
    const comName:any = {
        shanchu: 'ArrayTable.Remove',
        bianji: 'ArrayTable.EditOut',
        chakan: 'ArrayTable.Detail',
    };
    let btn:any = {};
    operations.forEach((i: any) => {
        btn[btnName[i.key]] = {
            type: 'void',
            'x-component': comName[i.key] || 'ArrayTable.Remove',
            'x-component-props': {
                ...operations?.props,
                [i?.props?.hook]: eventMap?.[i?.props?.hook],
            },
        };
    });
    return btn;
};
// 获取配置操作按钮
const getOperationsColumns = (
    operations: IOperations,
    index: number,
    type: initialSchemaType,
    eventMap: any,
) => {
    const d = transformBtn(operations, eventMap);

    return {
        operations: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': {
                title: '操作列',
                width: 60,
                dataIndex: 'operations',
                fixed: 'left',
                // fixed: 'right',
                ...operations,
                editable: type !== 'DETAIL',
            },
            properties: {
                item: {
                    type: 'void',
                    'x-component': 'FormItem',
                    properties: {
                        ...d,
                        // remove: {
                        //   type: 'void',
                        //   'x-component': 'ArrayTable.Remove',
                        // },
                        // edit: {
                        //   type: 'void',
                        //   'x-component': 'ArrayTable.EditOut',
                        // }
                    },
                },
            },
        },
    };
};
/**
 * @description 获取所有类型数据
 * @param metas
 * @param pageConfig
 * @param type
 * @returns MetaSorted
 */
export const getMetaSorted = (pageConfig: PageConfigNew): MetaSorted => {
    const buttons: any = [];
    const tableButtons: any = [];
    const searchColumns: any = [];
    const tableColumns: any = [];
    const searchButtons: any = [];
    const values: any = {};
    const detailValues: any = {};
    const valuesADetail: any = {};
    const remotes: any = [];
    const metas = pageConfig.pageDatas;
    // 排序后的分组
    pageConfig.group = _.sortBy(pageConfig.group, (o) => o.seq);
    metas?.map((o: any) => {
        switch (o.type) {
            case 'button':
                buttons.push(o);
                break;
            case 'table_button':
                tableButtons.push(o);
                break;
            case 'search_column':
                values[o.key] = o.value;
                detailValues[o.key] = o.detailValue;
                valuesADetail[o.key] = { value: o.value, detailValue: o.detailValue };
                searchColumns.push(o);
                break;
            case 'table_column':
                tableColumns.push(o);
                break;
            case 'search_button':
                searchButtons.push(o);
                break;
        }
    });
    return {
        buttons,
        tableButtons,
        searchColumns,
        tableColumns,
        searchButtons,
        values,
        detailValues,
        valuesADetail,
        remotes,
        pageConfig,
    };
};
/**
 *
 * @param buttons 动态配置
 * @param eventMap 全局注入hooks
 * @returns
 */
const wrapBtn = (buttons: any, eventMap: any, components: any) => {
    let obj:any = {};
    if (Array.isArray(buttons) && buttons.length > 0) {
        buttons.forEach((i: any) => {
            obj[i.key] = {
                title: i.label,
                type: 'void',
                'x-component': `ArrayTable.${COM[i.key]}`,
                'x-component-props': {
                    ...i?.props,
                    // ...eventMap,
                    [i?.props?.hook]: eventMap?.[i?.props?.hook],
                },
            };
        });
    }
    return obj;
};
/**
 *
 * @param serialNumber 是否需要序号
 * @param columns 列的编辑
 * @param operations 设置表格里面的按钮编辑
 * @param key
 * @param props
 * @returns
 */
const wrapSchema = (
    btnOperation: any,
    serialNumber: any,
    columns: object,
    operations: object,
    key: string | undefined | number | any,
    props: any
) => {
    const { wrapComponent, ...restProps } = props || {};
    if (!props?.total) {
        return {
            [key]: {
                items: {
                    type: 'object',
                    properties: serialNumber
                        ? {
                            ...serialNumber,
                            ...operations,
                            ...columns,
                        }
                        : {
                            ...operations,
                            ...columns,
                        },
                },
                properties: {
                    add: {
                        title: '添加',
                        type: 'void',
                        'x-component': 'ArrayTable.Addition',
                    },
                    ...btnOperation
                },
                type: 'array',
                'x-component': wrapComponent || 'ArrayTable',
                'x-component-props': {
                    pagination: false,
                    scroll: { x: '100%' },
                    ...restProps,
                },
                'x-decorator': 'FormItem',
            }
        }
    } else {
        return {
            [key]: {
                items: {
                    type: 'object',
                    properties: serialNumber
                        ? {
                            ...serialNumber,
                            ...operations,
                            ...columns,
                        }
                        : {
                            ...operations,
                            ...columns,
                        },
                },
                properties: {
                    add: {
                        title: '添加',
                        type: 'void',
                        'x-component': 'ArrayTable.Addition',
                    },
                    ...btnOperation
                },
                type: 'array',
                'x-component': wrapComponent || 'ArrayTable',
                'x-component-props': {
                    pagination: false,
                    scroll: { x: '100%' },
                    ...restProps,
                },
                'x-decorator': 'FormItem',
            },
            total: {
                type: 'number',
                title: '',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-pattern': 'readPretty'
            },
        };
    }
};
/**
 *
 * @param config 获取初始化参数
 * @param type 获取初始化参数
 */
const initialArrayTableSchema = (
    config: PageConfigNew,
    type: initialSchemaType,
    serial: boolean,
    key?: string,
    props?: any,
    eventMap?: any,
) => {
    const res = getMetaSorted(config);
    if (type === 'SEARCH') {
        res.searchButtons?.push({
            key: 'chongzhi',
            label: '重置',
            type: 'search_button',
            props: {
                hook: 'reset',
            },
        });
    }
    const btnOperation = !props?.nNeedAddition
        ? wrapBtn(res.buttons, eventMap, props.inputValueComponentType)
        : '';
    const serialNumber = serial ? getSchemaColumns() : '';
    let columns: any = [];
    let operations: any = [];
    if (res?.tableColumns && res?.tableColumns?.length > 0) {
        columns = getTableColumn(res?.tableColumns, type);
    } else {
        printLog(`${res?.tableColumns}请配置列表列`, 'red');
    }
    if (res?.tableButtons && res?.tableButtons?.length > 0) {
        operations =
            type === 'DETAIL'
                ? (res?.tableButtons.length > 0 ? getOperationsColumns(res?.tableButtons, columns?.length, type, eventMap) : {})
                : getOperationsColumns(res?.tableButtons, columns?.length, type, eventMap);
    }

    const wrap = wrapSchema(btnOperation, serialNumber, columns, operations, key, props);

    return wrap;
};

export const initArrayTable = (props: any, eventMap: any) => {
    const pageCode = props?.pageCode
    return Promise.resolve(Data).then((res: any) => {
        const conf = initialArrayTableSchema(
            res?.result,
            props?.type,
            props?.serial,
            props?.key,
            props,
            eventMap,
        );
        return conf;
    });
}
// export default initialArrayTableSchema;
