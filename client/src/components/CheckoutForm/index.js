import React from "react";
import Success from "../Success";
import axios from "axios";
import Stripe from "stripe";

const CheckoutForm = () => {

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios({
      method: 'post',
      url: "/create-checkout-session",
      data: {
        amount: 420
      }
    })

    console.log(response)
    // const body = await response.json()
    window.location.href = response.data.url
  }
  return (
    <div style={{ margin: 300 }}>
      {/* <form action="/create-checkout-session" method="POST"> */}
      <form onClick={handleSubmit}>
        <h4>Price: $200</h4>
        <button type="submit">
          Checkout
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
