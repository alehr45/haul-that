import React, { useState } from "react";
import {
  Card,
  ListGroupItem,
  ListGroup,
  Container,
  Row,
  Button,
  ProgressBar,
} from "react-bootstrap";
import { QUERY_ME_BASIC, GET_JOBS } from "../utils/queries";
import { COMPLETE_JOB } from "../utils/mutation";
import { useQuery, useMutation } from "@apollo/react-hooks";

const CustomerProfile = () => {
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
      <Row>
        <h1 className="active"> Current Deliveries</h1>
        <div className="profilejob">
          {incompleteJobs &&
            incompleteJobs.map((job) => (
              <Card
                className="cardbody"
                key={job._id}
                style={{ width: "12rem" }}
              >
                <Card.Body>
                  <ListGroupItem>Job # {job.id}</ListGroupItem>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  {/* <ListGroupItem>{job.date} </ListGroupItem> */}
                  <ListGroupItem>
                    Haul: {parseInt(job.distance)} miles{" "}
                  </ListGroupItem>
                  <ListGroupItem> {job.category} </ListGroupItem>
                  <ListGroupItem>${parseInt(job.distance * 1.2)}</ListGroupItem>
                  {job.status === 2 ? (
                      <ListGroupItem className="progress2">
                        {"Heading to pickup"}
                      </ListGroupItem>
                    ) : job.status === 3 ? (
                      <ListGroupItem className="progress2">
                        {"At pickup location"}
                      </ListGroupItem>
                    ) : job.status === 4 ? (
                      <ListGroupItem className="progress2">
                        {"Delivering"}
                      </ListGroupItem>
                    ) : job.status === 5 ? (
                      <ListGroupItem className="progress2">
                        {"At dropoff location"}
                      </ListGroupItem>
                    ) : (
                      <ListGroupItem className="progress2">
                        {"Pending"}
                      </ListGroupItem>
                    )}
                  
                  <ProgressBar>
                    {job.status === 1 ? (
                      <ProgressBar animated variant="primary" now={0} key={1} />
                    ) : job.status === 2 ? (
                      <ProgressBar animated variant="primary" now={25} key={1} />
                    ) : job.status === 3 ? (
                      <ProgressBar animated variant="primary" now={45} key={2} />
                    ) : job.status === 4 ? (
                      <ProgressBar animated variant="primary" now={75} key={3} />
                    ) : (
                      <ProgressBar animated variant="primary" now={95} key={3} />
                    )}
                  </ProgressBar>
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
      {/* <AcceptedJobs /> */}
    </Container>
  );
};

export default CustomerProfile;
