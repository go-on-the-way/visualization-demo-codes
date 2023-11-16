import { MetaSorted, PageConfigNew, PageType } from 'schema-form';
import _ from 'lodash';
import { IOperations } from './schema';
import COM from './constant';
import Data from '@/db/render/demo';

export type initialSchemaType = 'NORMAL' | 'SEARCH' | 'DETAIL';

const filterProps = (type: PageType, obj: any) => {
    const { disabled } = obj;
    if (type === 'DETAIL') {
        return {
            'x-pattern': 'readPretty',
            'x-editable': false,
        };
    } else {
        return {
            disabled,
            'x-disabled': disabled,
        };
    }
};

const getDefaultValue = (cache: any, meta: any, deps: any[]) => {
    const { type } = cache;
    const { defaultValue, detailValue, value, props, key } = meta;
    if (type === 'DETAIL') {
        return props?.attributes?.needValue || deps.includes(key) ? value : detailValue || value;
    } else {
        return value || defaultValue || props?.attributes?.defaultValue || null;
    }
};

const printLog = (log: string, color: string = 'green') => {
    // @ts-ignore
    // if (DEV === 'development') {
        let error: any = {};
        console.log(`%c ... ${log} `, `font-size:12px;color:${color};background:white;`);
        if (!error.info) {
            error.info = [];
        }
        error.info.push(log);
    // }
};

