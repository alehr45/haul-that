<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./CheckoutForm.css";

export default function CheckoutForm() {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch("/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement
        id="card-element"
        options={cardStyle}
        onChange={handleChange}
      />
      <button disabled={processing || disabled || succeeded} id="submit">
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Pay now"
          )}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded, see the result in your
        <a href={`https://dashboard.stripe.com/test/payments`}>
          {" "}
          Stripe dashboard.
        </a>{" "}
        Refresh the page to pay again.
      </p>
    </form>
  );
}
=======
import React, { useState } from "react";
import {
  Button,
  Container,
  Card,
  ListGroup,
  Item,
  Image,
} from "react-bootstrap";
import axios from "axios";
import Details from "../Jobs/Details";

const CheckoutForm = ({ currentJob }) => {
  console.log(currentJob._id);
  const amount = "$" + currentJob.price / 100;
  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios({
      method: "post",
      url: "/create-checkout-session",
      data: {
        amount: currentJob.price,
      },
    });

    window.location.href = response.data.url;
  };
  return (
    <Container>
      <div style={{ margin: 300 }}>
        {/* <form action="/create-checkout-session" method="POST"> */}
        <form className="logo2" onClick={handleSubmit}>
          <h2 className="logo">Job Summary</h2>
          <Card className="cardbody" style={{ width: "100%" }}>
            <Details currentJob={currentJob} />
            <ListGroup.Item>Price: {amount}</ListGroup.Item>
            <Button variant="primary" type="submit">
              Checkout
            </Button>
          </Card>
        </form>
      </div>
    </Container>
  );
};

export default CheckoutForm;
>>>>>>> 116e57a45a372bd484d856432ad975c3653c3700
