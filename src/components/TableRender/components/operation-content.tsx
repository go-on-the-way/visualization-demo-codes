import { Popover, Space } from "antd";
import { MenuOutlined } from "@ant-design/icons";

export interface OpContentProps {
    left: React.Component[];
    hide: React.Component[];
}

const OpContent: React.FC<OpContentProps> = ({ left, hide }) => {
    const ct: any = <div className="btns__opover__btn"><Space>{hide}</Space></div>;
    return <>
        {left} <Popover className="btns__opover" placement="right" content={ct} trigger="hover" >
            <span className="more">
                <MenuOutlined />
            </span>
        </Popover>
    </>;
}

export default OpContent;
