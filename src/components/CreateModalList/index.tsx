import React, { useEffect, useState } from "react";
import TableRender from "@/components/TableRender";
import _ from "lodash";
import { useEventsRegister, useInitData } from "./use-events";
import { PageConfig } from "@/utils/schema-form-render/meta";
import { SchemaFormSearchContent } from "./schema-form-content";
import { useScemaRender } from "@/utils/schema-form-render/utils";
import { CreateModalListHoc } from "hoc-form";
import Data from '@/db/render/demo'
const pageDataResult:any = Data;

export const CreateModalList: CreateModalListHoc = (fcProps) => (props) => {
  const formRef = React.useRef<any>();
  const dataRef = React.useRef<any>([]);
  // 1、合并参数：fcProps初始化参数；props组件参数；
  const {
    metasConfig,
    noModal = true,
    events,
    pageCode,
    rowSelection = null,
    rowKey,
    noTableOpCol = false,
    modalCode = "",
    match,
    history,
    extraPrams,
    filedConfig,
    formConfigs,
    operWidth,
    editable = false,
    editableIdKey,
    editableColsMap,
    onEditableRowSave,
    nested = false,
    nestedTableColumns = [],
    nestedTableDataKey = "",
    rowsRender,
    reloadFlag,
    validator,
    resetColumns,
  } = _.merge(fcProps, props);

  // 2、声明页面配置变量
  const [remoteMetasConfig, setRemoteMetasConfig] = useState<PageConfig>({
    labelAlign: "right",
    layout: 3,
    pageDatas: [],
  });

  // 3、初始化表单
  const { form, SchemaFormRender } = useScemaRender(filedConfig, formConfigs);
  formRef.current = form;

  const [loading, setLoading] = useState(false);
  const [tData, setData] = useState<any>([]);

  useEffect(() => {
    dataRef.current = tData;
  }, [tData]);

  // 表格多选单选
  const [selectedRowKeys, setselectedRowKeys] = useState<string[]>([]);
  const [selectedRows, setselectedRows] = useState<any[]>([]);
  const hookMapIns = React.useRef({
    tableButtonsEvents: {
      handleViewClick: (id: string, row: any) => {
        console.log("详情")
      }
    },
    buttonsEvents: {
      // 重置
      reset: () => {
        console.log("重置")
      },
      // 搜索按钮点击事件
      handleSearchClick: () => {
        console.log("搜索")
      },
    },
  });

  const {
    schema,
    searchButtons,
    tableColumns,
    buttons,
    tableButtons,
    pageConfig,
  } = useInitData(metasConfig, remoteMetasConfig);

  const baseRowSelection = {
    selectedRowKeys,
    onChange: (keys: string[], rows: any[]) => {
      setselectedRowKeys(keys);
      setselectedRows(rows);
      rowSelection?.onChange && rowSelection.onChange(keys, rows);
    },
  };

  // 获取 row配置信息
  const getRowSelectionConfig = () => {
    if (rowSelection) {
      return {
        ...rowSelection,
        ...baseRowSelection,
        // ...rowSelection,
      };
    }
    return null;
  };

  // 分页搜索
  const search = (current: number, pageSize: number) => {};

  // 事件注册
  const { getSearchButtons, getTableTopButton, operations } = useEventsRegister(
    hookMapIns,
    events,
    {
      history,
      pageCode,
      callback: (flag: boolean = true) => {},
      noModal,
      tableButtons,
      buttons,
      searchButtons,
      loading,
      setLoading,
      hookMapIns,
      validator,
      match,
      dataRef,
    }
  );
  // 初始化请求页面数据
  const initData = () => {
    setData([])
  };

  useEffect(() => {
    if (form?.id) {
      initData();
      return;
    }
  }, [JSON.stringify(extraPrams), reloadFlag, form?.id]);

  // 获取 metasConfig
  useEffect(() => {
    if (pageCode || modalCode) {

      try {
        if (pageCode) {
          setRemoteMetasConfig(pageDataResult.result);
        }
      } catch (err) {
        console.error("请求出错", err);
      }

    }
  }, [pageCode, modalCode]);

  return (
    <>
      <SchemaFormSearchContent footer={getSearchButtons()}>
        {SchemaFormRender && (
          <SchemaFormRender schema={schema} pageConfig={pageConfig} />
        )}
      </SchemaFormSearchContent>
      <TableRender
        rowKey={rowKey || "id"}
        metas={tableColumns || []}
        rowSelection={getRowSelectionConfig()}
        match={match}
        isRequesting={loading}
        handleSearch={search}
        extraAction={getTableTopButton()}
        operation={noTableOpCol ? null : operations}
        operWidth={operWidth}
        operAuths={tableButtons?.map(() => "")}
        data={tData || []}
        editable={editable}
        editableIdKey={editableIdKey}
        editableColsMap={editableColsMap}
        onEditableRowSave={onEditableRowSave}
        nested={nested}
        nestedTableColumns={nestedTableColumns}
        nestedTableDataKey={nestedTableDataKey}
        rowsRender={rowsRender}
        resetColumns={resetColumns}
      />
    </>
  );
};

export const WithListComp = CreateModalList({});
