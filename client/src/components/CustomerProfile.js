import React, { useState } from "react";
import {
  Card,
  ListGroupItem,
  ListGroup,
  Container,
  Row,
  Button,
} from "react-bootstrap";
import { QUERY_ME_BASIC, GET_JOBS } from "../utils/queries";
import { Link } from "react-router-dom";
import { COMPLETE_JOB } from "../utils/mutation";
// import emailjs from "emailjs-com";
import { useQuery, useMutation } from "@apollo/react-hooks";
import UserProfile from "./UserProfile";

const Profile = () => {
  const [completeJob] = useMutation(COMPLETE_JOB);
  const { loading: userLoading, data } = useQuery(QUERY_ME_BASIC);
  const { loading: jobsLoading, data: jobsData } = useQuery(GET_JOBS);

  var user = {};
  var jobs = [];
  var completedJobs = [];
  var incompleteJobs = [];

  if (!userLoading) {
    user = data.me;
  }

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

    // await emailjs.send("service_hsdqjea", "sign_up", formState, "user_VX87bNMDuxlz9E5XfnclG");

    window.location.assign("/profile");
  };

  return (
    <Container className="profile2Form">
      <UserProfile user={user}></UserProfile>
      <Row>
        <Link to={"/profile"}>Go to Driver Profile</Link>
        <h1 className="active">My Deliveries in Progress</h1>
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
                <ListGroup className="list-group-flush">
                  {/* <ListGroupItem>{job.date} </ListGroupItem> */}
                  <ListGroupItem>
                    Haul: {parseInt(job.distance)} miles{" "}
                  </ListGroupItem>
                  <ListGroupItem> {job.category} </ListGroupItem>
                  <ListGroupItem>${parseInt(job.distance * 1.2)}</ListGroupItem>
                  <Button
                    variant="warning"
                    onClick={() => handleComplete(job._id)}
                  >
                    Delivery Status
                  </Button>{" "}
                </ListGroup>
              </Card>
            ))}
        </div>
        <h1 className="completed">My Completed Deliveries</h1>
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
                <ListGroup className="list-group-flush">
                  {/* <ListGroupItem>{job.date} </ListGroupItem> */}
                  <ListGroupItem>
                    Haul: {parseInt(job.distance)} miles{" "}
                  </ListGroupItem>
                  <ListGroupItem> {job.category} </ListGroupItem>
                  <ListGroupItem>${parseInt(job.distance * 1.2)}</ListGroupItem>
                </ListGroup>
              </Card>
            ))}
        </div>
      </Row>
      {/* <AcceptedJobs /> */}
    </Container>
  );
};

export default Profile;
