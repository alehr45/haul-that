import React from "react";
import {
  Card,
  ListGroupItem,
  ListGroup,
  Container,
  Row,
} from "react-bootstrap";
import image from "../images/profile.png";
import { QUERY_ME_BASIC, GET_JOB } from "../utils/queries";
import { useQuery } from "@apollo/react-hooks";

const Profile = () => {
  const { loading, data } = useQuery(QUERY_ME_BASIC);
  var user = {};
  var jobs = [{
    _id: "1234"
  }];

  if (!loading) {
    user = data.me;
    jobs = [user.jobs[0]];
    console.log(jobs[0]);
  }

  return (
    <Container className="profileForm">
      <Row>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={image} />
          <Card.Body>
            <Card.Title>{user.username}</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>Rating ☆☆☆☆☆</ListGroupItem>
            <ListGroupItem>Completed Deliveries: 0</ListGroupItem>
          </ListGroup>
        </Card>
      </Row>
      <Row>
        {jobs.map((job) => {
          console.log(job);
          return (
            <Card className="cardbody" key={job._id} style={{ width: "17rem" }}>
              <Card.Body>
                <Card.Title>Job # {job.id}</Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>Distance: {job.distance} miles </ListGroupItem>
                <ListGroupItem>Item Category: {job.category} </ListGroupItem>
                <ListGroupItem>Price: </ListGroupItem>
              </ListGroup>
            </Card>
          );
        })}
      </Row>
    </Container>
  );
};

export default Profile;
