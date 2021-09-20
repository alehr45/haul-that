import React, { useState } from "react";
import {
  Card,
  ListGroupItem,
  ListGroup,
  Container,
  Row,
  Button,
  Modal,
  Tab,
  Tabs,
  ToggleButton
} from "react-bootstrap";
import { QUERY_ME_BASIC, GET_JOBS } from "../utils/queries";
import { Link } from "react-router-dom";
import { COMPLETE_JOB } from "../utils/mutation";
// import emailjs from "emailjs-com";
import { useQuery, useMutation } from "@apollo/react-hooks";
import UserProfile from "./UserProfile";
import DriverProfile from "./DriverProfile";
import CustomerProfile from "./CustomerProfile";

const Profile = () => {
  const { loading: userLoading, data } = useQuery(QUERY_ME_BASIC);
  const { loading: jobsLoading, data: jobsData } = useQuery(GET_JOBS);
  var user = {};
  var jobs = [];
  const [key, setKey] = useState("");
  console.log(key)

  if (!userLoading) {
    user = data.me;
  }

  // const handleTab = (choice) => {
  //   console.log(typeof choice)
  //   setKey(choice)
  // }
  
  return (
    <Container className="profile2Form">
      <UserProfile user={user}></UserProfile>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} id="controlled-tab-example" className="mb-3">
        <Tab eventKey="customer" title="customer">
          <CustomerProfile jobs={jobs} />
        </Tab>
        <Tab eventKey="driver" title="driver">
          <DriverProfile />
        </Tab>   
      </Tabs>

      {/* <Tabs defaultActiveKey={key} id="controlled-tab-example" className="mb-3">
        <Tab eventKey="customer" title="customer" onSelect={() => handleTab("customer")}>
          <CustomerProfile jobs={jobs} />
        </Tab>
        <Tab eventKey="driver" title="driver" onClick={() => handleTab("driver")}>
          <DriverProfile />
        </Tab>   
      </Tabs> */}
    </Container>
  );
};



export default Profile;