const attributes2componentProps = (reactConfig: any) => {
    const attributes: any = reactConfig.fulfill?.schema?.attributes;
    var comType = ['object', 'array'];
    function plat(o: any, prekey: any, resobj: any) {
        prekey = prekey ? prekey + '.' : '';
        var keys = Object.keys(o);
        keys.forEach(function (item) {
            var v = o[item];
            var type = typeof v;
            if (v && comType.indexOf(type) != -1) {
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


// 兼容移动端去掉名称
const lableName = (flag: any, title: any) => {
    if (flag === true) {
        return title?.replace('名称', '');
    }
    if (flag) {
        return title?.replace(flag, '');
    }
    return title
}

//添加一个方法获取operations 操作列配置
const getSchemaGrid = (column: any, type: initialSchemaType, props: any, config: any) => {
    if (!column.length) {
        console.warn('请获取当前表格列');
        return;
    }
    const schemaColumns: any = {
        properties: {},
    };
    column.map((meta: any, index: number) => {
        let {
            key,
            label,
            props: {
                inputValueComponentType = 'Input',
                required = '0',
                attributes,
                reactConfig,
                validates,
                sequence,
                colspanNum,
                labelCol,
                wrapperCol,
                hideName,

            },
        } = meta;

        const df = getDefaultValue({ type }, meta, []);

        // 设置properties值
        schemaColumns['properties'][key] = {
            type: 'string',
            required: required === '1' || required === 'true' || required,
            title: hideName === '1' ? '' : lableName(attributes?.repName, label),
            ...filterProps(type, meta?.props || {}),
            default: df,
            'x-index': sequence || 1,
            'x-decorator': 'FormItem',
            'x-component': inputValueComponentType,
            'x-hidden': Boolean(+meta?.props?.hidden),
            'x-decorator-props': {
                gridSpan: colspanNum,
                // @ts-ignore
                labelCol: +labelCol >= 0 ? +labelCol : +config?.labelCol,
                // @ts-ignore
                wrapperCol: +wrapperCol || +config?.wrapperCol,
            },
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
        };
    });
    // 处理简易版本的 跨行跨列
    schemaColumns['grid'] = {
        type: 'void',
        'x-component': 'FormGrid',
        'x-component-props': {
            maxColumns: 3,
            minColumns: 2,
            ...props,
        },
        properties: {
            ...schemaColumns['properties'],
        },
    };

    // 动态匹配出
    delete schemaColumns['properties'];
    return schemaColumns;
};
// 操作按钮转化模式
const transformBtn = (operations: any, eventMap: any, components: string) => {
    // todo: 添加按钮需要动态的添加对应的key 还需要去ArrayTable里面进行扩展
    let btn: any = {};
    operations.forEach((i: any) => {
        btn[COM[i.key]] = {
            type: 'void',
            'x-component': components ? `${components}.${COM[i.key]}` : COM[i.key],
            'x-component-props': {
                ...operations?.props,
                // ...eventMap,
                [i?.props?.hook]: eventMap?.[i?.props?.hook],
            },
        };
    });
    return btn;
};
// 配置左上角的操作按钮
const getOperations = (operations: IOperations, eventMap: any, components: any) => {
    const d = transformBtn(operations, eventMap, components);
    return {
        ...d,
    };
};
/**
 * @description 获取所有类型数据
 * @param metas
 * @param pageConfig
 * @param type
 * @returns MetaSorted
 */
const getMetaSorted = (pageConfig: PageConfigNew): MetaSorted => {
    const buttons: any = [];
    const tableButtons: any = [];
    const columns: any = [];
    const tableColumns: any = [];
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
            case 'table_column':
                tableColumns.push(o);
                break;
            case 'table_button':
                tableButtons.push(o);
                break;
            case 'column':
                columns.push(o);
                values[o.key] = o.value;
                detailValues[o.key] = o.detailValue;
                valuesADetail[o.key] = { value: o.value, detailValue: o.detailValue };
                break;
        }
    });
    return {
        buttons,
        tableButtons,
        columns,
        values,
        detailValues,
        valuesADetail,
        remotes,
        pageConfig,
        tableColumns,
    };
};

/**
 *
 * @param buttons 动态配置
 * @param eventMap 全局注入hooks
 * @returns
 */
const wrapBtn = (buttons: any, eventMap: any, components: any) => {
    let obj: any = {};
    if (Array.isArray(buttons) && buttons.length > 0) {
        buttons.forEach((i: any) => {
            obj[i.key] = {
                title: i.label,
                type: 'void',
                'x-component': `${components}.${COM[i.key]}`,
                'x-component-props': {
                    ...i?.props,
                    // ...eventMap,
                    [i?.props?.hook]: eventMap?.[i?.props?.hook],
                },
            };
        });
    }
    return {
        properties: {
            ...obj,
        },
    };
};
// 获取完整的schema
const wrapSchema = (
    btnOperation: any,
    columns: any,
    operations: any,
    props: any,
    key: any,
    components: string,
) => {
    return {
        type: 'object',
        properties: {
            [key]: {
                type: 'array',
                'x-component': `${components}`,
                title: `${props.title}`,
                items: {
                    type: 'object',
                    properties: {
                        index: {
                            type: 'void',
                            'x-component': `${components}.Index`,
                        },
                        ...columns,
                        ...operations,
                    },
                },
                ...btnOperation,
            },
        },
    };
};
/**
 *
 * @param config 获取初始化参数
 * @param type 获取初始化参数
 */
const initialArrayCollapSchema = (
    config: PageConfigNew,
    type: initialSchemaType,
    addition: boolean,
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

    const btnOperation = addition
        ? wrapBtn(res.buttons, eventMap, props.inputValueComponentType)
        : '';

    let columns: any = [];
    let operations: any = [];


    if (
        (res?.columns && res?.columns?.length > 0) ||
        (res?.tableColumns && res?.tableColumns?.length > 0)
    ) {
        columns = getSchemaGrid(
            res?.columns?.length ? res?.columns : res?.tableColumns,
            type,
            props,
            config,
        );
    } else {
        printLog(`${res?.tableColumns}请配置列表列`, 'red');
    }
    if (res?.tableButtons && res?.tableButtons?.length > 0) {
        operations =
            type === 'DETAIL'
                ? {}
                : getOperations(res?.tableButtons, eventMap, props.inputValueComponentType);
    }

    const wrap = wrapSchema(
        btnOperation,
        columns,
        operations,
        props,
        key,
        props.inputValueComponentType,
    );
    return wrap;
};
// const warpForm = (finalScema: any) => {
//   // 挂载最外层 layout
//   // 表单统一布局
//   const formLayoutSchema = {
//     type: 'void',
//     'x-component': 'FormLayout',
//     'x-component-props': {
//       labelCol: 6,
//       wrapperCol: 18,
//     },
//     properties: {},
//   };
//   const BaseSchemaJson: any = {
//     type: 'object',
//     properties: {
//       formLayout: {
//         ...formLayoutSchema,
//       },
//     },
//   };
//   const Base = BaseSchemaJson.properties.formLayout;
//   Base.properties = finalScema.properties;
//   return BaseSchemaJson
// }
export const initArrayCollap = (props: any, eventMap: any) => {
    const pageCode = props?.pageCode
    return Promise.resolve(Data).then((res: any) => {
        const conf = initialArrayCollapSchema(
            res?.result,
            props?.type,
            props?.addition,
            props?.key,
            props,
            eventMap,
        );
        return conf;
    });
}
export default initArrayCollap;
