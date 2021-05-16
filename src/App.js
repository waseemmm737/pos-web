import React, { Component } from "react";
import { Redirect, Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";
import "./App.css";
import 'antd/dist/antd.css'
import backendURL from "./Constants"
import axios from "axios";
import { notification } from "antd";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = { user: JSON.parse(localStorage.getItem("user")) };
    }

    Layout = (props) => {
        return <Route {...props} />;
    };

    login = async (username, password) => {
        const response = await axios.post(`${backendURL}/user/auth`, { username, password })
        const { data: user } = response
        if (user) {
            localStorage.setItem("user", JSON.stringify(user))
            this.setState({ user })
        } else {
            notification.error({ message: "Unable to login", description: "Wrong username/password" })
        }
    }

    signout = () => this.setState({ user: null }, () => localStorage.removeItem("user"))

    render() {
        const Layout = this.Layout;
        return (
            <BrowserRouter>
                <Switch>
                    <Layout exact path="/login" component={(props) => <Login {...props} login={this.login} user={this.state.user} />} />
                    <Layout exact path="/" component={(props) => <Home {...props} user={this.state.user} signout={this.signout} />} />
                    <Layout exact path="/invoices" component={(props) => <Home {...props} tab="4" user={this.state.user} signout={this.signout} />} />
                    <Layout exact path="/not-found" component={() => <h1>Not Found</h1>} />
                    <Redirect to="/not-found" />
                </Switch>
            </BrowserRouter>
        );
    }
}
