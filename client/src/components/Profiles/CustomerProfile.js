import React from "react";
import {
  Card,
  ListGroupItem,
  ListGroup,
  Container,
  Row,
  ProgressBar,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { QUERY_ME_BASIC, GET_JOBS } from "../../utils/queries";
import { COMPLETE_JOB } from "../../utils/mutation";
import { useQuery, useMutation } from "@apollo/react-hooks";

const CustomerProfile = ({ title, newTitle }) => {
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
  console.log(user);

  if (!jobsLoading) {
    jobs = jobsData.jobs;
  }

  if (jobs) {
    for (let i = 0; i < jobs.length; i++) {
      if (jobs[i].completed === false && jobs[i].email === user.email) {
        incompleteJobs.push(jobs[i]);
      }
    }
    for (let i = 0; i < jobs.length; i++) {
      if (jobs[i].completed === true && jobs[i].email === user.email) {
        completedJobs.push(jobs[i]);
      }
    }
  }

  console.log(jobs, completedJobs, incompleteJobs);

  // const handleComplete = async (_id) => {
  //   await completeJob({
  //     variables: {
  //       _id: _id,
  //     },
  //   });
  //   // await emailjs.send("service_hsdqjea", "sign_up", formState, "user_VX87bNMDuxlz9E5XfnclG");
  //   window.location.assign("/profile");
  // };

  const progressList = (title) => {
    return <ListGroupItem className="progress2">{title}</ListGroupItem>;
  };

  const progress = (now, key) => {
    return <ProgressBar animated variant="primary" now={now} key={key} />;
  };

  return (
    <Container className="profile2Form">
      <Row>
        <h1 className="activedelivery"> Current Deliveries</h1>
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
                  <ListGroupItem>
                    Haul: {parseInt(job.distance)} miles
                  </ListGroupItem>
                  <ListGroupItem> {job.category} </ListGroupItem>
                  <ListGroupItem>${parseInt(job.distance * 1.2)}</ListGroupItem>
                  {/* Updates job.status as Driver clicks each button on DriverProfile */}
                  {job.status === 2
                    ? progressList(newTitle[0])
                    : job.status === 3
                    ? progressList(newTitle[1])
                    : job.status === 4
                    ? progressList(newTitle[2])
                    : job.status === 5
                    ? progressList(newTitle[3])
                    : progressList("pending")}
                  {/* Displays progress bar as job.status receives updates */}
                  <ListGroupItem>
                    {job.status === 1 ? (
                      progress(0, 1)
                    ) : job.status === 2 ? (
                      progress(25, 1)
                    ) : job.status === 3 ? (
                      progress(45, 2)
                    ) : job.status === 4 ? (
                      progress(75, 3)
                    ) : job.status === 5 ? (
                      progress(100, 4)
                    ) : (
<<<<<<< HEAD
                      <Link className="link" to={"/payment/" + job._id}>
                        Payment
=======
                      <Link className="link" to={`/payment/${job._id}`}>
                        <Button>Make Payment</Button>
>>>>>>> 116e57a45a372bd484d856432ad975c3653c3700
                      </Link>
                    )}
                  </ListGroupItem>
                </ListGroup>
              </Card>
            ))}
        </div>
        <h1 className="completed">Completed Deliveries</h1>
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
