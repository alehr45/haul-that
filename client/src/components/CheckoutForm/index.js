import React from "react";
import Success from "../Success";

const CheckoutForm = () => {
  const handleCompletion = () => {
    return <Success />;
  };
  return (
    <div style={{ margin: 300 }}>
      <form action="/create-checkout-session" method="POST">
        <h4>Price: $200</h4>
        <button type="submit" onClick={handleCompletion}>
          Checkout
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
