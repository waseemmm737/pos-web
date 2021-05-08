import React, { Component } from "react";
import { Redirect, Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";
import "./App.css";

export default class App extends Component {
  Layout = (props) => {
    return <Route {...props} />;
  };

  render() {
    const Layout = this.Layout;
    return (
      <BrowserRouter>
        <Switch>
          {/* <Layout exact path="/" component={() => Nav} /> */}
          <Route exact path="/login" component={() => <Login />} />
          <Route exact path="/home" component={() => <Home />} />
          <Route exact path="/not-found" component={() => <h1>NotFound</h1>} />
          <Redirect to="/not-found" />
        </Switch>
      </BrowserRouter>
    );
  }
}
