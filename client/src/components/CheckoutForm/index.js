import React from "react";
import axios from "axios";

const CheckoutForm = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios({
      method: "post",
      url: "/create-checkout-session",
      data: {
        amount: 420,
      },
    });

    const amount = response.data.amount;
    window.location.href = response.data.url;
  };

  return (
    <div style={{ margin: 300 }}>
      <form onClick={handleSubmit}>
        <h4>Price:</h4>
        <button type="submit">Checkout</button>
      </form>
    </div>
  );
};

export default CheckoutForm;
