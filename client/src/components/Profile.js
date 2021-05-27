import React from "react";
import {
  Card,
  ListGroupItem,
  ListGroup,
  Container,
  Row,
} from "react-bootstrap";
import image from "../images/profile.png";

const Profile = () => {
  return (
    <Container className="profileForm">
      <Row>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={image} />
          <Card.Body>
            <Card.Title>John Doe</Card.Title>
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
    </Container>
  );
};

export default Profile;
