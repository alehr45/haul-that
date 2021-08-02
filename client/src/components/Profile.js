import React, { useState } from "react";
import {
  Card,
  ListGroupItem,
  ListGroup,
  Container,
  Row,
  Button,
  Modal,
  ModalBody,
} from "react-bootstrap";
import { QUERY_ME_BASIC, GET_JOBS } from "../utils/queries";
import { COMPLETE_JOB } from "../utils/mutation";
import { ADD_USER } from "../utils/mutation";
import Auth from "../utils/auth";
import emailjs from "emailjs-com";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Avatar from "react-avatar";
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
    console.log(jobsData)
    user = data.me;
  }

  if(!jobsLoading){
    jobs = jobsData.jobs
  }

  if(jobs){
    console.log(jobs)

    for (let i = 0; i < jobs.length; i++) {
      if (jobs[i].completed === false && jobs[i].driverEmail === user.email) {
        incompleteJobs.push(jobs[i]);
      }
    }

    for (let i = 0; i < jobs.length; i++) {
      if (jobs[i].completed === true && jobs[i].driverEmail === user.email) {
        completedJobs.push(jobs[i]);
      }
    }
  };

  const handleComplete = async (_id) => {
    console.log(_id);
    await completeJob({
      variables: {
        _id: _id,
      },
    });

    window.location.assign("/profile");
  };

  return (
    <Container className = "profile2Form">
      <UserProfile
      user = {user}
      ></UserProfile>
      <Row>
        <h1> Active Jobs</h1>
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
                    Complete Job
                  </Button>{" "}
                </ListGroup>
              </Card>
            ))}
        </div>
        <h1> Complete Jobs</h1>
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
