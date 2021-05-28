import React from "react";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import Map from "./Map";
import { Container } from "react-bootstrap";
import { useQuery } from "@apollo/react-hooks";
import { GET_JOBS } from "../utils/queries";

const Jobs = () => {
  const { loading, data } = useQuery(GET_JOBS);
  var jobs = [];
  if (!loading) {
    jobs = [data.jobs];
  }
  const handleCardRender = () => {
    var cards = [];
    console.log(jobs[0]);
    if (loading) {
      return <div>Loading...</div>;
    }

    if (!loading) {
      cards = jobs[0].map((job) => {
        console.log(job);
        return (
          <Card className="cardbody" key={job._id} style={{ width: "17rem" }}>
            <Card.Body>
              <Card.Title>Job {job._id}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>Distance: {parseInt(job.distance)} miles </ListGroupItem>
              <ListGroupItem>Item Category: {job.category} </ListGroupItem>
              <ListGroupItem>Price: </ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Button variant="danger">Accept Job</Button>{" "}
            </Card.Body>
          </Card>
        );
      });
    }

    return cards;
  };

  return (
    <div>
      <Map jobs={jobs} loading={loading} />
      <Container className="jobForm">{handleCardRender()}</Container>
    </div>
  );
};

export default Jobs;
