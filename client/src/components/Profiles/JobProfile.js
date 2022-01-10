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
import { useQuery, useMutation } from "@apollo/react-hooks";
import ActiveJobs from "./ActiveJobs";
import CompletedJobs from "./CompletedJobs";

const JobProfile = ({ options, title, newTitle }) => {
  const { loading: userLoading, data } = useQuery(QUERY_ME_BASIC);
  const { loading: jobsLoading, data: jobsData } = useQuery(GET_JOBS);
  const user = data?.me || {};
  const jobs = jobsData?.jobs || [];
  const driver = user.driver;
  let incompleteJobs;
  let completedJobs;

  if (driver === true) {
    incompleteJobs =
      jobs?.filter(
        (job) => job.completed === false && job.driver_id === user._id
      ) || [];
    completedJobs =
      jobs?.filter(
        (job) => job.completed === true && job.driver_id === user._id
      ) || [];
  } else {
    incompleteJobs =
      jobs?.filter(
        (job) => job.completed === false && job.email === user.email
      ) || [];
    completedJobs =
      jobs?.filter(
        (job) => job.completed === true && job.email === user.email
      ) || [];
  }

  const info = {
    title: title,
    newTitle: newTitle,
    options: options,
    jobs: jobs,
    user: user,
    incompleteJobs: incompleteJobs,
    completedJobs: completedJobs,
  };

  return (
    <Container className="profile2Form">
      <Row>
        <h1 className="active">Active Jobs</h1>
        <ActiveJobs info={info} />
        <h1 className="completed">Completed Jobs</h1>
        <CompletedJobs info={info} />
      </Row>
    </Container>
  );
};

export default JobProfile;
