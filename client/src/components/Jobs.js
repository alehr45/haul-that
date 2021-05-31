import React from "react";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import Map from "./Map";
import { Container } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_JOBS } from "../utils/queries";
import { PICKUP_JOB } from "../utils/mutation";
import moment from "moment";
const Jobs = () => {
const { loading, data: jobsData } = useQuery(GET_JOBS)
const [pickupJob] = useMutation(PICKUP_JOB)


  
  var jobs = [];
  if (!loading) {
    jobs = [jobsData.jobs];
  }

  const handlePickup = async (id, jobDistance, jobCategory, jobId) => {
    console.log(typeof distance)
    await pickupJob({
      variables: { _id: id, distance: jobDistance, category: jobCategory, id: jobId },
    })

    window.location.assign("/profile");
  }
  const handleCardRender = () => {
    var cards = [];
   
    // console.log(jobs[0]);
    if (loading) {
      return <div>Loading...</div>;
    }

    console.log(loading)

    if (!loading) {
      cards = jobs[0].map((job) => {
        // console.log(job);
        return (
          <Card className="cardbody" key={job._id} style={{ width: "17rem" }}>
            <Card.Body>
              <Card.Title>Job # {job.id}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                {moment(job.date).format("MMMM Do YYYY")}
              </ListGroupItem>
              <ListGroupItem>
                Dropoff Distance: {parseInt(job.distance)} miles{" "}
              </ListGroupItem>
              <ListGroupItem>{job.description}</ListGroupItem>
              <ListGroupItem>Item Category: {job.category}</ListGroupItem>
              <ListGroupItem>
                Price: ${parseInt(job.distance * 1.2)}
              </ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Button variant="danger" onClick={() => handlePickup(job._id, job.distance, job.category, job.id)} >Accept Job</Button>{" "}
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
