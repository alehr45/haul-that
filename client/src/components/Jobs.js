import React from "react";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import Map from "./Map";
import { Container } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_JOBS } from "../utils/queries";
import { PICKUP_JOB, UPDATE_JOB } from "../utils/mutation";
import moment from "moment";
import emailjs from "emailjs-com";

const Jobs = () => {
<<<<<<< HEAD
  const { loading, data: jobsData } = useQuery(GET_JOBS)
  const [pickupJob] = useMutation(PICKUP_JOB)
  const [updateJob] = useMutation(UPDATE_JOB)
=======
  const { loading, data: jobsData } = useQuery(GET_JOBS);
  const [pickupJob] = useMutation(PICKUP_JOB);
  const [updateJob] = useMutation(UPDATE_JOB);
>>>>>>> f960e23649f88ed88e0b279528e08f6162db4bf7

  var jobs = [];
  if (!loading) {
    jobs = [jobsData.jobs];
    console.log(jobs);
  }



  const handlePickup = async (id, jobDistance, jobCategory, jobId , email, name) => {
    
let userInfo = {name: name, email: email}
console.log(userInfo)
    await pickupJob({
      variables: {
        _id: id,
        distance: jobDistance,
        category: jobCategory,
        id: jobId,

      },
    });
    await updateJob({
      variables: { _id: id },
    });

    

    await emailjs.send("service_rvgpaz5","accept_job",userInfo,"user_ZAvEHL9UX2xiYewnTTWEa")

    window.location.assign("/profile");

  };

  const handleCardRender = () => {
    var cards = [];

    // console.log(jobs[0]);
    if (loading) {
      return <div>Loading...</div>;
    }

   

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
              {job.taken ? (
                <Button variant="secondary" disabled>
                  Pending
                </Button>
              ) : (
                <Button
                  variant="danger"
                  onClick={() =>
                    handlePickup(job._id, job.distance, job.category, job.id, job.email, job.name)
                  }
                >
                  Accept Job
                </Button>
              )}
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
