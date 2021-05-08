import React, { Component } from "react";
import { Tabs, Button, Divider, Checkbox } from 'antd';
import ManageUsers from "./ManageUsers";
import Customers from "./Customers";
import Products from "./Products";
import Invoices from "./Invoices";
const { TabPane } = Tabs;
class Home extends Component {
    render() {
        if (!this.props.user) {
             this.props.history.push("/login")
             return ""
        }
        return (
            <Tabs defaultActiveKey="1" tabBarExtraContent={<Button onClick={this.props.signout}>signout</Button>}>
                {this.props.user.isAdmin && <TabPane tab="Manage Users" key="1">
                    <ManageUsers />
                </TabPane>}
                <TabPane tab="Customers" key="2">
                    <Customers />
                </TabPane>
                <TabPane tab="Products" key="3">
                    <Products />
                </TabPane>
                <TabPane tab="Invoices" key="4">
                    <Invoices />
                </TabPane>
            </Tabs>
        );
    }
}

export default Home;

