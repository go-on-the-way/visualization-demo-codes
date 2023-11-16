import { Button, Modal } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import Keyevent from "@/utils/keyevent/index";

interface ExtBtnProps extends ButtonProps {
    hook?: (val1?: any, val2?: any, val3?: any) => void; // 回调
    name?: string; // 显示名称
    icon: string; // icon类型
    style?: any; //
}

const btnConfirm = (key: any, func: any) => {
    if ('tijiao' === key) {
        return () => {
            Modal.confirm({
                title: '提示',
                content: '是否确认提交?',
                onOk: func,
                okText: '提交',
                cancelText: '取消'
            })
        }
    } else {
        return func;
    }
}

/**
 * 元模型用按钮
 * @param props
 * @constructor
 */
const ExtBtn = (props: ExtBtnProps) => {
    const { name, loading, icon, style, id } = props;
    const hotKeys: any = JSON.parse(localStorage.getItem("HOT_KEYS") || "[]");
    const hotItem: any = hotKeys?.filter((h: any) => h.button === icon).shift();
    return (
        <Keyevent
            style={{ display: 'inline-block' }}
            events={hotItem ? {
                [`on${hotItem?.key?.replaceAll('+', '')}`]: btnConfirm(icon, props.onClick)
            } : {}}
        >
            <Button id={icon} style={style} type={props.type} onClick={btnConfirm(icon, props.onClick)} loading={loading}>
                {name || ''}
            </Button>
        </Keyevent>
    );
};

export {
    ExtBtn
}