import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import Jobs from "./components/Jobs";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import "./App.css";
import BookingA from "./components/Booking/BookingA";

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
          
            <Route path="/signup" component={Signup} /> 
            <Route path="/profile" component={Profile} /> 
            <Route path="/BookingA" component={BookingA} /> 
            <Route path="/login" component={Login} />
            <Route path="/jobs"  component={Jobs} />
            <Route path="/" component={Home} />
            
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
