import { useEffect, useState } from "react";
import { createSchemaFormRender } from "@/utils/schema-form-render/createSchemaFormRender";

/**
 * 高阶列表页面，列表按钮事件注册
 * @param target context
 * @param events 注册事件对象
 * @param params 注册事件执行参数
 */
export const registerListTableEvent = (
    target: any,
    events: any,
    params: any
) => {
    const { setLoading = () => { }, match } = params;
    Object.keys(events).forEach((hookName) => {
        let old: any = null;
        if (target[hookName]) {
            old = target[hookName];
        }
        target[hookName] = async (id: string, row: any, index: number) => {
            if (events && events[hookName]) {
                setLoading(true);
                params.searchCache = {};// 无缓存
                const res: any = await events[hookName](id, row, params, index);
                if (res?.success) {
                    params.callback && params.callback(true);
                    setLoading(false);
                }
                old && old(id, row);
                setLoading(false);
            }
        };
    });
};

/**
 * 高阶列表页面，普通按钮注册
 * @param target context
 * @param events 注册事件对象
 * @param params 注册事件执行参数
 */
export const registerListButtonEvent = (
    target: any,
    events: any,
    params: any
) => {
    const { setLoading = () => { }, match } = params;
    Object.keys(events).forEach((hookName) => {
        let old: any = null;
        if (target[hookName]) {
            old = target[hookName];
        }
        target[hookName] = async () => {
            if (events && events[hookName]) {
                setLoading(true);
                params.searchCache = {};// 无缓存
                const res: any = await events[hookName](params);
                console.log("res", res);
                setLoading(false);
                if (res?.success) {
                }
                old && old();
            }
        };
    });
};

/**
 *  已简化
 * @param filedConfig 字段配置
 * @param formConfigs form 配置
 * @returns
 */
export const useScemaRender = (
    fieldConfig: any,
    formConfig: any
) => {
    const [renderInfo, setRenderInfo] = useState<any>({
        form: null,
        Render: null,
    });
    useEffect(() => {
        const formRender = createSchemaFormRender(fieldConfig, formConfig);
        setRenderInfo(formRender);

        const { form, Render } = formRender;
        console.log('这里可以拿到实例化的表单',form)
        console.log('这里可以拿到表单渲染组件',Render)

    }, [fieldConfig, formConfig]);
    return {
        form: renderInfo.form,
        SchemaFormRender: renderInfo.Render,
    };
};