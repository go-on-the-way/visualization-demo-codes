import _, { isBoolean } from 'lodash';
import { initArrayTable } from './arraytable';
import { EmptyNode, Field, MetaSorted, PageConfigNew, PageType } from 'schema-form';
import initArrayCollap from './collapseuntil';
import { components } from './components'

const printLog = (log: string, color: string = 'green') => {
    let error:any = {};
    console.log(`%c ... ${log} `, `font-size:12px;color:${color};background:white;`);
    if (!error.info) {
        error.info = [];
    }
    error.info.push(log);
};

/**
 * @description 将页面配置字段进行分类
 * @param metas
 * @param pageConfig
 * @param type
 * @returns MetaSorted
 */
export const getMetaSorted = (pageConfig: PageConfigNew): MetaSorted => {
    const buttons: any = [];
    const columns: any = [];
    const empty_columns: any = [];
    const tableButtons: any = [];
    const searchColumns: any = [];
    const tableColumns: any = [];
    const searchButtons: any = [];

    const values: any = {};
    const detailValues: any = {};
    const valuesADetail: any = {};

    const remotes: any = [];
    const metas = pageConfig.pageDatas;
    const eventMap = pageConfig?.eventMap || '';

    // 可以编辑表格
    const ArrayTableList: any = [];
    // 卡片，块状数据
    const ArrayColList: any = [];
    // 关联，赋值字段
    const bizArray: any[] = [];
    // 组件依赖，与needValue耦合
    const depsArray: any[] = [];
    // 空节点依赖收集
    const emptyArrayChild: any[] = [];

    // 排序后的分组
    pageConfig.group = _.sortBy(pageConfig.group, (o) => o.seq);

    // 解析页面配置数据
    metas?.map((item: any) => {
        switch (item.type) {
            case 'button':
                if (eventMap) {
                    // 绑定按钮事件
                }
                buttons.push(item);
                break;
            case 'column':
                columns.push(item);
                values[item.key] = item.value;
                detailValues[item.key] = item.detailValue;
                valuesADetail[item.key] = { value: item.value, detailValue: item.detailValue };
                break;
            case 'table_button':
                tableButtons.push(item);
                break;
            case 'search_column':
                searchColumns.push(item);
                values[item.key] = item.value;
                detailValues[item.key] = item.detailValue;
                valuesADetail[item.key] = { value: item.value, detailValue: item.detailValue };
                break;
            case 'table_column': {
                if (!item?.props?.attributes?.hidden) {
                    tableColumns.push(item);
                }
                break;
            }
            case 'empty_column': {
                empty_columns.push(item);
                break;
            }

            case 'search_button':
                searchButtons.push(item);
                break;
        }
    });

    return {
        buttons,
        columns: [...columns, ...empty_columns], // 组合
        tableButtons,
        searchColumns,
        tableColumns,
        searchButtons,
        values,
        detailValues,
        valuesADetail,
        remotes,
        pageConfig,
        ArrayTableList,
        ArrayColList,
        bizArray,
        depsArray,
        emptyArrayChild,
        empty_columns,
    };
};

/**
 * 转化 form item 的 schema
 * @param config 
 * @param tansData 
 * @param cache 
 * @param eventMap 
 * @param metaSorted 
 * @returns 
 */
