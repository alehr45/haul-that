import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar.js";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import Jobs from "./components/Jobs/Job";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Profile from "./components/Profiles/Profile";
import Signup from "./components/Signup";
import "./index.css";
import BookingA from "./components/Booking/BookingA";
import CheckoutForm from "./components/CheckoutForm";
import Details from "./components/Jobs/Details";
import CustomerProfile from "./components/Profiles/CustomerProfile";
import DriverProfile from "./components/Profiles/DriverProfile";
import Payment from "./components/Payment";

// Stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51K2IcuHwCWKZ1EspUFXInR9rqob5cH83GIYrO4oHFiX4OjuR9D0VCNNnOn9ypL8DJ4geDQatBSp1covJupAJyMKf00j0btAc76"
);

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "/graphql",
});

function App() {
  // Make sure to call loadStripe outside of a component’s render to avoid
  // recreating the Stripe object on every render.
  // loadStripe is initialized with a fake API key.
  // Sign in to see examples pre-filled with your key.
  const promise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <NavBar />
          <Switch>
            <Route path="/details/:job_Id" component={Details} />
            <Route path="/signup" component={Signup} />
            {/* <Route path="/customerprofile" component={CustomerProfile} /> */}
            <Route path="/profile" component={Profile} />
            <Route path="/profile/customer" component={CustomerProfile} />
            <Route path="/profile/driver" component={DriverProfile} />
            <Route path="/BookingA" component={BookingA} />

            <Route path="/checkoutform" component={CheckoutForm}>
              <Elements stripe={promise}>
                <CheckoutForm />
              </Elements>
            </Route>
            <Route path="/login" component={Login} />
            <Route path="/jobs" component={Jobs} />
            <Route path="/payment/:job_Id" component={Payment} />
            <Route path="/" component={Home} />
            {/* <Route path="/checkoutform" component={CheckoutForm} /> */}
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
