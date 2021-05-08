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

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password: "" };
    }

    render() {
        if (this.props.user) {
            this.props.history.push("/")
            return ""
        }
        return (
            <React.Fragment>
                <Container className="mt-5">
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
                                        value={this.state.username}
                                        onChange={({ target: { value: username } }) => this.setState({ username })}
                                        placeholder="Enter your Username"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input
                                        type="password"
                                        value={this.state.password}
                                        onChange={({ target: { value: password } }) => this.setState({ password })}
                                        placeholder="Enter your Password"
                                    />
                                </FormGroup>
                                <Button
                                    color="primary"
                                    onClick={() => this.props.login(this.state.username, this.state.password)}
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
