import React from "react";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import Map from "./Map";
import { Container } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_JOBS, QUERY_ME_BASIC } from "../utils/queries";
import { PICKUP_JOB, UPDATE_JOB, DELETE_JOB } from "../utils/mutation";
import moment from "moment";
import emailjs from "emailjs-com";

const Jobs = () => {
  const { loading, data: jobsData } = useQuery(GET_JOBS);
  const { loading: meLoading, data: meData } = useQuery(QUERY_ME_BASIC);
  const [pickupJob] = useMutation(PICKUP_JOB);
  const [updateJob] = useMutation(UPDATE_JOB);
  const [deleteJob] = useMutation(DELETE_JOB)

  var jobs = [];
  var activeJobs = []
  var me = [];
  if (!loading) {
    jobs = [jobsData.jobs];
    for (let i = 0; i < jobs[0].length; i++) {
      if (jobs[0][i].completed === false) {
        activeJobs.push(jobs[0][i]);
      }
    }
  }

  if (!meLoading) {
    me = [meData.me];
  }



  const handlePickup = async (
    id,
    jobDistance,
    jobCategory,
    jobId,
    email,
    name,
    date
  ) => {

    console.log(meData.me.firstName);
    let userInfo = {
      name: name,
      email: email,
      date: date,
      meName: meData.me.firstName,
    };

    console.log(userInfo);
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

    await emailjs.send(
      "service_rvgpaz5",
      "accept_job",
      userInfo,
      "user_ZAvEHL9UX2xiYewnTTWEa"
    );

    window.location.assign("/profile");
  };

  const handleDelete = async (_id) => {
    await deleteJob({
      variables: {_id: _id }
    })

    window.location.reload()
  }

  const handleCardRender = () => {
    var cards = [];

    // console.log(jobs[0]);
    if (loading) {
      return <div>Loading...</div>;
    }


    if (!loading && !meLoading) {

      console.log(activeJobs)
      cards = activeJobs.map((job) => {
        return (
          
          <Card className="cardbody" key={job._id} style={{ width: "100%" }}>
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
                  Pending...
                </Button>
              ) : (
                <Button
                  variant="success"
                  onClick={() =>
                    handlePickup(
                      job._id,
                      job.distance,
                      job.category,
                      job.id,
                      job.email,
                      job.name,
                      job.date
                    )
                  }
                >
                  Accept Job
                </Button>
              )}
              {job.email === me[0].email ? (
                <Button variant="danger"
                onClick={() =>
                  handleDelete(
                    job._id
                  )
                }>
                  Delete
                </Button>
              ) : (
<<<<<<< HEAD
               null
=======
                null
>>>>>>> 2a05f4b395d96a1d89a362fe27d0db009eef605a
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