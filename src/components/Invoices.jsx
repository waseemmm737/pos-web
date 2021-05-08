import React, { Component } from "react";
import Table from "./Table";
import { Input, Button } from 'antd';
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
            user: {}
        };
    }

    componentDidMount() {
        this.load()
    }

    load = async () => {
        let { data } = await axios.get(`${BackendURL}/invoice/get`)
        data = data.map(d => {
            Object.keys(d).forEach(key => {
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
        },
        {
            title: 'Invoice Id',
            dataIndex: 'invoiceId',
            key: 'invoiceId',
        },
        {
            title: 'Customer',
            dataIndex: 'customer',
            key: 'customer',
        },
        {
            title: 'Customer Phone',
            dataIndex: 'customerPhone',
            key: 'customerPhone',
        },
        {
            title: 'Discount Amount',
            dataIndex: 'discountAmount',
            key: 'discountAmount',
        },
        {
            title: 'Discount Percent',
            dataIndex: 'discountPercent',
            key: 'discountPercent',
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
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
        },
        {
            title: 'Total To Pay',
            dataIndex: 'totalToPay',
            key: 'totalToPay',
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
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
        },
        {
            title: 'Unit',
            dataIndex: 'unit',
            key: 'unit',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
    ]



    toggle = (selectedInvoiceId) => this.setState({ isOpen: !this.state.isOpen, selectedInvoiceId })

    render() {
        let { search, data, loading, selectedInvoiceId } = this.state
        if (search)
            data = searchInObject(search, data)
        return (
            <div className="ml-2 mr-2">
                <Input.Search placeholder="input search text" onChange={({ target: { value: search } }) => this.setState({ search })} style={{ width: 450 }} />
                <Table dataSource={data.map(o => o.invoiceId).filter((v, i, a) => a.indexOf(v) === i).map(invoiceId => data.find(d => d.invoiceId === invoiceId))} columns={this.cols} loading={loading} />
                {selectedInvoiceId && <Modal size="lg" isOpen={this.state.isOpen}>
                    <ModalHeader toggle={() => this.toggle(null)}>{selectedInvoiceId}</ModalHeader>
                    <ModalBody>
                        <Table dataSource={data.filter(d => d.invoiceId === selectedInvoiceId)} columns={this.itemsCols} loading={loading} />
                    </ModalBody>
                </Modal>}
            </div>
        );
    }
}

export default Invoices;

