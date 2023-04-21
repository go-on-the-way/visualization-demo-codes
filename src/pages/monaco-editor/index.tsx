import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
const val = `
    {
        "numberPlaceholders": 0,
        "targetKey": [],
        "targetKeyMap": {},
        "columnRenderType": true,
        "needValue": false,
        "deps": [],
        "pagination": false,
        "size": "small",
        "pageCode": "",
        "rowsRender": "",
        "loading": "",
        "rowKey": "",
        "serial": false,
        "total": false,
        "dataSource": [],
        "type": "NORMAL",
        "form": true,
        "wrapComponent": "TRAVEL_RBRS_TABLE",
        "selection": true
    }
`
const handleEditorChange = (value:any, event:any)=>{
    console.log("here is the current model value:", value);
}
const MonacoEditor = ()=>{
    return (
        <Editor
            height="90vh"
            defaultLanguage="json"
            defaultValue={val}
            theme="vs-dark"
            onChange={handleEditorChange}
        />
    )
}

export default MonacoEditor