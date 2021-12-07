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
import Success from "./components/Success";

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
            <Route path="/success" component={Success} />
            <Route path="/checkoutform" component={CheckoutForm} />
            <Route path="/login" component={Login} />
            <Route path="/jobs" component={Jobs} />
            <Route path="/payment/:job_Id" component={Payment} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
