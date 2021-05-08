import React from "react"
import { Table } from 'antd';

const TableComponent = ({ columns, dataSource }) => <Table columns={columns} dataSource={dataSource} />
export default TableComponent