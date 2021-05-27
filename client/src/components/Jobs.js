import React from "react";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import Map from "./Map";
import { Col, Row, Container } from "react-bootstrap";


const Jobs = () => {
  
  
  
  
  return (
    <div>
      <Map />

      <Container className='jobForm'>
      
       
      <Card className="cardbody" style={{ width: "17rem" }}>
        <Card.Body>
          <Card.Title>Job #1</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>Distance: </ListGroupItem>
          <ListGroupItem>Item Category: </ListGroupItem>
          <ListGroupItem>Price: </ListGroupItem>
        </ListGroup>
        <Card.Body>
          <Button variant="danger">Accept Job</Button>{" "}
        </Card.Body>
      </Card>
      
        
      
    </Container>
    </div>
  );
}

export default Jobs;
