import { Table, Input } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { Field } from 'schema-form';
import { TableRenderProps } from '../types';

interface DefaultProps extends TableRenderProps {
  rowsRender?:{[key:string]:any} | any;
  [extraprops: string]: any;
}

const DefaultTable = (props: DefaultProps) => {
  const {
    match,
    isRequesting,
    data,
    dataSource = [], // 设置表格属性
    pages = {}, // 设置分页参数
    className = '',
    bordered,
    operation,
    rowKey,
    pagination = true,
    rowSelection,
    footer = false,
    onTableChange,
    handleSearch,
    onExpandedRowsChange,
    onExpand,
    metas,
    defaultColumns,
    rowsRender,
    resetColumns,
    extraPropsForOp,
    operWidth,
    operAuths,
    extraAction,
    searchParams,
    tableSize = 'small',
    scrollX,
    scrollRowNum,
    ...extraProps
  } = props;

  /**
   * 获取表格操作列
   * @param columns
   * @returns
   */
  const genOperation = (columns: ColumnsType<object>) => {
    let width: number = 110;
    if (operAuths && operAuths.length > 0) {
      width = 200;
    }
    if (operWidth) {
      width = operWidth;
    }
    // 添加操作列
    if (operation) {
      columns.unshift({
        title: '操作',
        key: 'id',
        dataIndex: 'id',
        align: 'left',
        fixed: 'left', // 增加悬浮
        width,
        render: (val: any, record: any, index: number) => {
          return operation(val, record, extraPropsForOp, index);
        },
      });
    }
    columns.unshift({
      title: '序号',
      align: 'center',
      key: 'key',
      width: 90,
      fixed: 'left', // 增加悬浮
      render: (val: any, record: any, index: number) => <span>{index + 1}</span>,
    });
    return columns;
  };

  /**
   * 获取默认显示列
   * @param fields
   * @param rowsRender
   * @param resetColumns
   */
  const getDefaultColumns = (): ColumnsType<object> => {
    if (defaultColumns) {
      return resetColumns ? resetColumns(defaultColumns) : defaultColumns;
    }

    const columns: ColumnsType<object> = [];
    const sort = (fields: Field[] = []) => {
      const fieldMap: {
        [sequence: number]: Field;
      } = {};
      let count = 100;
      fields &&
        fields.length > 0 &&
        fields.map((m: Field) => {
          if (fieldMap[(m.props || m.uiProps).sequence]) {
            fieldMap[count] = m;
            count++;
          } else {
            fieldMap[(m.props || m.uiProps).sequence] = m;
          }
        });
      return Object.values(fieldMap);
    };

    if (metas && metas.length > 0) {
      sort(metas).map((field: Field) => {
        const key = field.key;
        // 过滤 隐藏列
        if (field.props?.hidden !== '1') {
          columns.push({
            title: field.label,
            key,
            dataIndex: key,
            render: (val: any, record: any) => {
              if (rowsRender && rowsRender[key]) {
                return rowsRender[key](val, record);
              }
              switch ((field.props || field.xComponentProps)?.columnRenderType) {
                case 'NUMBER':
                  return <div style={{textAlign: 'right'}}>{val}</div>;
                case 'DATE_V1':
                case 'DATE':
                  return val;
                case 'DICT_TYPE':
                  return record[`${field.key}Name`] || val;
                case 'ARRAY':
                  return val.join(',');

                case 'MASTER_DATA': {
                  return <Input {...field?.props?.attributes} value={val} />;
                }
                case 'IMG':
                  return (
                    <div className="et-img-ctt">
                      {val &&
                        val.length > 0 &&
                        val.map((valItem: any) => (
                          <img
                            src={`${valItem.url}/${valItem.id}`}
                            style={{ width: '20px', height: '20px', display: 'inline-block' }}
                          />
                        ))}
                    </div>
                  );
                default:
                  return val;
              }
            },
          });
        }
      });
      return genOperation(resetColumns ? resetColumns(columns) : columns);
    }
    return [];
  };

  /**
   * 分页变更查询
   * @param page
   */
  const handleTableChange = (page: any) => {
    const { current, pageSize } = page;
    handleSearch && handleSearch(current, pageSize);
  };
  // fix: 添加一个参数转化兼容以前的数据
  const transformDataSource = () => {
    return dataSource instanceof Array && dataSource.length ? dataSource : data?.content || [];
  };
  const transformPages = () => {
    const newPages =
      Number(data?.totalElements) >= 0
        ? {
            number: data?.number || 0,
            size: data?.size || 0,
            totalElements: data?.totalElements || 0,
          }
        : pages;
    if (newPages?.number > data?.totalPages && newPages?.totalElements) {
      newPages.totalElements += 1;
    }
    return newPages;
  };
  const newPage = transformPages();
  const tableData = transformDataSource();

  console.log(tableData, dataSource, data, rowKey, 999);

  return (
    <Table
      className={className}
      size={tableSize}
      columns={getDefaultColumns()}
      loading={isRequesting}
      bordered={bordered}
      dataSource={tableData}
      rowKey={rowKey ? rowKey : (record: any, index: number) => `${index}`}
      onChange={onTableChange || handleTableChange}
      scroll={{ x: scrollX || 'max-content' }}
      pagination={
        pagination && {
          current: newPage?.number,
          pageSize: newPage?.size,
          total: newPage?.totalElements,
          pageSizeOptions: ['10', '20', '50'],
          showSizeChanger: true,
        }
      }
      onExpandedRowsChange={onExpandedRowsChange}
      onExpand={onExpand}
      rowSelection={rowSelection}
      footer={footer}
      {...extraProps}
    />
  );
};

export default DefaultTable;