const transSchema = (
    config: PageConfigNew,
    properties: any[],
    cache: any,
    eventMap: object,
    metaSorted: MetaSorted,
): any => {
    const { depsArray, emptyArrayChild, empty_columns } = metaSorted;
    const emptyArrayChildCd = _.sortedUniq(emptyArrayChild);
    const { type: pageType } = cache;
    const schema: any = [];
    let spanNumber = 0;
    // 通过事件配置页面配置的事件数据
    const eventsMap = config?.eventMap || {};

    if (!properties || properties.length <= 0) {
        return [];
    }
    
    properties?.map((item) => {
        let {
            key,
            label,
            props: {
                sequence,
                groupCode,
                disabled = '0',
                attributes = {},
                labelCol,
                wrapperCol,
                inputValueComponentType,
                reactConfig,
            },
        } = item;
        const isEmptyNode = attributes?.isEmptyNode || false;
        const emptyArrayChild = attributes?.emptyArrayChild || [];

        // 增加绑定事件数据的存储字段
        // attributes['actionEvent'] = eventsMap[item.type + item.key] ? eventsMap[item.type + item.key] : {}

        // if (!item?.props?.inputValueComponentType && item.type !== 'column') {
        //     printLog(
        //         `⚠警告，${label} ${key}字段未配置组件(inputValueComponentType=${item?.props?.inputValueComponentType}), 默认设置为='Input'`,
        //         'red',
        //     );
        // }
        // if (!components[item?.props?.inputValueComponentType] && item?.props?.inputValueComponentType) {
        //     printLog(
        //         `⚠警告，${label} ${key}字段组件(inputValueComponentType=${item?.props?.inputValueComponentType}),未注册请先到schema-components-registed/components-biz注册'`,
        //         'red',
        //     );
        // }
        let exProps = {}
        if (pageType === 'DETAIL') {
            exProps = {
                'x-pattern': 'readPretty',
                'x-editable': false,
            };
        } else {
            exProps = {
                disabled:Boolean(+disabled),
                'x-disabled': Boolean(+disabled),
            };
        }

        const defaultValue = getDefaultValue(cache, item, depsArray);
        let editable = true;
        if (attributes?.editable === false) {
            editable = false;
        }

        const { labelToProps, ...restAttributes } = attributes || {};

        if (labelToProps) {
            restAttributes.label = label;
        }
        // 不是空节点， 或者不属于空子节点
        if (!(isEmptyNode && emptyArrayChildCd.includes(key))) {
            // spanNumber 需要站位数量
            schema.push(
                getNormalNodeSchema(item, {
                    defaultValue,
                    exProps,
                    sequence: sequence + spanNumber || 1,
                    restAttributes,
                    pageType,
                    eventMap,
                    depsArray,
                    editable,
                    config,
                }),
            );
            // @!#@#%#$^ 处理后方占位数量
            if (attributes?.numberPlaceholders) {
                attributes.numberPlaceholders += 0;
            }
            if (attributes?.numberPlaceholders > 0) {
                spanNumber += attributes?.numberPlaceholders;
                let it = 0;
                while (it < attributes?.numberPlaceholders) {
                    schema.push(
                        getEmptyNodeSchema({
                            key: `${key}_${it}`,
                            sequence: sequence + spanNumber + it + 1,
                            groupCode,
                            // @ts-ignore
                            labelCol: +labelCol >= 0 ? +labelCol : +config?.labelCol,
                            // @ts-ignore
                            wrapperCol: +wrapperCol || +config?.wrapperCol,
                            // 特殊处理占位符对应字段 同时显示隐藏 针对 numberPlaceholders  做特殊处理
                            reactConfig: setNumberPlaceholdersReaction(key)
                        }),
                    );
                    it++;
                }
            }
        }
    });
    return schema;
};

/**
 * @description 初始化表单schema
 * @param config 模型配置信息
 * @param type 渲染类型
 * @param needGroup 是否需要分组
 * @param cachePath 缓存路径
 * @param needCache 是否需要缓存
 * @returns
 */
