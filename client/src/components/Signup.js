import React, { useState } from "react";
import {
  Col,
  Row,
  Container,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";
import { ADD_USER } from "../utils/mutation";
import Auth from "../utils/auth";
import emailjs from "emailjs-com";
import Profile from "./Profiles/Profile";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "./CheckoutForm/CheckoutForm.js"

// const promise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Signup = () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  const checkedInput = () => {
    if (checked1 === false) {
      setChecked1(true);
      setChecked2(false);
      formState.customer = true;
      formState.driver = false;
    } else {
      setChecked1(false);
      setChecked2(true);
      formState.driver = true;
      formState.customer = false;
    }

    if (formState.driver === true) {
      formState.position = "driver";
    } else {
      formState.position = "customer";
    }
  };

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    customer: false,
    driver: false,
    position: "",
    image: "https://i.imgur.com/mn6sKRv.png",
  });

  console.log(checked1, checked2, formState);

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

    await emailjs.send(
      "service_hsdqjea",
      "sign_up",
      formState,
      "user_VX87bNMDuxlz9E5XfnclG"
    );

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
      <Row className="signup-row">
        <form className="signupform">
          <h3>Sign Up</h3>

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

          <div className="form-group6">
            <ToggleButton
              id="toggle-check"
              type="checkbox"
              variant="white"
              checked={checked1}
              onChange={(e) => checkedInput()}
            >
              Customer
            </ToggleButton>

            {/* <ButtonGroup className="mb-2"> */}
            <ToggleButton
              id="toggle-check"
              type="checkbox"
              variant="white"
              checked={checked2}
              onChange={(e) => checkedInput()}
            >
              Driver
            </ToggleButton>
            {/* </ButtonGroup> */}
          </div>

          {/* <div className="form-group">
              <label>Credit Card Number</label>
              <input
                type="cardnumber"
                className="form-control"
                placeholder="0000 0000 0000 0000"
                name="cardnumber"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Expiration</label>
              <input
                type="expdate"
                className="form-control"
                placeholder="MM/YY"
                name="exp"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>CVC</label>
              <input
                type="number"
                className="form-control"
                placeholder="CVC"
                name="cvc"
                onChange={handleChange}
              />
            </div> */}

          {/* <Elements stripe={promise}>
                <CheckoutForm />
              </Elements> */}

          <button
            type="submit"
            onClick={handleFormSubmit}
            className="btn btn-dark btn-lg btn-block"
          >
            Register
          </button>
        </form>
      </Row>
    </Container>
  );
};

export default Signup;
