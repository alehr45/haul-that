import React, { useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_USER } from "../utils/mutation";

import Auth from "../utils/auth";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });

  const [login] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    console.log(formState)

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });


      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={3} md={4} />
        <Col xs={5} md={4}>
          <form className="loginform">
            <h3 className="logintitle">Login</h3>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                name="email"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Enter password"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>

            <button onClick={handleFormSubmit} type="submit" className="btn btn-dark btn-lg btn-block">
              Sign in
            </button>
          </form>
        </Col>
        <Col xs={4} md={4} />
      </Row>
    </Container>
  );
};

export default Login;