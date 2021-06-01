import React, { useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";
import { ADD_USER } from "../utils/mutation";
import Auth from "../utils/auth";

const Signup = () => {

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: ""
  });

  const [addUser] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    // }
        const { name, value } = event.target;

        setFormState({
          ...formState,
          [name]: value,
        });
  };

  //   submit form (notice the async!)
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // use try/catch instead of promises to handle errors
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={3} md={4} />
        <Col xs={5} md={4}>
          <form className="signupform">
            <h3>SignUp</h3>

            <div className="form-group">
              <label>First name</label>
              <input
                type="first-name"
                className="form-control"
                placeholder="First name"
                name="firstName"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Last name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
                name="lastName"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                name="username"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                pattern="[\+]\d{2}[\(]\d{2}[\)]\d{4}[\-]\d{4}"
                className="form-control"
                placeholder="123-456-7890"
                name="phone"
                onChange={handleChange}
              />
            </div>

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
                placeholder="Enter password"
                name="password"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              onClick={handleFormSubmit}
              className="btn btn-dark btn-lg btn-block"
            >
              Register
            </button>
          </form>
        </Col>
        <Col xs={4} md={4} />
      </Row>
    </Container>
  );
};

export default Signup;
