import React, { useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_USER } from "../utils/mutation";

import Auth from "../utils/auth";

const Login = (props) => {
  const [formState, setFormState] = useState({ username: "", password: "" });

  const [login] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

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
      <Row className="login-row">
        <form className="loginform">
          <h3 className="logintitle">Login</h3>

          <div className="form-group">
            <label>Username</label>
            <input
              type="username"
              className="form-control"
              placeholder="Enter username"
              name="username"
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

          <button
            onClick={handleFormSubmit}
            type="submit"
            className="btn btn-dark btn-lg btn-block"
          >
            Sign in
          </button>
        </form>
      </Row>
    </Container>
  );
};

export default Login;
