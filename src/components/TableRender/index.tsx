import { Table, Row, Col } from 'antd';
import _ from 'lodash';
import { ColumnsType } from 'antd/lib/table';
import { TableRenderProps } from './types';
import DefaultTable from './components/default-table';
import EditableTable, { EditableDefaultProps } from './components/editable-table';

export interface TableProps extends EditableDefaultProps, TableRenderProps {
  nested?: boolean; // 是否可嵌套子表格
  nestedTableColumns?: ColumnsType<any>; // 嵌套表格的columns
  nestedTableDataKey?: string; // 嵌套表格数据对应主表格数据的字段
  [key:string]:any
}

const TableRender = (props: TableProps) => {
  const {
    colEditable = false,
    nested = false,
    nestedTableColumns = [],
    nestedTableDataKey = '',
    extraAction,
    ...otherProps
  } = props;

  /**
   * 子表格渲染
   * @param record 
   * @returns 
   */
  const expandedRowRender = (record: any) => {
    return <Table columns={nestedTableColumns} dataSource={record[nestedTableDataKey]} pagination={false} />;
  }
  return (
    <Row>
      <Col span={24}>
        {extraAction && extraAction.length ? <Row className="extra__Action">{extraAction}</Row> : null}
        <Row>
          {
            colEditable ?
              <EditableTable {...otherProps} /> :
              nested ?
                <DefaultTable
                  {...otherProps}
                  className="components-table-demo-nested"
                  expandedRowRender={expandedRowRender}
                /> :
                <DefaultTable {...otherProps} />
          }
        </Row>
      </Col>
    </Row>
  )
}

export default TableRender;