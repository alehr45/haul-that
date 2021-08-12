import { useQuery } from "@apollo/client";
import React, { useState } from "react";
// import { Card, ListGroup, ListGroupItem, Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { GET_JOBS } from "../utils/queries";

const Details = () => {
  const { loading, data: jobsData } = useQuery(GET_JOBS);
  var currentJob;
  let { job_Id } = useParams()

  for (let i=0; i < jobsData.jobs.length; i++) {
    if (jobsData.jobs[i]._id === job_Id) {
      currentJob = jobsData.jobs[i];
      console.log(currentJob)
    }
  }

  console.log(jobsData.jobs)

  return (
    <div>
      <h1>{job_Id}</h1>
    <h1>{job_Id}</h1>
    <h1>{job_Id}</h1>
    <h1>{job_Id}</h1>
    <h1>{currentJob.email}</h1>
  
    </div>
    
  );
}

export default Details;