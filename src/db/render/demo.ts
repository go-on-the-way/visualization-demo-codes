export default {
    "result": {
        "code": "CheckPool_L",
        "wrapperCol": 18,
        "updateUserName": "admin",
        "updateUser": "admin",
        "updateTime": "2023-10-25 16:12:18",
        "createUserName": "anonymousUser",
        "version": 1,
        "pageCode": "CheckPool_L",
        "eventMap": {},
        "pageType": "PC",
        "pageDatas": [
            {
                "tableId": "dcacc6d8-baa3-40ed-bad8-aefe9b73c8e3",
                "label": "支票号",
                "type": "table_column",
                "uuid": "table_columndc830ecb-efd3-4bdd-8cfd-9a9ad445e2c9",
                "key": "bizCode",
                "props": {
                    "sequence": 10
                }
            },
            {
                "tableId": "c45d3354-a7a7-4a3f-ad55-c7af4d9edd1b",
                "label": "支票金额",
                "type": "table_column",
                "uuid": "table_columnc499a67c-807f-42b2-86e0-ef8b5048f5e5",
                "key": "tranAmt",
                "props": {
                    "sequence": 20
                }
            },
            {
                "tableId": "9129b8a9-48dd-48ea-a2bf-2c40341ea85a",
                "label": "业务类别",
                "type": "table_column",
                "uuid": "table_columna72a75c3-47cb-490e-85ef-1b31f689afa8",
                "key": "bizType",
                "props": {
                    "sequence": 30,
                    "columnRenderType": "DICT_TYPE",
                    "attributes": {
                        "api": {
                            "params": {
                                "code": "BIZ_TYPE"
                            }
                        }
                    },
                    "attributes#api#params#code": "BIZ_TYPE"
                }
            },
            {
                "tableId": "e2aa3e13-659b-4949-a5f6-eda0a191a204",
                "label": "认领平台",
                "type": "table_column",
                "uuid": "table_column6af883cb-d9b8-4707-a439-11e0ec6ad8ce",
                "key": "claimSys",
                "props": {
                    "sequence": 40,
                    "columnRenderType": "DICT_TYPE",
                    "attributes": {
                        "api": {
                            "params": {
                                "code": "ClaimSys"
                            }
                        }
                    },
                    "attributes#api#params#code": "ClaimSys"
                }
            },
            {
                "tableId": "f25b40c9-9202-4ec9-931a-bee89919470f",
                "label": "币种",
                "type": "table_column",
                "uuid": "table_columnd2475a54-053d-41de-8f68-8b2efb9e4cae",
                "key": "tranCrncy",
                "props": {
                    "sequence": 50,
                    "columnRenderType": "DICT_TYPE"
                }
            },
            {
                "tableId": "6a836474-399a-4402-9f13-b07afcdf25eb",
                "label": "认领状态",
                "type": "table_column",
                "uuid": "table_column404f8e39-94a1-4cf8-8846-d04ff1cd4dfa",
                "key": "claimStatus",
                "props": {
                    "sequence": 60,
                    "columnRenderType": "DICT_TYPE",
                    "attributes": {
                        "api": {
                            "params": {
                                "code": "CLAIM_STATUS"
                            }
                        }
                    },
                    "attributes#api#params#code": "CLAIM_STATUS"
                }
            },
            {
                "tableId": "7fb1dabe-c081-4dd2-8a49-0992e99ded47",
                "label": "出票日期",
                "type": "table_column",
                "uuid": "table_column3aa7ea95-5dc9-4c8a-8ef5-22e414f4a575",
                "key": "issueDate",
                "props": {
                    "sequence": 70
                }
            },
            {
                "tableId": "4c924c6c-6c45-440e-8889-24f51b77dc1e",
                "label": "管理公司",
                "type": "table_column",
                "uuid": "table_columne0c3c472-0c64-4201-80ef-535f6dbaf8d8",
                "key": "manageOrgName",
                "props": {
                    "sequence": 80
                }
            },
            {
                "tableId": "1acae690-7a32-4642-8799-d32a948345b3",
                "label": "记账单位",
                "type": "table_column",
                "uuid": "table_columne70db301-9693-47c3-ab01-9d8eeb311cc5",
                "key": "acctOrgName",
                "props": {
                    "sequence": 90
                }
            },
            {
                "tableId": "c567d11c-cf7d-45e0-92e6-b94a6483749e",
                "label": "货款参考标识",
                "type": "table_column",
                "uuid": "table_column2706c321-9cc0-4f6c-89e3-2931dbeb1910",
                "key": "goodsPymtFlag",
                "props": {
                    "sequence": 100,
                    "columnRenderType": "DICT_TYPE",
                    "attributes": {
                        "numberPlaceholders": 0,
                        "colName": "goodsPymtFlagName",
                        "columnRenderType": true,
                        "needValue": true,
                        "deps": [],
                        "api": {
                            "params": {
                                "code": "YES_OR_NO"
                            }
                        },
                        "targetKey": [],
                        "targetKeyMap": {}
                    },
                    "inputValueComponentType": "DISPLAY_DETAIL_VALUE",
                    "attributes#api#params#code": "YES_OR_NO",
                    "formalAttributes": "{\n    \"numberPlaceholders\": 0,\n    \"targetKey\": [],\n    \"targetKeyMap\": {},\n    \"columnRenderType\": true,\n    \"needValue\": true,\n    \"deps\": [],\n    \"colName\":\"goodsPymtFlagName\"\n}"
                }
            },
            {
                "tableId": "2946be72-c3ab-46e7-ae5b-fcc8781cb789",
                "label": "支票类型",
                "type": "table_column",
                "uuid": "table_column439a29da-8654-4cc6-a246-f9dd2415903f",
                "key": "checkType",
                "props": {
                    "sequence": 110,
                    "columnRenderType": "DICT_TYPE",
                    "attributes": {
                        "api": {
                            "params": {
                                "code": "TRSR_CHECK_TYPE"
                            }
                        }
                    },
                    "attributes#api#params#code": "TRSR_CHECK_TYPE"
                }
            },
            {
                "tableId": "9162beab-7a8c-4104-8ee0-2f7f8da24cc2",
                "label": "支票唯一号",
                "type": "table_column",
                "uuid": "table_column623fde2f-f4d6-4e82-bc9d-4ec5f9f76245",
                "key": "code",
                "props": {
                    "sequence": 120,
                    "hidden": "1"
                }
            },
            {
                "tableId": "88626c98-6df1-4167-95f8-73d7641fd792",
                "label": "支票号",
                "type": "search_column",
                "uuid": "search_column75fbe977-1664-49ac-8968-e39f6ffa3ebf",
                "key": "bizCode",
                "props": {
                    "sequence": 130
                }
            },
            {
                "tableId": "7f5bb9b3-3fcd-4f15-802a-95c768a4a4e0",
                "label": "记账单位",
                "type": "search_column",
                "uuid": "search_column506c741c-27f5-4c07-9c99-31c3822a9455",
                "key": "acctOrg",
                "props": {
                    "sequence": 140,
                    "attributes": {
                        "numberPlaceholders": 0,
                        "changeKey": "code",
                        "keywordKey": "value",
                        "columnRenderType": true,
                        "valueTemplateKey": "code",
                        "needValue": false,
                        "deps": [],
                        "labelTemplateKey": "name",
                        "targetKey": [],
                        "targetKeyMap": {}
                    },
                    "inputValueComponentType": "Input",
                    "formalAttributes": "{\n    \"numberPlaceholders\": 0,\n    \"targetKey\": [],\n    \"targetKeyMap\": {},\n    \"columnRenderType\": true,\n    \"needValue\": false,\n    \"deps\": [],\n    \"changeKey\": \"code\",\n    \"keywordKey\": \"value\",\n    \"valueTemplateKey\": \"code\",\n    \"labelTemplateKey\": \"name\",\n    \"columns\": [\n        {\n            \"title\": \"名称\",\n            \"dataIndex\": \"name\",\n            \"width\": \"200\"\n        },\n        {\n            \"title\": \"编码\",\n            \"dataIndex\": \"code\",\n            \"width\": \"200\"\n        }\n    ],\n    \"api\": {\n        \"method\": \"post\",\n        \"url\": \"/asm/mdm/sapCompany/page\",\n        \"params\": {}\n    }\n}"
                }
            },
            {
                "tableId": "11e27f84-19d7-47de-81e9-7e61eb093483",
                "label": "业务类别",
                "type": "search_column",
                "uuid": "search_columnaa63384b-d530-4055-a7d1-12bd24e51837",
                "key": "bizType",
                "props": {
                    "sequence": 150,
                    "attributes": {
                        "numberPlaceholders": 0,
                        "remoteDataPath": [],
                        "columnRenderType": true,
                        "valueTemplateKey": "code",
                        "needValue": false,
                        "deps": [],
                        "labelTemplateKey": "name",
                        "targetKey": [],
                        "targetKeyMap": {}
                    },
                    "inputValueComponentType": "Input",
                    "formalAttributes": "{\n    \"numberPlaceholders\": 0,\n    \"targetKey\": [],\n    \"targetKeyMap\": {},\n    \"columnRenderType\": true,\n    \"needValue\": false,\n    \"deps\": [],\n    \"valueTemplateKey\": \"code\",\n    \"labelTemplateKey\": \"name\",\n    \"remoteDataPath\": [],\n    \"api\": {\n        \"type\": \"get\",\n        \"url\": \"/sym/dict/findValues\",\n        \"params\": {\n            \"code\": \"BIZ_TYPE\"\n        }\n    }\n}"
                }
            },
            {
                "tableId": "22c41ed3-a94d-43e2-b6a3-d45529114456",
                "label": "支票金额",
                "type": "search_column",
                "uuid": "search_columnedd69eb9-ecf1-41a2-8238-796119bcb16e",
                "key": "tranAmt",
                "props": {
                    "sequence": 160,
                    "attributes": {
                        "numberPlaceholders": 0,
                        "columnRenderType": true,
                        "needValue": false,
                        "deps": [],
                        "targetKey": [],
                        "targetKeyMap": {}
                    },
                    "inputValueComponentType": "Input",
                    "formalAttributes": "{\"numberPlaceholders\":0,\"targetKey\":[],\"targetKeyMap\":{},\"columnRenderType\":true,\"needValue\":false,\"deps\":[],\"ranges\":[{},{}]}"
                }
            },
            {
                "tableId": "0ae24164-e139-4623-9cc2-70e74351edd8",
                "label": "认领平台",
                "type": "search_column",
                "uuid": "search_column80caa594-a930-4719-a74c-6434fd0dcaa7",
                "key": "claimSys",
                "props": {
                    "sequence": 170,
                    "attributes": {
                        "numberPlaceholders": 0,
                        "remoteDataPath": [],
                        "columnRenderType": true,
                        "valueTemplateKey": "code",
                        "needValue": false,
                        "deps": [],
                        "labelTemplateKey": "name",
                        "targetKey": [],
                        "targetKeyMap": {}
                    },
                    "inputValueComponentType": "Input",
                    "formalAttributes": "{\n    \"numberPlaceholders\": 0,\n    \"targetKey\": [],\n    \"targetKeyMap\": {},\n    \"columnRenderType\": true,\n    \"needValue\": false,\n    \"deps\": [],\n    \"valueTemplateKey\": \"code\",\n    \"labelTemplateKey\": \"name\",\n    \"remoteDataPath\": [],\n    \"api\": {\n        \"type\": \"get\",\n        \"url\": \"/sym/dict/findValues\",\n        \"params\": {\n            \"code\": \"ClaimSys\"\n        }\n    }\n}"
                }
            },
            {
                "tableId": "ad5233d8-2013-4c43-b5fc-648c582e4394",
                "label": "认领状态",
                "type": "search_column",
                "uuid": "search_column5ca9f4af-f901-496c-a748-482ae0f084f9",
                "key": "claimStatus",
                "props": {
                    "sequence": 180,
                    "attributes": {
                        "numberPlaceholders": 0,
                        "remoteDataPath": [],
                        "columnRenderType": true,
                        "defaultValue": "UnClaimed",
                        "valueTemplateKey": "code",
                        "needValue": false,
                        "deps": [],
                        "labelTemplateKey": "name",
                        "targetKey": [],
                        "targetKeyMap": {}
                    },
                    "inputValueComponentType": "Input",
                    "formalAttributes": "{\n    \"numberPlaceholders\": 0,\n    \"targetKey\": [],\n    \"targetKeyMap\": {},\n    \"columnRenderType\": true,\n    \"needValue\": false,\n    \"deps\": [],\n    \"valueTemplateKey\": \"code\",\n    \"labelTemplateKey\": \"name\",\n    \"remoteDataPath\": [],\n    \"defaultValue\":\"UnClaimed\",\n    \"api\": {\n        \"type\": \"get\",\n        \"url\": \"/sym/dict/findValues\",\n        \"params\": {\n            \"code\": \"CLAIM_STATUS\"\n        }\n    }\n}"
                }
            },
            {
                "tableId": "074f5c3d-f8cd-4e21-9981-a69a7f5e051a",
                "label": "查询",
                "type": "search_button",
                "uuid": "search_buttonf072112e-dadc-426c-ac56-395a9be7b3d4",
                "key": "chaxun",
                "props": {
                    "sequence": 190,
                    "hook": "handleSearchClick",
                    "icon": "icon-chaxun"
                }
            },
            {
                "tableId": "a8af1628-e618-4105-8c26-26e5fb42dadc",
                "label": "详情",
                "type": "table_button",
                "uuid": "table_buttonbb345d30-3814-4910-8e0a-705ec1c0e985",
                "key": "chakan",
                "props": {
                    "sequence": 200,
                    "hook": "handleViewClick",
                    "icon": "icon-chakan"
                }
            },
            {
                "tableId": "c661dcf2-e87d-46c4-bce2-13274c84cff4",
                "label": "认领",
                "type": "table_button",
                "uuid": "table_button52271090-2e60-4c95-a511-e7667bc15f25",
                "key": "renling",
                "props": {
                    "sequence": 210,
                    "hook": "handleClaim",
                    "icon": "icon-renling"
                }
            },
            {
                "tableId": "917fe60a-93ac-4930-9f76-5069f3d1ccd6",
                "label": "关联单据",
                "type": "table_button",
                "uuid": "table_button5991a2a9-c6fb-4f5d-a70b-e8314d69ec4d",
                "key": "guanliandanju",
                "props": {
                    "sequence": 220,
                    "hook": "handleRelated",
                    "icon": "icon-guanliandanju"
                }
            },
            {
                "tableId": "a30673e9-e31f-41a0-a761-85a4998fc3b8",
                "label": "分配",
                "type": "button",
                "uuid": "buttonea660e04-ebd1-4db7-8276-d5642bfe5810",
                "key": "gangwei",
                "props": {
                    "sequence": 230,
                    "hook": "handleAllocation",
                    "icon": "icon-gangwei"
                }
            },
            {
                "tableId": "7fec33bf-49ac-43a5-9f33-016c7de73373",
                "label": "撤回",
                "type": "button",
                "uuid": "button0a257465-b096-491f-94f1-a193dfcc9550",
                "key": "fanhui",
                "props": {
                    "sequence": 240,
                    "hook": "handleWithdraw",
                    "icon": "icon-fanhui"
                }
            },
            {
                "tableId": "5b5c0d10-791e-46d8-8369-32e1063fc612",
                "label": "关闭",
                "type": "button",
                "uuid": "button1fca1a8f-4e29-4b72-943c-227b1e178627",
                "key": "jinyong",
                "props": {
                    "sequence": 250,
                    "hook": "handleClose",
                    "icon": "icon-jinyong"
                }
            },
            {
                "tableId": "2cf53fe4-1d91-42a7-983d-ccaf2ec4320c",
                "label": "取消关闭",
                "type": "button",
                "uuid": "buttone0198fd8-450d-4fa0-a916-5e666590d7aa",
                "key": "qiyong",
                "props": {
                    "sequence": 260,
                    "hook": "handleUndoClose",
                    "icon": "icon-qiyong"
                }
            }
        ],
        "createTime": "2023-10-16 19:54:02",
        "modelCode": "CheckPool",
        "name": [
            {
                "lngType": "en_US",
                "name": "CheckPool"
            },
            {
                "lngType": "zh_CN",
                "name": "应收支票池"
            }
        ],
        "createUser": "anonymousUser",
        "id": "652d245a5414bf66d3ad268a",
        "labelCol": 6,
        "group": [],
        "timestamp": 1698221538133
    },
    "message": null,
    "success": true,
    "code": null,
    "stack": null
}