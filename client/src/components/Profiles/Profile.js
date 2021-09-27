import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { QUERY_ME_BASIC, GET_JOBS } from "../../utils/queries";
// import emailjs from "emailjs-com";
import { useQuery, useMutation } from "@apollo/react-hooks";
import UserProfile from "./UserProfile";
import DriverProfile from "./DriverProfile";
import CustomerProfile from "./CustomerProfile";

const Profile = () => {
  const { loading: userLoading, data } = useQuery(QUERY_ME_BASIC);
  let user = {};
  let [customer, setCustomer] = useState("outline-dark");
  let [driver, setDriver] = useState("outline-dark");
  let [currentProfile, setCurrentProfile] = useState("");
  let defaultProfile;
  let customerChoice = <CustomerProfile />;
  let driverChoice = <DriverProfile />;

  // Used in updateCustomer/updateDriver with window.history to change URL without reloading page
  const customerURL = "/profile/customer";
  const driverURL = "/profile/driver";
  const nextTitle = "Title";
  const nextState = { additionalInformation: "Update the URL with JS" };

  if (!userLoading) {
    user = data.me;
    // Sets default view based on User's preference: customer/driver
    if (user.position === "customer") {
      defaultProfile = customerChoice;
      window.history.pushState(nextState, nextTitle, customerURL);
      window.history.replaceState(nextState, nextTitle, customerURL);
    } else {
      defaultProfile = driverChoice;
      window.history.pushState(nextState, nextTitle, driverURL);
      window.history.replaceState(nextState, nextTitle, driverURL);
    }
  }

  // onClick updates profile to display customer view and update URL
  const updateCustomer = () => {
    setCustomer("dark");
    setDriver("outline-dark");
    setCurrentProfile(customerChoice);
    window.history.pushState(nextState, nextTitle, customerURL);
    window.history.replaceState(nextState, nextTitle, customerURL);
  };

  // onClick updates profile to display driver view and update URL
  const updateDriver = () => {
    setDriver("dark");
    setCustomer("outline-dark");
    setCurrentProfile(driverChoice);
    window.history.pushState(nextState, nextTitle, driverURL);
    window.history.replaceState(nextState, nextTitle, driverURL);
  };

  return (
    <Container className="profile2Form">
      <UserProfile user={user}></UserProfile>
      <Row>
        {/* Decides which set of buttons to show: default (on page load) or User's selection */}
        <Col>
          {currentProfile === "" && user.position === "customer" ? (
            <Button onClick={updateCustomer} variant="dark">
              Customer
            </Button>
          ) : (
            <Button onClick={updateCustomer} variant={customer}>
              Customer
            </Button>
          )}
        </Col>
        <Col>
          {currentProfile === "" && user.position === "driver" ? (
            <Button onClick={updateDriver} variant="dark">
              Driver
            </Button>
          ) : (
            <Button onClick={updateDriver} variant={driver}>
              Driver
            </Button>
          )}
        </Col>
        {/* onClick replaces default view with User's selection */}
        {currentProfile === "" ? (
          <Row>{defaultProfile}</Row>
        ) : (
          <Row>{currentProfile}</Row>
        )}
      </Row>
    </Container>
  );
};

export default Profile;
