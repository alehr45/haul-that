import React from "react";
import { Container, Card, ListGroupItem, Button, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { QUERY_ME_BASIC, GET_JOB, GET_JOBS } from "../../utils/queries";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  PICKUP_JOB,
  UPDATE_JOB,
  UPDATE_JOB_DRIVER,
} from "../../utils/mutation";
import DetailsMap from "./DetailsMap";
import NavBar from "../NavBar";
import moment from "moment";
import emailjs from "emailjs-com";

const Details = () => {
  const { loading: meLoading, data: meData } = useQuery(QUERY_ME_BASIC);
  const [updateJobDriver] = useMutation(UPDATE_JOB_DRIVER);
  const [pickupJob] = useMutation(PICKUP_JOB);
  const [updateJob] = useMutation(UPDATE_JOB);
  const { data: jobsData } = useQuery(GET_JOBS);
  let { job_Id } = useParams();
  const { loading, data: jobData } = useQuery(GET_JOB, {
    variables: { _id: job_Id },
  });

  const nonTakenJobs =
    jobsData?.jobs.filter((job) => job.taken === false) || [];
  const currentJob = jobData?.job || {};
  const meEmail = meData?.me.email || "";
  const driverUsername = meData?.me.username || "";
  const name = meData?.me.name || "";

  console.log(nonTakenJobs);

  const handlePickup = async () => {
    const updateTaken = () => {
      return <NavBar nonTakenJobs={nonTakenJobs} />;
    };

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

    console.log(userInfo);
    await emailjs.send(
      "service_rvgpaz5",
      "accept_job",
      userInfo,
      "user_ZAvEHL9UX2xiYewnTTWEa"
    );
    window.location.assign("/profile");
  };

  return (
    <Container className="currentjob">
      {loading ? <p>...loading</p> : <DetailsMap currentJob={currentJob} />}
      <Card className="cardbody" style={{ width: "100%" }}>
        <Card.Body>
          <Card.Title>Job # {currentJob.id}</Card.Title>
          <ListGroupItem>Description: {currentJob.description}</ListGroupItem>
          {currentJob.image === "" ? (
            <ListGroupItem> No Images Provided...</ListGroupItem>
          ) : (
            <ListGroupItem>
              <a href={currentJob.image}>
                <Image
                  style={{ height: 100, width: 100 }}
                  src={currentJob.image}
                />
              </a>
            </ListGroupItem>
          )}
          <ListGroupItem>Email: {currentJob.email}</ListGroupItem>
          <ListGroupItem>Distance: {currentJob.distance} miles</ListGroupItem>
          <ListGroupItem>Phone: {currentJob.phone}</ListGroupItem>
          <ListGroupItem>
            Date: {moment(currentJob.date).format("MMMM Do YYYY")}
          </ListGroupItem>
        </Card.Body>
        {currentJob.taken ? (
          <Button variant="primary">
            <Link className="goback" to={"/profile"}>
              Go Back
            </Link>
          </Button>
        ) : (
          <div>
            <Button variant="success" onClick={() => handlePickup()}>
              Accept Job
            </Button>
            <Button variant="primary">
              <Link className="goback" to={"/jobs"}>
                Go Back
              </Link>
            </Button>
          </div>
        )}
      </Card>
    </Container>
  );
};

export default Details;
