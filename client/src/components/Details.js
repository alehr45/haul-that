import React, { useState } from "react";
import { Card, ListGroup, ListGroupItem, Button, Row, Col } from "react-bootstrap";

const Details = (props) => {
  console.log(props.name);

  return (
    <Col>{props.name}</Col>
  );
}

export default Details;