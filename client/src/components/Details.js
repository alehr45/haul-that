import React from "react";
import { Container, Col, Card, ListGroupItem, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { GET_JOBS, QUERY_ME_BASIC } from "../utils/queries";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  PICKUP_JOB,
  UPDATE_JOB,
  DELETE_JOB,
  UPDATE_JOB_DRIVER,
} from "../utils/mutation";
import DetailsMap from "./DetailsMap";
import moment from "moment";
import emailjs from "emailjs-com";

const Details = () => {
  const { loading, data: jobsData } = useQuery(GET_JOBS);
  const { loading: meLoading, data: meData } = useQuery(QUERY_ME_BASIC);
  const [updateJobDriver] = useMutation(UPDATE_JOB_DRIVER);
  const [pickupJob] = useMutation(PICKUP_JOB);
  const [updateJob] = useMutation(UPDATE_JOB);
  var currentJob;
  var me;
  let { job_Id } = useParams();

  if (!loading) {
    for (let i = 0; i < jobsData.jobs.length; i++) {
      if (jobsData.jobs[i]._id === job_Id) {
        currentJob = jobsData.jobs[i];
        console.log(currentJob);
      }
    }
  }

  if (!meLoading) {
    me = [meData.me];

    var meEmail = me[0].email;
    var driverUsername = me[0].username;
    var name = me[0].name;
  }

  const handlePickup = async () => {
    let userInfo = {
      name: name,
      email: meEmail,
      date: currentJob.date,
      meName: meEmail,
    };
    await pickupJob({
      variables: {
        driverEmail: meEmail,
        _id: job_Id,
        distance: currentJob.distance,
        category: currentJob.category,
        id: currentJob.id,
      },
    });
    await updateJob({
      variables: { _id: job_Id },
    });
    await updateJobDriver({
      variables: { _id: job_Id, driverUsername: driverUsername },
    });
    await emailjs.send(
      "service_rvgpaz5",
      "accept_job",
      userInfo,
      "user_ZAvEHL9UX2xiYewnTTWEa"
    );

    window.location.assign("/profile");
  };

  // to be passed to detailsMap component
  const start = {
    lat: parseFloat(currentJob.pickup.lat),
    lng: parseFloat(currentJob.pickup.lng),
  };
  const end = {
    lat: parseFloat(currentJob.dropoff.lat),
    lng: parseFloat(currentJob.dropoff.lng),
  };

  return (
    <Container className="currentjob">
      <DetailsMap start={start} end={end} />
      <Card className="cardbody" style={{ width: "100%" }}>
        <Card.Body>
          <Card.Title>Job # {currentJob.id}</Card.Title>
          <ListGroupItem>Description: {currentJob.description}</ListGroupItem>
          <ListGroupItem>Email: {currentJob.email}</ListGroupItem>
          <ListGroupItem>Distance: {currentJob.distance} miles</ListGroupItem>
          <ListGroupItem>Phone: {currentJob.phone}</ListGroupItem>
          <ListGroupItem>
            Date: {moment(currentJob.date).format("MMMM Do YYYY")}
          </ListGroupItem>
        </Card.Body>
        <Button variant="success" onClick={() => handlePickup()}>
          Accept Job
        </Button>

        <Button variant="primary">
          <Link className="goback" to={"/jobs"}>
            Go Back
          </Link>
        </Button>
      </Card>
    </Container>
  );
};

export default Details;
