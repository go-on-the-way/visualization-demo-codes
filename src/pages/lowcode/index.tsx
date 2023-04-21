import React, { useRef, useEffect, useMemo } from 'react';
import {
    Designer, //设计器根组件，主要用于下发上下文
    DesignerToolsWidget, //画板工具挂件
    ViewToolsWidget, //视图切换工具挂件
    Workspace, //工作区组件，核心组件，用于管理工作区内的拖拽行为，树节点数据等等...
    OutlineTreeWidget, //大纲树组件，它会自动识别当前工作区，展示出工作区内树节点
    ResourceWidget, //拖拽源挂件
    HistoryWidget, //历史记录挂件
    StudioPanel, //主布局面板
    CompositePanel, //左侧组合布局面板
    WorkspacePanel, //工作区布局面板
    ToolbarPanel, //工具栏布局面板
    ViewportPanel, //视口布局面板
    ViewPanel, //视图布局面板
    SettingsPanel, //右侧配置表单布局面板
    ComponentTreeWidget, //组件树渲染器
} from '@designable/react'
import {
    SettingsForm,
    setNpmCDNRegistry,
} from '@designable/react-settings-form'
import {
    createDesigner,
    GlobalRegistry,
    Shortcut,
    KeyCode,
} from '@designable/core'
import {
    LogoWidget,
    ActionsWidget,
    PreviewWidget,
    SchemaEditorWidget,
    MarkupSchemaWidget,
} from './widgets'
import { saveSchema } from './service'
import {
    Form,
    Field,
    Input,
    Select,
    TreeSelect,
    Cascader,
    Radio,
    Checkbox,
    Slider,
    Rate,
    NumberPicker,
    Transfer,
    Password,
    DatePicker,
    TimePicker,
    Upload,
    Switch,
    Text,
    Card,
    ArrayCards,
    ObjectContainer,
    ArrayTable,
    Space,
    FormTab,
    FormCollapse,
    FormLayout,
    FormGrid,
} from './designable'
setNpmCDNRegistry('//unpkg.com')

GlobalRegistry.registerDesignerLocales({
    'zh-CN': {
        sources: {
            Inputs: '输入控件',
            Layouts: '布局组件',
            Arrays: '自增组件',
            Displays: '展示组件',
        },
    },
    'en-US': {
        sources: {
            Inputs: 'Inputs',
            Layouts: 'Layouts',
            Arrays: 'Arrays',
            Displays: 'Displays',
        },
    },
    'ko-KR': {
        sources: {
            Inputs: '입력',
            Layouts: '레이아웃',
            Arrays: '배열',
            Displays: '디스플레이',
        },
    },
})

const inputSources = [
    Input,
    Password,
    NumberPicker,
    Rate,
    Slider,
    Select,
    TreeSelect,
    Cascader,
    Transfer,
    Checkbox,
    Radio,
    DatePicker,
    TimePicker,
    Upload,
    Switch,
    ObjectContainer,
]

const layoutsSources = [
    Card,
    FormGrid,
    FormTab,
    FormLayout,
    FormCollapse,
    Space,
]

const components = {
    Form,
    Field,
    Input,
    Select,
    TreeSelect,
    Cascader,
    Radio,
    Checkbox,
    Slider,
    Rate,
    NumberPicker,
    Transfer,
    Password,
    DatePicker,
    TimePicker,
    Upload,
    Switch,
    Text,
    Card,
    ArrayCards,
    ArrayTable,
    Space,
    FormTab,
    FormCollapse,
    FormGrid,
    FormLayout,
    ObjectContainer,
}

const Lowcode = () => {

    const engine = useMemo(
        () =>
            createDesigner({
                shortcuts: [
                    new Shortcut({
                        codes: [
                            [KeyCode.Meta, KeyCode.S],
                            [KeyCode.Control, KeyCode.S],
                        ],
                        handler(ctx) {
                            saveSchema(ctx.engine)
                        },
                    }),
                ],
                rootComponentName: 'Form',
            }),
        []
    )
    return (
        <Designer engine={engine}>
            <StudioPanel logo={<LogoWidget />} actions={<ActionsWidget />}>
                <CompositePanel>
                    <CompositePanel.Item title="panels.Component" icon="Component">
                        <ResourceWidget
                            title="sources.Inputs"
                            sources={inputSources}
                        />
                        <ResourceWidget
                            title="sources.Layouts"
                            sources={layoutsSources}
                        />
                        <ResourceWidget
                            title="sources.Arrays"
                            sources={[ArrayCards, ArrayTable]}
                        />
                        <ResourceWidget title="sources.Displays" sources={[Text]} />
                    </CompositePanel.Item>
                    <CompositePanel.Item title="panels.OutlinedTree" icon="Outline">
                        <OutlineTreeWidget />
                    </CompositePanel.Item>
                    <CompositePanel.Item title="panels.History" icon="History">
                        <HistoryWidget />
                    </CompositePanel.Item>
                </CompositePanel>
                <Workspace id="form">
                    <WorkspacePanel>
                        <ToolbarPanel>
                            <DesignerToolsWidget />
                            <ViewToolsWidget
                                use={['DESIGNABLE', 'JSONTREE', 'MARKUP', 'PREVIEW']}
                            />
                        </ToolbarPanel>
                        <ViewportPanel style={{ height: '100%' }}>
                            <ViewPanel type="DESIGNABLE">
                                {() => (
                                    <ComponentTreeWidget
                                        components={components}
                                    />
                                )}
                            </ViewPanel>
                            <ViewPanel type="JSONTREE" scrollable={false}>
                                {(tree, onChange) => (
                                    <SchemaEditorWidget tree={tree} onChange={onChange} />
                                )}
                            </ViewPanel>
                            <ViewPanel type="MARKUP" scrollable={false}>
                                {(tree) => <MarkupSchemaWidget tree={tree} />}
                            </ViewPanel>
                            <ViewPanel type="PREVIEW">
                                {(tree) => <PreviewWidget tree={tree} />}
                            </ViewPanel>
                        </ViewportPanel>
                    </WorkspacePanel>
                </Workspace>
                <SettingsPanel title="panels.PropertySettings">
                    <SettingsForm uploadAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" />
                </SettingsPanel>
            </StudioPanel>
        </Designer>
    )
}

export default Lowcode