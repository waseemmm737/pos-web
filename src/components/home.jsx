import React, { Component } from "react";
import { Tabs, Button, Divider, Checkbox } from 'antd';
import ManageUsers from "./ManageUsers";
const { TabPane } = Tabs;
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    callback = (key) => {
        console.log(key);
    }
    render() {
        if (!this.props.user) {
             this.props.history.push("/login")
             return ""
        }
        return (
            <Tabs defaultActiveKey="1" onChange={this.callback} tabBarExtraContent={<Button onClick={this.props.signout}>signout</Button>}>
                {this.props.user.isAdmin && <TabPane tab="Manage Users" key="1">
                    <ManageUsers />
                </TabPane>}
                <TabPane tab="Customers" key="2">
                    Content of Tab Pane 2
                </TabPane>
                <TabPane tab="Tab 3" key="3">
                    Content of Tab Pane 3
                </TabPane>
            </Tabs>
        );
    }
}

export default Home;

