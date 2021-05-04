
import React, { Component } from "react";
import { Redirect, Route, Switch, BrowserRouter, Link } from "react-router-dom";
import "./App.css";

export default class App extends Component {

    Layout = (props) => {
        return (
            <Route {...props} />
        );
    };

    render() {
        const Layout = this.Layout;
        return (
            <BrowserRouter>
                <Switch>
                    <Layout
                        exact
                        path="/"
                        component={() => (
                            <h1>Login</h1>
                        )}
                    />
                    <Route exact path="/not-found" component={() => <h1>NotFound</h1>} />
                    <Redirect to="/not-found" />
                </Switch>
            </BrowserRouter>
        );
    }
}
