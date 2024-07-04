import { Menu } from 'antd';
import { NavLink } from 'umi';
import { MailOutlined, GitlabOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

export const MySider = ()=>{
    const handleClick = ()=>{

    }

    return <Menu
            onClick={handleClick}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
        >
        <SubMenu
            key="sub1"
            title={
                <span>
                    <MailOutlined/>
                    <span>集成组件</span>
                </span>
            }
        >
            <Menu.ItemGroup key="g1" title="工具">
                <Menu.Item key="1">
                    <NavLink to="/home/editor">编辑器</NavLink>
                </Menu.Item>
                <Menu.Item key="2">
                    <NavLink to="/home/handsontable">handsontable</NavLink>
                </Menu.Item>
                <Menu.Item key="3">
                    <NavLink to="/home/monaco-editor">monaco-editor</NavLink>
                </Menu.Item>
                <Menu.Item key="4">
                    <NavLink to="/home/media-preview">media-preview</NavLink>
                </Menu.Item>
                <Menu.Item key="5">
                    <NavLink to="/home/fr-generator">fr-generator</NavLink>
                </Menu.Item>
                <Menu.Item key="6">
                    <NavLink to="/home/scheduler">scheduler</NavLink>
                </Menu.Item>
                <Menu.Item key="7">
                    <NavLink to="/home/three">three</NavLink>
                </Menu.Item>
                <Menu.Item key="8">
                    <NavLink to="/home/imove">imove</NavLink>
                </Menu.Item>
                <Menu.Item key="9">
                    <NavLink to="/home/org-chart">组织架构图demo</NavLink>
                </Menu.Item>
            </Menu.ItemGroup>
        </SubMenu>
    </Menu>
}