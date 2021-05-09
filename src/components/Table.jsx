import React from "react"
import { Table } from 'antd';

const TableComponent = ({ columns, dataSource, loading }) => <Table className="mt-1" columns={columns} dataSource={dataSource} loading={loading} size="small" />
export default TableComponent