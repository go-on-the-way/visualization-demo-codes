export const searchTableConfig = [
    {
        "tableId": "",
        "label": "erp组织",
        "type": "search_column",
        "uuid": "",
        "key": "erpCom",
        "props": {
            "sequence": 10,
            "attributes": {},
            "inputValueComponentType": "SELECT_TABLE"
        }
    },
    {
        "tableId": "",
        "label": "查询",
        "type": "search_button",
        "uuid": "",
        "key": "chaxun",
        "props": {
            "sequence": 50,
            "hook": "handleSearchClick"
        }
    },
    {
        "tableId": "",
        "label": "erp组织",
        "type": "table_column",
        "uuid": "",
        "key": "erpCom",
        "props": {
            "sequence": 60,
            "columnRenderType": "DICT_TYPE"
        }
    },
    {
        "tableId": "",
        "label": "erp部门",
        "type": "table_column",
        "uuid": "",
        "key": "erpDept",
        "props": {
            "sequence": 70,
            "columnRenderType": "DICT_TYPE"
        }
    },
    {
        "tableId": "",
        "label": "编辑",
        "type": "table_button",
        "uuid": "",
        "key": "bianji",
        "props": {
            "sequence": 130,
            "hook": "handleEditClick"
        }
    },
    {
        "tableId": "",
        "label": "删除",
        "type": "table_button",
        "uuid": "",
        "key": "shanchu",
        "props": {
            "sequence": 140,
            "hook": "handleDeleteClick"
        }
    },
    {
        "tableId": "",
        "label": "新增",
        "type": "button",
        "uuid": "",
        "key": "xinzeng",
        "props": {
            "sequence": 150,
            "hook": "handleCreateBtnClick"
        }
    }
]