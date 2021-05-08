import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import NavBar from "./navbar";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }

  render() {
    console.log(process.env.NODE_ENV);
    console.log(process.env.REACT_APP_BACKEND_URL);
    return (
      <React.Fragment>
        <NavBar />
        <Container>
          <Row>
            <Col lg={{ size: 6, offset: 3 }}>
              <h1>Login</h1>
            </Col>
          </Row>
          <Row>
            <Col lg={{ size: 6, offset: 3 }}>
              <Form>
                <FormGroup>
                  <Label for="username">Username</Label>
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Enter your Username"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your Password"
                  />
                </FormGroup>
                <Button
                  color="primary"
                  onClick={() => console.log("Logged In Successfully")}
                >
                  Login
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default Login;
