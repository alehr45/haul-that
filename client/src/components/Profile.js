import React, { useState } from "react";
import {
  Card,
  ListGroupItem,
  ListGroup,
  Container,
  Row,
  Button,
  Modal,
} from "react-bootstrap";
import { QUERY_ME_BASIC } from "../utils/queries";
import { COMPLETE_JOB } from "../utils/mutation";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Avatar from "react-avatar";

const Profile = () => {
  const [completeJob] = useMutation(COMPLETE_JOB);
  const { loading, data } = useQuery(QUERY_ME_BASIC);

  var user = {};
  var jobs = [];
  if (!loading && !data.me.jobs.length) {
    user = data.me;
  }
  if (!loading && data.me.jobs.length) {
    user = data.me;
    jobs = data.me.jobs;
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleComplete = async (_id) => {
    console.log(_id)
    await completeJob({
      variables: {
        _id: _id
      }
    })
  };

  return (
    <Container className="profileForm">
      <Row className="row1">
        <Card style={{ width: "18rem" }}>
          <Avatar size={262} name={user.username} />

          <Button variant="primary" onClick={handleShow}>
            Add Profile Pic
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Cant import picture</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Whoa! This feature is not ready yet. Coming Soon!
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          {/* <img src={ Pic1 }></img> */}
          <Card.Body>
            <Card.Title>{user.username}</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>Rating ☆☆☆☆☆</ListGroupItem>
            <ListGroupItem>Phone Number: {user.phone}</ListGroupItem>
            <ListGroupItem>Email: {user.email}</ListGroupItem>
          </ListGroup>
        </Card>

        <div className="profilejob">
          {jobs &&
            jobs.map((job) => (
              <Card
                className="cardbody"
                key={job._id}
                style={{ width: "12rem" }}
              >
                <Card.Body>
                  <Card.Title>Job # {job.id}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  {/* <ListGroupItem>{job.date} </ListGroupItem> */}
                  <ListGroupItem>
                    Haul: {parseInt(job.distance)} miles{" "}
                  </ListGroupItem>
                  <ListGroupItem> {job.category} </ListGroupItem>
                  <ListGroupItem>${parseInt(job.distance * 1.2)}</ListGroupItem>
                  <Button
                    variant="warning"
                    onClick={() => handleComplete(job._id)}
                  >
                    Job Completed
                  </Button>{" "}
                </ListGroup>
              </Card>
            ))}
        </div>
      </Row>

      {/* <AcceptedJobs /> */}
    </Container>
  );
};

export default Profile;
