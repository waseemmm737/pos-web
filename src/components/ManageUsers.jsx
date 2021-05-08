import React, { Component, Fragment } from "react";
import Table from "./Table";
import { Button, Input, Form } from 'antd';
import axios from "axios";
import BackendURL from "../Constants/beckendURL";
import { OmitProps } from "antd/lib/transfer/renderListBody";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import FormItem from "antd/lib/form/FormItem";
class ManageUsers extends Component {
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
        let { data } = await axios.get(`${BackendURL}/user/get`)
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

    submit = async () => {
        await axios.post(`${BackendURL}/user/add`,this.state.user)
        this.toggle()
        this.load()
    }

    toggle = () => this.setState({ isOpen: !this.state.isOpen, user: {} })

    render() {
        let { name = "", email = "", password = "", username = "" } = this.state.user

        return (
            <div className="ml-2 mr-2">
                <Button onClick={this.toggle} style={{ marginBottom: 16 }}>
                    Add new user
                </Button>
                <Table dataSource={this.state.data} columns={this.cols} />
                <Modal isOpen={this.state.isOpen}>
                    <ModalHeader toggle={this.toggle}>Add New Web User</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormItem>
                                <Input allowClear placeholder="Name" value={name} onChange={({ target: { value: name } }) => this.setState({ user: { ...this.state.user, name } })} />
                            </FormItem>
                            <FormItem>
                                <Input allowClear placeholder="Email" value={email} onChange={({ target: { value: email } }) => this.setState({ user: { ...this.state.user, email } })} />
                            </FormItem>
                            <FormItem>
                                <Input allowClear placeholder="Username" value={username} onChange={({ target: { value: username } }) => this.setState({ user: { ...this.state.user, username } })} />
                            </FormItem>
                            <FormItem>
                                <Input.Password allowClear placeholder="input password" value={password} onChange={({ target: { value: password } }) => this.setState({ user: { ...this.state.user, password } })} />
                            </FormItem>
                            <FormItem>
                                <Button onClick={this.submit}>submit</Button>
                            </FormItem>
                        </Form>
                    </ModalBody>
                </Modal>

            </div>
        );
    }
}

export default ManageUsers;
