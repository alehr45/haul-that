import React from "react";
import { Container, Col, Card, ListGroupItem, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { GET_JOBS } from "../utils/queries";
import { useQuery } from "@apollo/react-hooks";
import Map from "./Map";
import moment from "moment";

const Details = () => {
  const { loading, data: jobsData } = useQuery(GET_JOBS);
  var currentJob;
  let { job_Id } = useParams();

  if (!loading) {
    for (let i = 0; i < jobsData.jobs.length; i++) {
      if (jobsData.jobs[i]._id === job_Id) {
        currentJob = jobsData.jobs[i];
        console.log(currentJob);
      }
    }
  }

  return (
    <Container className="currentjob">
      <Card className="cardbody" style={{ width: "100%" }}>
        <Card.Body>
          <Card.Title>Job #: {currentJob.id}</Card.Title>
          <ListGroupItem>Description: {currentJob.description}</ListGroupItem>
          <ListGroupItem>Email: {currentJob.email}</ListGroupItem>
          <ListGroupItem>Distance: {currentJob.distance} miles</ListGroupItem>
          <ListGroupItem>Phone: {currentJob.phone}</ListGroupItem>
          <ListGroupItem>
            Date: {moment(currentJob.date).format("MMMM Do YYYY")}
          </ListGroupItem>
        </Card.Body>
        <Button
          variant="success"
          // onClick={() =>
          //   handlePickup(
          //     job._id,
          //     job.distance,
          //     job.category,
          //     job.id,
          //     job.email,
          //     job.name,
          //     job.date
          //   )
          // }
        >
          Accept Job
        </Button>

        <Button variant="primary">
          <Link className="goback" to={"/jobs"}>
            Go Back
          </Link>
        </Button>
      </Card>
    </Container>
  );
};

export default Details;
