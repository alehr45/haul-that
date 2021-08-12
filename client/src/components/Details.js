import React, { useState } from "react";
import { Card, ListGroup, ListGroupItem, Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

const Details = () => {
  let { job_Id } = useParams()

  console.log({job_Id})

  return (
    <Col>Hello</Col>
  );
}

export default Details;