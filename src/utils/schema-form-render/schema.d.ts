import { PaginationProps } from 'antd';
interface TablePaginationProps
    extends Required<Pick<PaginationProps, 'current' | 'total' | 'pageSize'>>,
    Pick<PaginationProps, 'pageSizeOptions'> {
}

interface Operations {
    title?: string,
    dataIndex?: string,
    width?: number,
    fixed?: number,
    [key: string]: any
}

export interface IOperations {
    title?: string,
    dataIndex?: string,
    width?: number,
    fixed?: number,
    [key: string]: any
}

export interface IEditTable {
    type: 'NORMAL' | 'SEARCH' | 'DETAIL',
    pagination: TablePaginationProps,
    pageCode: string,
    dataSource: [],
    defaltOperations?: true,
    filedConfig: any,
    formConfigs: any,
    [key: string]: any
}
