import React from "react";
import {
  Card,
  ListGroup,
  ListGroupItem,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Map from "./Map/Map";
import { Container } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_JOBS, QUERY_ME_BASIC } from "../utils/queries";
import {
  PICKUP_JOB,
  UPDATE_JOB,
  DELETE_JOB,
  UPDATE_JOB_DRIVER,
} from "../utils/mutation";
import Details from "./Details";
import moment from "moment";
import emailjs from "emailjs-com";

const Jobs = () => {
  const { loading, data: jobsData } = useQuery(GET_JOBS);
  const { loading: meLoading, data: meData } = useQuery(QUERY_ME_BASIC);
  const [pickupJob] = useMutation(PICKUP_JOB);
  const [updateJob] = useMutation(UPDATE_JOB);
  const [deleteJob] = useMutation(DELETE_JOB);
  const [updateJobDriver] = useMutation(UPDATE_JOB_DRIVER);

  var jobs = [];
  var activeJobs = [];
  var me = [];
  if (!loading) {
    jobs = [jobsData.jobs];
    console.log(jobs);
    for (let i = 0; i < jobs[0].length; i++) {
      if (jobs[0][i].completed === false) {
        activeJobs.push(jobs[0][i]);
      }
    }
  }

  console.log(jobs)

  if (!meLoading) {
    me = [meData.me];

    var meEmail = me[0].email;
    var driverUsername = me[0].username;

    console.log(me[0].email);
  }

  const handleDetails = async (
    id,
    jobDistance,
    jobCategory,
    jobId,
    email,
    name,
    date
  ) => {
    return <Details date={date}></Details>;
  };

  const handleDelete = async (_id) => {
    await deleteJob({
      variables: { _id: _id },
    });

    window.location.reload();
  };

  const handleCardRender = () => {
    var cards = [];

    // console.log(jobs[0]);
    if (loading) {
      return <div>Loading...</div>;
    }

    if (!loading && !meLoading) {
      cards = activeJobs.map((job) => {
        const _id = job._id;
        return (
          <Container fluid>
            <Row className="row5">
              {/* <Col class="col-8" data-hour="08" id="08"></Col> */}

              {job.taken ? (
                <Button variant="secondary" disabled>
                  Pending...
                </Button>
              ) : (
                <Button
                className="button6"
                  variant="text-white-20"
                  onClick={() =>
                    handleDetails(
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
                  
                  <Link className="link" to={"/details/" + _id}>
                  <h2>Active Job #{job.id} </h2>
                    Haul: {parseInt(job.distance)} miles {job.category} for $
                    {parseInt(job.distance * 1.2)}
                  </Link>
                </Button>
              )}

              <Col class="col-1"></Col>
            </Row>
          </Container>
          // <Card className="cardbody" key={job._id} style={{ width: "100%" }}>
          //   <Card.Body>
          //     <Card.Title>Job # {job.id}</Card.Title>
          //   </Card.Body>
          //   <ListGroup className="list-group-flush">
          //     <ListGroupItem>
          //       {moment(job.date).format("MMMM Do YYYY")}
          //     </ListGroupItem>
          //     <ListGroupItem>
          //       Dropoff Distance: {parseInt(job.distance)} miles{" "}
          //     </ListGroupItem>
          //     <ListGroupItem>{job.description}</ListGroupItem>
          //     <ListGroupItem>Item Category: {job.category}</ListGroupItem>
          //     <ListGroupItem>
          //       Price: ${parseInt(job.distance * 1.2)}
          //     </ListGroupItem>
          //   </ListGroup>

          //   <Card.Body>
          //     {job.taken ? (
          //       <Button variant="secondary" disabled>
          //         Pending...
          //       </Button>
          //     ) : (
          //       <Button
          //         variant="success"
          //         onClick={() =>
          //           handlePickup(
          //             job._id,
          //             job.distance,
          //             job.category,
          //             job.id,
          //             job.email,
          //             job.name,
          //             job.date
          //           )
          //         }
          //       >
          //         Accept Job
          //       </Button>
          //     )}
          //     {job.email === me[0].email ? (
          //       <Button variant="danger"
          //       onClick={() =>
          //         handleDelete(
          //           job._id
          //         )
          //       }>
          //         Delete
          //       </Button>
          //     ) : (
          //      null
          //     )}
          //   </Card.Body>
          // </Card>
        );
      });
    }

    return cards;
  };

  return (
    <div>
      <Map jobs={jobs} loading={loading} />
      <Container>{handleCardRender()}</Container>
    </div>
  );
};

export default Jobs;
