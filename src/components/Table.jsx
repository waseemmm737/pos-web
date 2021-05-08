import React from "react"
import { Table } from 'antd';

const TableComponent = ({ columns, dataSource, loading }) => <Table columns={columns} dataSource={dataSource} loading={loading} size="small" />
export default TableComponent