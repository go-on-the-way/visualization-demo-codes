import { useEffect, useState } from "react";
import { Popconfirm } from "antd";
import { initialSchema } from "@/utils/schema-form-render";
import { registerListTableEvent, registerListButtonEvent } from "@/utils/schema-form-render/utils";
import { getButtons } from "@/utils/schema-form-render/with-btns";
import OpContent from "@/components/TableRender/components/operation-content";

export function useEventsRegister(hooks: any, events: any, params: any) {
    const { loading, searchButtons, buttons, tableButtons, validator } = params;
    useEffect(() => {
        if (!events) return;
        if (events?.tableButtonsEvents) {
            registerListTableEvent(
                hooks?.current?.tableButtonsEvents,
                events?.tableButtonsEvents,
                params
            );
        }
        if (events?.buttonsEvents) {
            registerListButtonEvent(
                hooks?.current?.buttonsEvents,
                events?.buttonsEvents,
                params
            );
        }
    }, []);

    // 生成搜索按钮
    const getSearchButtons = () =>
        getButtons(
            { loading, buttons: searchButtons },
            hooks.current.buttonsEvents
        );

    // 生成新增按钮
    const getTableTopButton = () =>
        getButtons(
            { loading, buttons: buttons },
            hooks.current.buttonsEvents,
            validator
        );

    // 列表行项目操作按钮
    // @ts-ignore
    const operations = (
        id: string,
        row: any,
        extraPropsForOp: any,
        idx: number
    ) => {
        const res: any = [];
        tableButtons?.map((o: any, index: any) => {
            if (validator?.checkColBtns && !validator.checkColBtns(o.key, row)) {
            } else {
                if (
                    ["shanchu", "qiyong", "jinyong", "chongzhi", "chehui"].includes(o.key)
                ) {
                    res.push(
                        <Popconfirm
                            title={"是否确认？"}
                            onConfirm={() => {
                                hooks.current.tableButtonsEvents[o?.props?.hook](id, row, idx);
                            }}
                        >
                            {o.label}
                        </Popconfirm>
                    );
                } else {
                    res.push(
                        <span onClick={() => {
                            hooks.current.tableButtonsEvents[o?.props?.hook](id, row, idx);
                        }}>
                            <span className="text">{o.label}</span>
                        </span>
                    );
                }
            }
        });
        if (res.length > 3) {
            const head = res.slice(0, 2);
            const rest = res.slice(2);
            return [<OpContent left={head} hide={rest} />];
        } else {
            return res;
        }
    };

    return {
        getSearchButtons,
        getTableTopButton,
        operations,
    };
}

export function useInitData(
    metasConfig: any,
    remoteMetasConfig: any,
    type: "NORMAL" | "SEARCH" | "DETAIL" = "SEARCH",
    needGroup: boolean = false,
    eventMap?: any
) {
    const [schemaConfig, setSchemaConfig] = useState<any>({});
    useEffect(() => {
        if (metasConfig?.code || remoteMetasConfig?.code) {
            const initData: any = initialSchema(
                metasConfig?.code ? metasConfig : remoteMetasConfig,
                type,
                needGroup,
                "",
                false,
                eventMap
            );
            console.log('到这里已经初始化了Schema');
            console.log(initData)
            setSchemaConfig(initData);
        }
        return () => { }
    }, [metasConfig?.code, remoteMetasConfig?.code]);
    return schemaConfig;
}