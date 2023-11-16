import { ExtBtn } from '@/components/ExtBtn';
// 按钮
export const getButtons = (data: any, context: any, validator: any = null) => {
    const { loading, buttons, buttonsProps = {} }: any = data;
    const btns = buttons?.filter((o: any) => false !== o?.props?.visible);
    const res: any = [];
    btns?.forEach((o: any, index: any) => {
        const { props } = o;
        if (validator?.checkNormalBtns && !validator.checkNormalBtns(o.key, o)) {
        } else {
            res.push(
                <ExtBtn
                    key={o.iconType ? `${o.key}${o.iconType}` : o.key}
                    style={{
                        marginLeft: index !== 0 ? 10 : 0,
                    }}
                    loading={loading}
                    onClick={() => {
                        const hook = props?.hook;
                        if (typeof props?.hook == "function") {
                            props?.hook()
                            return
                        }
                        if (hook && context[hook]) {
                            context[hook]();
                        } else {
                            try {
                                throw new Error(`${o.key}按钮没有定义 hook[${hook}]`);
                            } catch (err) {
                                console.error(err);
                            }
                        }
                    }}
                    type="primary"
                    icon={o.key}
                    name={o.label}
                    {...buttonsProps}
                />
            )
        }

    });
    return res;
};