export const initialSchema = (
    config: PageConfigNew,//页面配置
    type: initialSchemaType,
    needGroup: boolean = true,
    cachePath: string = window.location.hash.slice(1),
    needCache: boolean = true,
    eventMap: object = {},
): MetaSorted => {
    printLog(`开始初始化数据，${config?.code}`, 'blue');
    printLog(`初始化协议,类型 = ${type}`);
    printLog(`是否需要分组 = ${needGroup}`);
    printLog(`查询缓存初始化 = ${needCache}`);
    needCache && printLog(`缓存取值路径(默认当前页面hash路径) = ${cachePath}`);

    const sortedConfig = getMetaSorted(config);
    const { searchColumns, columns } = sortedConfig;
    const rootSchemaJson: any = {
        type: 'object',
        properties: {
            formLayout: {
                type: 'void',
                'x-component': 'FormLayout',
                'x-component-props': {
                    labelCol: config?.labelCol || 6,
                    wrapperCol: config?.wrapperCol || 18,
                },
                properties: {},
            },
        },
    };
    const rootLayout = rootSchemaJson.properties.formLayout;
    // 布局
    const formGridSchema: any = {
        type: 'void',
        'x-component': 'FormGrid',
        'x-component-props': {},
        properties: {},
    };
    // 搜索表单类型的搜索项布局
    if (type === 'SEARCH' && searchColumns?.length && searchColumns?.length < 3) {
        formGridSchema['x-component-props'].minColumns = +(config?.layout || 3);
    } else {
        formGridSchema['x-component-props'].maxColumns = +(config?.layout || 3);
    }

    printLog(`元素属性转换SCHEMA开始`);
    const itemSchemas = transSchema(
        config,
        type === 'SEARCH' ? searchColumns || [] : columns || [],
        {
            type,
            needCache,
            cachePath,
        },
        eventMap,
        sortedConfig,
    );
    printLog(`元素属性转换SCHEMA结束`);

    if (needGroup && config?.group) {
        printLog(`开始分组`);
        const gp = _.cloneDeep(config?.group);
        let groupButtons = [];
        if (sortedConfig?.buttons) {
            const { newButtons, groupButtons: gpBtns } = dealButtonsGroup(sortedConfig?.buttons, gp);
            groupButtons = gpBtns;
            sortedConfig.buttons = newButtons;
        }
        const group = initGroup(
            gp,
            itemSchemas || [],
            formGridSchema,
            config,
            _.cloneDeep(rootSchemaJson),
            groupButtons,
        );
        checkEmptyGroup(group);
        rootLayout.properties = { ...group };
        printLog(`结束分组`);
    } else {
        formGridSchema.properties = _.reduce(itemSchemas, (a, b) => {
            return _.merge(a, b);
        });
        rootLayout.properties.layout = formGridSchema;
    }
    printLog(`元素属性转换SCHEMA结束`, 'blue');

    return {
        ...sortedConfig,
        schema: rootSchemaJson,
    };
};

const getNoGroupCol = (formGridSchema: any, baseConfig: any, noGroup: any) => {
    const Base = baseConfig.properties.formLayout;
    const bsf = _.cloneDeep(formGridSchema);
    bsf.properties = _.reduce(noGroup, (a, b) => {
        return _.merge(a, b);
    });
    Base.properties.layout = bsf;
    return Base;
};

/**
 * @description 分组
 * @param group 分组信息
 * @param columns 元数据
 * @param needGroup 是否需要分组
 * @returns group[]
 */
