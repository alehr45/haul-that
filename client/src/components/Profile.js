import React, { useState } from "react";
import {
  Card,
  ListGroupItem,
  ListGroup,
  Container,
  Row,
  Button,
  Modal,
  ModalBody,
} from "react-bootstrap";
import { QUERY_ME_BASIC, GET_JOBS } from "../utils/queries";
import { COMPLETE_JOB } from "../utils/mutation";
import { ADD_USER } from "../utils/mutation";
import { UPDATE_USER } from "../utils/mutation";
import Auth from "../utils/auth";
import emailjs from "emailjs-com";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Avatar from "react-avatar";
const Profile = () => {
  const [completeJob] = useMutation(COMPLETE_JOB);
  const { loading: userLoading, data } = useQuery(QUERY_ME_BASIC);
  const { loading: jobsLoading, data: jobsData } = useQuery(GET_JOBS);
  var user = {};
  var jobs = [];
  var completedJobs = [];
  var incompleteJobs = [];
  if (!userLoading) {
    console.log(jobsData);
    user = data.me;
  }
  if (!jobsLoading) {
    jobs = jobsData.jobs;
  }
  if (jobs) {
    console.log(jobs);
    for (let i = 0; i < jobs.length; i++) {
      if (jobs[i].completed === false) {
        incompleteJobs.push(jobs[i]);
      }
    }
  }
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  const handleComplete = async (_id) => {
    console.log(_id);
    await completeJob({
      variables: {
        _id: _id,
      },
    });
    // window.location.assign("/profile");
  };
  const [formState, setFormState] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    phone: user.phone,
  });
  const [updateUser] = useMutation(UPDATE_USER);
  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    console.log(formState.firstName);
  };
  //   submit form (notice the async!)
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await emailjs.send(
      "service_hsdqjea",
      "sign_up",
      formState,
      "user_VX87bNMDuxlz9E5XfnclG"
    );
    // use try/catch instead of promises to handle errors
    await updateUser({
      variables: { ...formState, _id: user._id },
    });
    window.location.assign("/profile");
  };


  return (
    <Container className="profileForm">
      <Row className="row1">
        <Card style={{ width: "18rem" }}>
          {/* button to open editing modal */}
          <Button
            variant="primary"
            className="edit"
            onClick={handleShow}
          ></Button>
          {/* edit profile modal */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form className="editform">
                <div className="form-group">
                  <label>First name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={user.firstName}
                    name="firstName"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={user.lastName}
                    name="lastName"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={user.username}
                    name="username"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    pattern="[\+]\d{2}[\(]\d{2}[\)]\d{4}[\-]\d{4}"
                    className="form-control"
                    placeholder={user.phone}
                    name="phone"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder={user.email}
                    name="email"
                    onChange={handleChange}
                  />
                </div>
                {/* <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="password" name="password" onChange={handleChange} />
              </div> */}
                <div className="form-group about">
                  <label>About Me</label>
                  <input
                    type="text"
                    className="form-control aboutInput"
                    name="about"
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  onClick={handleFormSubmit}
                  className="btn btn-dark btn-lg btn-block"
                >
                  Save
                </button>
              </form>
            </Modal.Body>
          </Modal>
          {/* edit profile end */}
          <Avatar size={262} name={user.username} />
          {/* <Modal show={show} onHide={handleClose}>
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
          </Modal> */}
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
        <h1> Active Jobs</h1>
        <div className="profilejob">
          {incompleteJobs &&
            incompleteJobs.map((job) => (
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
                    Complete Job
                  </Button>{" "}
                </ListGroup>
              </Card>
            ))}
        </div>
        <h1> Completed Jobs</h1>
        <div className="profilejob">
          {completedJobs &&
            completedJobs.map((job) => (
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
                </ListGroup>
              </Card>
            ))}
        </div>
      </Row>
    </Container>
  );
};
export default Profile;
