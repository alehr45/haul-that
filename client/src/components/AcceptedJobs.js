import React, { useState } from "react";
import { Card, ListGroupItem, ListGroup, Container, Row, Button, Modal} from "react-bootstrap";
import { QUERY_ME_BASIC, GET_JOB } from "../utils/queries";
import { useQuery } from "@apollo/react-hooks";
import Avatar from 'react-avatar';



const AcceptedJobs = () => {
    

    {jobs.map((job) => {
        console.log(job);
        
      })}

    return (
        <div>
          <Card className="cardbody" key={job._id} style={{ width: "17rem" }}>
            <Card.Body>
              <Card.Title>Job # {job.id}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>Distance: {job.distance} miles </ListGroupItem>
              <ListGroupItem>Item Category: {job.category} </ListGroupItem>
              <ListGroupItem>Price: ${parseInt(job.distance * 1.2)} </ListGroupItem>
            </ListGroup>
          </Card>
          </div>
        );

} 

export default AcceptedJobs;