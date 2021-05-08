import React, { Component, Fragment } from "react";
import Table from "./Table";
import { Button, Input, Form } from 'antd';
import axios from "axios";
import BackendURL from "../Constants/beckendURL";
import { OmitProps } from "antd/lib/transfer/renderListBody";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import FormItem from "antd/lib/form/FormItem";
class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isOpen: false,
            user: {}
        };
    }

    componentDidMount() {
        this.load()
    }

    load = async () => {
        let { data } = await axios.get(`${BackendURL}/product/get`)
        data = data.map((d, key) => ({ ...d, key: key + "" }))
        this.setState({ data })
    }

    cols = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: "Action",
            key: 'action',
            dataIndex: 'email',
            align: 'right',
            render: (email) => (
                <Button onClick={() => axios.delete(`${BackendURL}/user/delete/${email}`).then(this.load)}>Delete</Button>
            ),
        },
    ];


    render() {

        return (
            <div className="ml-2 mr-2">
                <Table dataSource={this.state.data} columns={this.cols} />
            </div>
        );
    }
}

export default Products;

