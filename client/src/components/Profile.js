import React, { useState } from "react";
<<<<<<< HEAD
import {
  Card,
  ListGroupItem,
  ListGroup,
  Container,
  Row,
  Button,
} from "react-bootstrap";
=======
import { Card, ListGroupItem, ListGroup, Container, Row, Button, Modal, Tab, Tabs } from "react-bootstrap";
>>>>>>> e060cf4aad67bb84106262809cf1b9fb63647baa
import { QUERY_ME_BASIC, GET_JOBS } from "../utils/queries";
import { Link } from "react-router-dom";
import { COMPLETE_JOB } from "../utils/mutation";
// import emailjs from "emailjs-com";
import { useQuery, useMutation } from "@apollo/react-hooks";
import UserProfile from "./UserProfile";
import DriverProfile from "./DriverProfile";
import CustomerProfile from "./CustomerProfile";

const Profile = () => {
<<<<<<< HEAD
  const [completeJob] = useMutation(COMPLETE_JOB);
=======

  // const [completeJob] = useMutation(COMPLETE_JOB);
>>>>>>> e060cf4aad67bb84106262809cf1b9fb63647baa
  const { loading: userLoading, data } = useQuery(QUERY_ME_BASIC);
  const { loading: jobsLoading, data: jobsData } = useQuery(GET_JOBS);

  var user = {};
  var jobs = [];
  // var completedJobs = [];
  // var incompleteJobs = [];

  if (!userLoading) {
    user = data.me;
  }

<<<<<<< HEAD
  if (!jobsLoading) {
    jobs = jobsData.jobs;
  }

  if (jobs) {
    for (let i = 0; i < jobs.length; i++) {
      if (
        jobs[i].completed === false &&
        jobs[i].driverUsername === user.username
      ) {
        incompleteJobs.push(jobs[i]);
      }
    }
    for (let i = 0; i < jobs.length; i++) {
      if (
        jobs[i].completed === true &&
        jobs[i].driverUsername === user.username
      ) {
        completedJobs.push(jobs[i]);
      }
    }
  }

  const handleComplete = async (_id) => {
    await completeJob({
      variables: {
        _id: _id,
      },
    });
=======
  // if(!jobsLoading){
  //   jobs = jobsData.jobs
  // }

  // if(jobs){
  //   for (let i = 0; i < jobs.length; i++) {
  //     if (jobs[i].completed === false && jobs[i].driverUsername === user.username) {
  //       incompleteJobs.push(jobs[i]);
  //     }
  //   }
  //   for (let i = 0; i < jobs.length; i++) {
  //     if (jobs[i].completed === true && jobs[i].driverUsername === user.username) {
  //       completedJobs.push(jobs[i]);
  //     }
  //   }
  // };
  
  // const handleComplete = async (_id) => {
  //   await completeJob({
  //     variables: {
  //       _id: _id,
  //     },
  //   });
>>>>>>> e060cf4aad67bb84106262809cf1b9fb63647baa

  //   // await emailjs.send("service_hsdqjea", "sign_up", formState, "user_VX87bNMDuxlz9E5XfnclG");

  //   window.location.assign("/profile");
  // };

  return (
<<<<<<< HEAD
    <Container className="profile2Form">
      <UserProfile user={user}></UserProfile>
      <Row>
        <h1 className="active"> Active Jobs</h1>
=======
    <Container className = "profile2Form">
      <UserProfile user = {user}></UserProfile>

      <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="home" title="Customer">
          <CustomerProfile jobs={jobs} />
        </Tab>
        <Tab eventKey="profile" title="Driver">
          <DriverProfile />
        </Tab>
      </Tabs>
      
      {/* <Row>
        <h1> Active Jobs</h1>
>>>>>>> e060cf4aad67bb84106262809cf1b9fb63647baa
        <div className="profilejob">
          {incompleteJobs &&
            incompleteJobs.map((job) => (
              <Card
                className="cardbody"
                key={job._id}
                style={{ width: "12rem" }}
              >
                <Card.Body>
                  <Card.Title>Job # {job.id}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush"> */}
                  {/* <ListGroupItem>{job.date} </ListGroupItem> */}
                  {/* <ListGroupItem>
                    Haul: {parseInt(job.distance)} miles{" "}
                  </ListGroupItem>
                  <ListGroupItem> {job.category} </ListGroupItem>
                  <ListGroupItem>${parseInt(job.distance * 1.2)}</ListGroupItem>
                  <Button
                    variant="warning"
                    onClick={() => handleComplete(job._id)}
                  >
                    Complete Job
                  </Button>{" "}
                </ListGroup>
              </Card>
            ))}
        </div>
        <h1 className="completed">Completed Jobs</h1>
        <div className="profilejob">
          {completedJobs &&
            completedJobs.map((job) => (
              <Card
                className="cardbody"
                key={job._id}
                style={{ width: "12rem" }}
              >
                <Card.Body>
                  <Card.Title>Job # {job.id}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush"> */}
                  {/* <ListGroupItem>{job.date} </ListGroupItem> */}
                  {/* <ListGroupItem>
                    Haul: {parseInt(job.distance)} miles{" "}
                  </ListGroupItem>
                  <ListGroupItem> {job.category} </ListGroupItem>
                  <ListGroupItem>${parseInt(job.distance * 1.2)}</ListGroupItem>
                </ListGroup>
              </Card>
            ))}
        </div>
      </Row> */}
      {/* <AcceptedJobs /> */}
    </Container>
  );
};

export default Profile;
