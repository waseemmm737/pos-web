import React, { Component } from "react";
import Table from "./Table";
import { Input, Button, DatePicker, Tag } from 'antd';
import axios from "axios";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import BackendURL, { createCols, searchInObject } from "../Constants";
class Invoices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isOpen: false,
            loading: true,
            user: {},
            dateRange: []
        };
    }

    componentDidMount() {
        this.load()
    }

    load = async () => {
        let { data } = await axios.get(`${BackendURL}/invoice/get`)
        data = data.map(d => {
            Object.keys(d).forEach(key => {
                if (key === "createdAt" && Array.isArray(d[key])) {
                    d[key] = new Date(d[key][0]).toDateString()
                }
                if (Array.isArray(d[key])) {
                    delete d[key]
                }
            })
            return d
        })
        data = data.map((d, key) => ({ ...d, key: key + "" }))
        this.setState({ data, loading: false })
    }

    cols = [
        {
            title: 'Invoice Number',
            dataIndex: 'invoiceNumber',
            key: 'invoiceNumber',
            sorter: (a, b) => a.invoiceNumber < b.invoiceNumber ? -1 : a.invoiceNumber > b.invoiceNumber ? 1 : 0,
        },
        {
            title: 'Customer',
            dataIndex: 'customer',
            key: 'customer',
            sorter: (a, b) => a.customer < b.customer ? -1 : a.customer > b.customer ? 1 : 0,
        },
        {
            title: 'Customer Phone',
            dataIndex: 'customerPhone',
            key: 'customerPhone',
            sorter: (a, b) => a.customerPhone < b.customerPhone ? -1 : a.customerPhone > b.customerPhone ? 1 : 0,
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: (a, b) => a.createdAt < b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0,
        },
        {
            title: 'Discount Amount',
            dataIndex: 'discountAmount',
            key: 'discountAmount',
            sorter: (a, b) => a.discountAmount < b.discountAmount ? -1 : a.discountAmount > b.discountAmount ? 1 : 0,
        },
        {
            title: 'Discount Percent',
            dataIndex: 'discountPercent',
            key: 'discountPercent',
            sorter: (a, b) => a.discountPercent < b.discountPercent ? -1 : a.discountPercent > b.discountPercent ? 1 : 0,
            render: text => <span>{text}%</span>
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            sorter: (a, b) => a.total < b.total ? -1 : a.total > b.total ? 1 : 0,
        },
        {
            title: 'Total To Pay',
            dataIndex: 'totalToPay',
            key: 'totalToPay',
            sorter: (a, b) => a.totalToPay < b.totalToPay ? -1 : a.totalToPay > b.totalToPay ? 1 : 0,
        },
        {
            title: "Action",
            key: 'invoiceId',
            dataIndex: 'invoiceId',
            align: 'right',
            render: selectedInvoiceId => (
                <Button onClick={() => this.toggle(selectedInvoiceId)}>View</Button>
            ),
        },
    ];

    itemsCols = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Purchase Price',
            dataIndex: 'purchasePrice',
            key: 'purchasePrice',
        },
        {
            title: 'Sale Price',
            dataIndex: 'salePrice',
            key: 'salePrice',
        },
        {
            title: 'Unit',
            dataIndex: 'unit',
            key: 'unit',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Sub Total',
            dataIndex: 'subTotal',
            key: 'subTotal',
        },
    ]



    toggle = (selectedInvoiceId) => this.setState({ isOpen: !this.state.isOpen, selectedInvoiceId })

    render() {
        let { search, data, loading, selectedInvoiceId, dateRange } = this.state
        if (typeof dateRange[0] === "object" && typeof dateRange[1] === "object") {
            let condition = (d) => {
                return new Date(d.createdAt) >= new Date(dateRange[0]) && new Date(d.createdAt) <= new Date(dateRange[1])
            }
            data = data.filter(d => condition(d))
        }
        if (search)
            data = searchInObject(search, data)
        let invoicesData = data.map(o => o.invoiceId).filter((v, i, a) => a.indexOf(v) === i).map(invoiceId => data.find(d => d.invoiceId === invoiceId))
        let count = invoicesData.length
        return (
            <div className="ml-2 mr-2">
                <Input.Search placeholder="input search text" onChange={({ target: { value: search } }) => this.setState({ search })} style={{ width: 450 }} />
                <DatePicker.RangePicker
                    className="ml-2"
                    onChange={dateRange => this.setState({ dateRange: [dateRange[0]?.startOf("day")?.toDate(), dateRange[1]?.endOf("day")?.toDate()] })}
                />
                <Tag className="float-right">{`Total ${count}`}</Tag>
                <Table dataSource={invoicesData} columns={this.cols} loading={loading} />
                {selectedInvoiceId && <Modal size="lg" isOpen={this.state.isOpen}>
                    <ModalHeader toggle={() => this.toggle(null)}>{data.filter(d => d.invoiceId === selectedInvoiceId)[0]?.invoiceNumber}</ModalHeader>
                    <ModalBody>
                        <Table dataSource={data.filter(d => d.invoiceId === selectedInvoiceId)} columns={this.itemsCols} loading={loading} />
                    </ModalBody>
                </Modal>}
            </div>
        );
    }
}

export default Invoices;

