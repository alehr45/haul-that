import React, { useState } from "react";
import {
  Card,
  ListGroupItem,
  ListGroup,
  Container,
  Row,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { QUERY_ME_BASIC, GET_JOBS } from "../../utils/queries";
import {
  COMPLETE_JOB,
  UPDATE_STATUS,
  ADD_VERIFICATION,
} from "../../utils/mutation";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Payment from "../Payment.js";

const DriverProfile = () => {
  const [completeJob] = useMutation(COMPLETE_JOB);
  const [updateStatus] = useMutation(UPDATE_STATUS);
  const [addVerification] = useMutation(ADD_VERIFICATION);
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
    // return <Payment></Payment>;

    await completeJob({
      variables: {
        _id: _id,
      },
    });

    // await emailjs.send("service_hsdqjea", "sign_up", formState, "user_VX87bNMDuxlz9E5XfnclG");
  };

  const handleStatus = async (_id, status) => {
    await updateStatus({
      variables: {
        _id: _id,
      },
    });
    window.location.assign("/profile");
  };

  const handleVerification = async (_id) => {
    console.log("here");
    await addVerification({
      variables: {
        _id: _id,
      },
    });

    await updateStatus({
      variables: {
        _id: _id,
      },
    });

    window.location.assign("/profile");
  };

  return (
    <Container className="profile2Form">
      <Row>
        <h1 className="active">Active Jobs</h1>
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
                  <Button size="sm" variant="outline-info">
                    <Link className="link" to={"/details/" + job._id}>
                      Details
                    </Link>
                  </Button>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  {/* <ListGroupItem>{job.date} </ListGroupItem> */}
                  <ListGroupItem>
                    Haul: {parseInt(job.distance)} miles
                  </ListGroupItem>
                  <ListGroupItem>
                    Drive Time: {job.realTime} minutes
                  </ListGroupItem>
                  <ListGroupItem> {job.category} </ListGroupItem>
                  <ListGroupItem> {job.date} </ListGroupItem>
                  <ListGroupItem>${parseInt(job.distance * 1.2)}</ListGroupItem>
                  {job.status === 1 ? (
                    <Button
                      variant="secondary"
                      onClick={() => handleStatus(job._id, job.status)}
                    >
                      Start Job
                    </Button>
                  ) : job.status === 2 ? (
                    <Button
                      variant="info"
                      onClick={() => handleStatus(job._id, job.status)}
                    >
                      At pickup location
                    </Button>
                  ) : job.status === 3 ? (
                    <Button
                      variant="warning"
                      onClick={() => handleStatus(job._id, job.status)}
                    >
                      Delivering
                    </Button>
                  ) : job.status === 4 ? (
                    <Button
                      variant="danger"
                      onClick={() => handleStatus(job._id, job.status)}
                    >
                      At dropoff location
                    </Button>
                  ) : job.status === 5 ? (
                    <Button
                      variant="success"
                      onClick={() => handleVerification(job._id)}
                    >
                      Generate Code
                    </Button>
                  ) : (
                    <Link className="link" to={"/payment/" + job._id}>
                      Payment
                    </Link>
                  )}
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
    </Container>
  );
};

export default DriverProfile;