const initGroup = (
    group: any[],
    columns: any[],
    formGridSchema: any,
    config: any,
    baseConfig: any,
    groupButtons: any,
): any[] | [] => {
    const groupSchema = {
        type: 'void',
        'x-component': 'FieldGroup',
        'x-component-props': {},
        properties: {},
    };
    // 排序后的分组
    const newGroup = [...group];
    const groupSchemas: any = {};
    newGroup.forEach((gp) => {
        groupSchemas[gp.code] = {
            ..._.cloneDeep(groupSchema),
            'x-component-props': {
                title: gp.name,
                code: gp.code,
                // TODO: 插入分组按钮属性
                buttons: groupButtons[gp.code] || [],
            },
            properties: {
                layout: {
                    ..._.cloneDeep(formGridSchema),
                    count: 0,
                },
            },
        };
    });
    const noGroup: any[] = [];
    columns?.forEach((i) => {
        const cKey = Object.keys(i)[0];
        const cProps = i[cKey];
        if (cProps?.groupCode) {
            const index = _.findIndex(newGroup, (gp) => gp.code === cProps?.groupCode);
            if (index > -1) {
                groupSchemas[cProps?.groupCode].properties.layout.count += +(
                    cProps['x-decorator-props'].gridSpan || 1
                );
                groupSchemas[cProps?.groupCode].properties.layout.properties[cKey] = cProps;
            } else {
                // 存在字段未分组
                printLog(`警告，存在 ${cKey} 字段,分组(${cProps?.groupCod})不存在!`, 'red');
            }
        } else {
            // 存在字段未分组
            printLog(`警告，存在 ${cKey} 字段未分组!`, 'red');

            noGroup.push({
                [cKey]: cProps,
            });
        }
    });
    const res = formatCols(groupSchemas, config);
    const noGroupCol = getNoGroupCol(formGridSchema, baseConfig, noGroup);
    return {
        ...res,
        nog: noGroupCol,
    };
};
// 控制列
const formatCols = (groupSchemas: any, config: any) => {
    // 处理分组情况
    Object.keys(groupSchemas).map((groupCode) => {
        const layout = groupSchemas[groupCode].properties?.layout;
        const cObj = layout?.properties;
        const number = config?.layout || 3;

        layout['x-component-props'].minColumns = 1;
        layout['x-component-props'].maxColumns = +number;

        const numberPlaceholders = Object.values(cObj).reduce((acc: number, cur: any) => {
            return acc+(cur?.['x-component-props']?.['numberPlaceholders'] || 0);
        }, 0);

        const gridSpan = Object.values(cObj).reduce((acc: number, cur: any) => {
            return acc+(cur?.['x-decorator-props']?.['gridSpan'] || 0);
        }, 0);

        const len = (Object.keys(cObj).length || 0)- numberPlaceholders;

        if (len && gridSpan/len === Number(number) && number > 1) {

            layout['x-component-props'].minColumns = Object.values(cObj).reduce(
                (acc: number, cur: any) => {
                    if (acc >= 3) {
                        return acc;
                    }
                    return acc+(cur?.['x-decorator-props']?.['gridSpan'] || 0);
                },
                0,
            );
        }
    });
    return groupSchemas;
};
// 获取默认值
export const getDefaultValue = (cache: any, meta: any, deps: any[]|any) => {
    const { type } = cache;
    const { defaultValue, detailValue, value, props, key } = meta;
    if (type === 'DETAIL') {
        return props?.attributes?.needValue || deps.includes(key) ? value : detailValue || value;
    } else {
        return value || defaultValue || props?.attributes?.defaultValue || null;
    }
};
// 自动关联needvalue
const getNeedValue = (key: string, props: any, deps: string[] | undefined) => {
    // 配置 needValue 属性使用原有的
    if (isBoolean(props?.needValue)) {
        return props.needValue;
    } else if (deps && deps.length > 0) {
        // 如果有依赖，则自动加入 needValue
        const arr = _.sortedUniq(deps);
        return arr.includes(key);
    }
    return false;
};
export const filterProps = (type: PageType, obj: any) => {
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

// set numberPlaceholders 协议
const setNumberPlaceholdersReaction = (key: string) => {
    return {
        dependencies: [key, `${key}#visible`],
        fulfill: {
            state: {
                visible: "{{$deps[1]}}"
            }
        }
    }
}
/**
 *
 * @param param0 EmptyNode
 * @returns 返回空节点类型
 */
const getEmptyNodeSchema = ({
    original = null,
    key,
    sequence,
    groupCode,
    labelCol,
    wrapperCol,
    component,
    eventMap,
    empty_columns,
    needChild = false,
    emptyArrayChild,
    componentProps,
    reactConfig,
}: EmptyNode) => {
    const org = original || {
        [key]: {
            type: 'void',
            'x-index': sequence,
            groupCode: groupCode || '',
            'x-visible': componentProps?.hidden !== '1',
            'x-decorator': 'FormItem',
            'x-decorator-props': {
                // @ts-ignore
                labelCol,
                // @ts-ignore
                wrapperCol,
            },
            'x-component': component || '',
            'x-component-props': {
                eventMap,
                ...componentProps,
            },
            'x-reactions': {
                ...(reactConfig && attributes2componentProps(reactConfig)),
            },
        },
    };
    if (needChild) {
        empty_columns?.map((item, index) => {
            if (emptyArrayChild?.includes(item.key)) {
                const {
                    props: { inputValueComponentType, eventMap, attributes, reactConfig },
                } = item;
                org[key].properties = _.merge(
                    org.properties,
                    getEmptyNodeSchema(
                        // 空节点渲染是否需要子节点
                        {
                            key: `${item.key}`,
                            sequence: index,
                            groupCode,
                            component: inputValueComponentType,
                            eventMap,
                            componentProps: attributes,
                            original: org,
                            needChild: false,
                            reactConfig,
                        },
                    ),
                );
            }
        });
        return org;
    }
    return org;
};

const getNormalNodeSchema = (
    field: Field,
    { defaultValue, exProps, sequence, restAttributes, pageType, eventMap, depsArray, editable, config }: any,
) => {
    const {
        key,
        type,
        label,
        props: {
            description = '', // item 描述
            colspanNum = 1,
            groupCode,
            inputValueComponentType = 'Input',
            required = '0',
            hideName,
            reactConfig,
            labelWidth,
            wrapperWidth,
            validates,
            labelCol,
            hidden,
            wrapperCol,
            disabled = '0',
        },
    } = field;
    return {
        [key]: {
            type,
            title: hideName === '1' ? '' : lableName(restAttributes?.repName, label),
            default: defaultValue,
            required: Boolean(+required),
            groupCode,
            ...exProps,
            'x-index': sequence,
            'x-decorator': 'FormItem',
            'x-decorator-props': {
                gridSpan: colspanNum,
                // @ts-ignore
                labelCol: +labelCol >= 0 ? +labelCol : +config?.labelCol,
                // @ts-ignore
                wrapperCol: +wrapperCol || +config?.wrapperCol,
                labelWidth,
                wrapperWidth,
                wrapperWrap: true,
                tooltip: description,
            },
            'x-hidden': Boolean(+hidden),
            'x-component': inputValueComponentType || 'Input',
            'x-component-props': {
                disabled: Boolean(+disabled),
                ...restAttributes,
                // 详情特殊处理
                _value:
                    pageType === 'DETAIL'
                        ? getNeedValue(key, restAttributes, depsArray)
                            ? field.detailValue
                            : ''
                        : '',
                eventMap, // 事件处理map
                // TODO:详情处理
                editable: (pageType as PageType) === 'DETAIL' ? false : editable,
            },
            'x-reactions': {
                ...(reactConfig && attributes2componentProps(reactConfig)),
            },
            'x-validator': {
                ...validates,
            },
        },
    };
};

/**
 * 层级Json转换成平级Json
 * @param reactConfig
 * @returns
 */
const attributes2componentProps = (reactConfig: any) => {
    const attributes: any = reactConfig.fulfill?.schema?.attributes;
    var comType = ['object'];
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

export type initialSchemaType = 'NORMAL' | 'SEARCH' | 'DETAIL';

const checkEmptyGroup = (group: any) => {
    Object.keys(group).map((key) => {
        if (group[key].properties?.layout?.count === 0) {
            printLog(`${key}分组不存在字段内容，已删除`, 'yellow');
            delete group[key];
        }
    });
};

/**
 * 配置新增编辑详情页
 * @param config 配置信息
 * @param needGroup 是否需要分组
 * @returns
 */
export const initialSchemaNoraml = (
    config: PageConfigNew,
    needGroup: boolean = true,
    type: PageType = 'NORMAL',
    eventMap = {},
): MetaSorted => {
    return initialSchema(config, type, needGroup, '', false, eventMap);
};

/**
 * 配置新列表搜索页
 * @param config 配置信息
 * @param cachePath 缓存路径
 * @param needCache 是否需要缓存
 * @returns
 */
export const initialSchemaSearch = (
    config: PageConfigNew,
    cachePath: string = window.location.hash.slice(1),
    needCache: boolean = true,
    eventMap = {},
): MetaSorted => {
    return initialSchema(config, 'SEARCH', false, cachePath, needCache, eventMap);
};

/**
 * @param tableProps props配置信息
 * @param name 设置匹配当前值
 */

const transCol = (tableProps: any, name: string) => {
    let col = {};
    for (let i = 0; i < tableProps.Cols.length, i++;) {
        if (tableProps.Cols[i].dataIndex === name) {
            col = tableProps.Cols[i];
        }
    }
    return col;
};

export const formatForArrayTable = async (
    data: any[],
    schema: any[],
    type = 'NORMAL',
    eventMap?: any,
) => {
    const res = await Promise.all(
        data.map((o) => {
            const { props }: any = o;
            props.attributes.key = o.key;
            props.attributes.type = type || '';
            return initArrayTable(props?.attributes, eventMap);
        }),
    );
    res.forEach((result, index) => {
        const cData = data[index];
        // 添加一个total的空节点
        const key = cData.props?.attributes?.total ? ['total', 'voucherItems'] : [cData.key];
        const groupCode = cData.props.groupCode;
        for (let i = 0; i < key.length; i++) {
            const groupPath = `properties.formLayout.properties.${groupCode}.properties.layout.properties.${key[i]}`;
            const noGroupPathTemp = `properties.formLayout.properties.nog.properties.layout.properties.${key[i]}`;
            const noGroupPath = `properties.formLayout.properties.layout.properties.${key[i]}`;
            let rs = _.get(schema, groupPath);

            if (rs) {
                _.set(schema, groupPath, _.merge(rs, result[key[i]]));

                console.log(_.merge(rs, result[key[i]]), 99)


            } else {
                const noGroup = _.get(schema, noGroupPath);
                const noGroupTemp = _.get(schema, noGroupPathTemp);
                if (noGroup) {
                    _.set(schema, noGroupPath, _.merge(noGroup, result[key[i]]));
                }
                if (noGroupTemp) {
                    _.set(schema, noGroupPathTemp, _.merge(noGroupTemp, result[key[i]]));
                }
                if (key[i] === 'total' && !noGroup) {
                    _.set(schema, groupPath, _.merge(rs, result[key[i]]));
                }
            }
        }
    });
    console.log('schema', schema);

    return schema;
};

export const formatArrayCollap = async (
    data: any[],
    schema: any[],
    type = 'NORMAL',
    eventMap?: any,
) => {
    const res = await Promise.all(
        data.map((o) => {
            const { props }: any = o;
            props.attributes.key = o.key;
            props.attributes.type = type || '';
            props.attributes.inputValueComponentType = props?.inputValueComponentType;

            return initArrayCollap(props.attributes, eventMap);
        }),
    );

    res.forEach((result, index) => {
        const cData = data[index];
        const key = cData.key;
        const groupCode = cData.props.groupCode;

        const groupPath = `properties.formLayout.properties.${groupCode}.properties.layout.properties.${key}`;
        const noGroupPath = `properties.formLayout.properties.layout.properties.${key}`;

        let rs = _.get(schema, groupPath);

        if (rs) {
            _.set(schema, groupPath, _.merge(rs, result.properties[key]));
        } else {
            const noGroup = _.get(schema, noGroupPath);
            if (noGroup) {
                _.set(schema, noGroupPath, _.merge(noGroup, result));
            }
        }
    });

    return schema;
};

const dealButtonsGroup = (buttons: any[], group: any[]) => {
    const newButtons: any[] = [];
    const groupButtons: any = {};
    buttons.forEach((btn) => {
        const gc = btn.props?.groupCode;
        if (gc) {
            if (_.find(group, (o) => o.code)) {
                if (!groupButtons[gc]) {
                    groupButtons[gc] = [];
                }
                // TODO: 按钮属性处理
                groupButtons[gc].push({
                    key: btn.key,
                    label: btn.label,
                    props: {
                        ...btn.props.attributes,
                        sequence: btn.props.sequence,
                        hook: btn.props.hook,
                    },
                });
            } else {
                printLog('按钮分组不存在', 'red');
            }
        } else {
            newButtons.push({ ...btn });
        }
    });
    return {
        newButtons,
        groupButtons,
    };
};
