import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Form, Popconfirm, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { TableRenderProps, EditableColField } from '../types';
import DefaultTable from './default-table';
import EditableCell from './editable-cell';

export interface EditableDefaultProps {
  colEditable?: boolean; // 是否可编辑
  isOperation?: boolean; // 是否现实操作列
  editableIdKey?: string; // 可编辑行唯一标识字段
  editableColsMap?: {
    [colKey: string]: EditableColField;
  }; // 可编辑列组件渲染信息(可编辑状态下不传，默认编辑全部列字段)
  onEditableRowSave?: (data: any) => Promise<void> | void; // 可编辑行保存回调
}

interface EditableProps extends TableRenderProps, EditableDefaultProps { }

const EditableTable = (props: EditableProps) => {
  const {
    dataSource,
    operation,
    editableIdKey = 'id',
    editableColsMap,
    onEditableRowSave,
    existOperation = true, // 是否存在编辑列
    ...otherProps
  } = props;

  const data = useMemo(() => {
    return {
      content: dataSource
    }
  }, [JSON.stringify(dataSource)])
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [tableData, setTableData] = useState(data?.content || []);

  useEffect(() => {
    setTableData(data?.content || []);
  }, [data?.content])

  /**
   * 判断行是否正编辑
   * @param record 
   * @returns 
   */
  const isEditing = (record: any) => record[editableIdKey] === editingKey;

  /**
   * 行编辑
   * @param record 
   */
  const edit = (record: any) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record[editableIdKey]);
  };

  /**
   * 取消编辑
   */
  const cancel = () => {
    setEditingKey('');
  };

  /**
   * 编辑保存
   * @param key 
   */
  const save = async (key: string) => {
    try {
      const row = await form.validateFields();
      const newData = [...tableData];
      const index = newData.findIndex((item) => key === item[editableIdKey]);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
      } else {
        newData.push(row);
      }
      if (onEditableRowSave) {
        await onEditableRowSave(newData);
      }
      setTableData(newData);
      setEditingKey('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  // TODO: 添加一个增加按钮
  const add = () => {

  }
  /**
   * 重置columns
   * @param columns 
   * @returns 
   */
  const resetColumns = (columns: ColumnsType<object>) => {
    // 添加操作列
    // if (operation) {
    //   columns.unshift({
    //     title: formatMessage({ id: 'config.common.label.operation' }),
    //     key: 'id',
    //     dataIndex: 'id',
    //     align: 'left',
    //     fixed: 'left', // 增加悬浮
    //     // width,
    //     render: (val: any, record: any, index: number) => {
    //       return operation(val, record, {}, index)
    //     }
    //   });
    // }
    return columns.map((col: any) => {
      if (editableColsMap && !editableColsMap[col.dataIndex]) {
        return col;
      }

      const { required, rules, component }: EditableColField = editableColsMap ? editableColsMap[col.dataIndex] : {};

      return {
        ...col,
        onCell: (record: any) => ({
          record,
          inputType: component,
          required,
          rules,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    })
  }

  const restOperation = (id: string, record: any, oj: any, nb: number) => {
    const editable = isEditing(record);
    return existOperation ? <div style={{ display: 'flex' }}>

      {editable ? (
        <span>
          <a href="javascript:;" onClick={() => save(record[editableIdKey])} style={{ marginRight: 8 }}>
            保存
          </a>
          <Popconfirm title="确认取消？" onConfirm={cancel}>
            <a>取消</a>
          </Popconfirm>
        </span>
      ) : (
        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
          编辑行
        </Typography.Link>
      )}
      {operation ? operation(id, record, oj, nb) : ''}
    </div> : () => { }
  }
  return (
    <Form form={form} component={false}>
      <DefaultTable
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        data={{ ...data, content: tableData }}
        resetColumns={resetColumns}
        rowClassName="editable-row"
        {...otherProps}
        operation={restOperation}
      />
    </Form>
  );
};

export default EditableTable;