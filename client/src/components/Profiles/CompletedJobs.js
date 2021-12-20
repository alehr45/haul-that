import React from "react";
import { Card, Body, ListGroup, ListGroupItem } from "react-bootstrap";

const CompletedJobs = ({ info }) => {
  let { jobs, user, completedJobs } = info;

  return (
    <div className="profilejob">
      {completedJobs &&
        completedJobs.map((job) => (
          <Card className="cardbody" key={job._id} style={{ width: "12rem" }}>
            <Card.Body>
              <Card.Title>Job # {job.id}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                Haul: {parseInt(job.distance)} miles
              </ListGroupItem>
              <ListGroupItem> {job.category} </ListGroupItem>
              <ListGroupItem>
                {"$"}
                {job.price / 100}
              </ListGroupItem>
            </ListGroup>
          </Card>
        ))}
    </div>
  );
};

export default CompletedJobs;
