import React, { Component } from "react";
import Table from "./Table";
import { Button, Input, Form, notification } from 'antd';
import axios from "axios";
import BackendURL from "../Constants";
import { OmitProps } from "antd/lib/transfer/renderListBody";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import FormItem from "antd/lib/form/FormItem";
class ManageUsers extends Component {
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
        let { data } = await axios.get(`${BackendURL}/user/get`)
        data = data.map((d, key) => ({ ...d, key: key + "" }))
        this.setState({ data, loading: false })
    }

    cols = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
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
            title: 'Password',
            dataIndex: 'password',
            key: 'password',
            render: text => <Input.Password value={text} />
        },
        {
            title: "Action",
            key: 'action',
            dataIndex: 'email',
            align: 'right',
            render: email => (
                <Button onClick={() => this.delete(email)}>Delete</Button>
            ),
        },
    ];

    delete = (email) => {
        axios.delete(`${BackendURL}/user/delete/${email}`).then(({ data }) => {
            notification.success({ message: data, description: `User(${email}) successfully deleted` });
            this.load()
        })
    }
    submit = async () => {
        await axios.post(`${BackendURL}/user/add`, this.state.user)
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
                <Table dataSource={this.state.data} columns={this.cols} loading={this.state.loading} />
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
                                <Input.Password allowClear placeholder="Password" value={password} onChange={({ target: { value: password } }) => this.setState({ user: { ...this.state.user, password } })} />
                            </FormItem>
                            <FormItem>
                                <Button htmlType="submit" disabled={!(name && email && password && username)} onClick={this.submit}>submit</Button>
                            </FormItem>
                        </Form>
                    </ModalBody>
                </Modal>

            </div>
        );
    }
}

export default ManageUsers;

