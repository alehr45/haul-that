import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { QUERY_ME_BASIC } from "../../utils/queries";
// import emailjs from "emailjs-com";
import { useQuery } from "@apollo/react-hooks";
import UserProfile from "./UserProfile";
import DriverProfile from "./DriverProfile";
import CustomerProfile from "./CustomerProfile";

const Profile = () => {
  const { loading: userLoading, data } = useQuery(QUERY_ME_BASIC);
  let user = {};
  let [customer, setCustomer] = useState("outline-danger");
  let [driver, setDriver] = useState("outline-danger");
  let [currentProfile, setCurrentProfile] = useState("");
  let defaultProfile;

  const title = [
    "Start Job",
    "At Pickup",
    "Delivering",
    "At Dropoff",
    "Generate Code",
    "Payment",
  ];
  const newTitle = [
    "Job Starting",
    "At Pickup",
    "Delivering",
    "At Dropoff",
    "Get CODE from Driver",
  ];
  const options = ["secondary", "info", "warning", "danger", "success"];

  let customerChoice = <CustomerProfile newTitle={newTitle} title={title} />;
  let driverChoice = <DriverProfile options={options} title={title} />;

  // Used in updateCustomer/updateDriver with window.history to change URL without reloading page
  const customerURL = "/profile/customer";
  const driverURL = "/profile/driver";
  const nextTitle = "Title";
  const nextState = { additionalInformation: "Update the URL with JS" };

  if (!userLoading) {
    user = data.me;
<<<<<<< HEAD
    console.log(data.me);
=======
>>>>>>> 116e57a45a372bd484d856432ad975c3653c3700
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
    setCustomer("danger");
    setDriver("outline-danger");
    setCurrentProfile(customerChoice);
    window.history.pushState(nextState, nextTitle, customerURL);
    window.history.replaceState(nextState, nextTitle, customerURL);
  };

  // onClick updates profile to display driver view and update URL
  const updateDriver = () => {
    setDriver("danger");
    setCustomer("outline-danger");
    setCurrentProfile(driverChoice);
    window.history.pushState(nextState, nextTitle, driverURL);
    window.history.replaceState(nextState, nextTitle, driverURL);
  };

  return (
    <Container className="profile2Form">
      <UserProfile user={user}></UserProfile>
      <Row className="row7">
        {/* Decides which set of buttons to show: default (on page load) or User's selection */}
        <Col>
          {currentProfile === "" && user.position === "customer" ? (
            <Button onClick={updateCustomer} variant="danger">
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
            <Button onClick={updateDriver} variant="danger">
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
