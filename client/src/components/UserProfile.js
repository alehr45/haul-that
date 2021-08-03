import {
  Card,
  ListGroupItem,
  ListGroup,
  Container,
  Row,
  Button,
  Modal
} from "react-bootstrap";
import React, { useState } from "react";
import { UPDATE_USER } from "../utils/mutation";
// import emailjs from "emailjs-com";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Avatar from "react-avatar";

// Displays user info card for profile and opens modal for editing user information
const UserProfile = ({ user }) => {

  const [updateUser] = useMutation(UPDATE_USER);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Initializing formstate for input fields
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: ""
  });

  // Handles form submission via save button
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Checks for blank/unaltered input fields to assign the original value
    // Ensures required user data in database is not sent an empty field
    if (formState) {
      if (formState.firstName === "") {
        formState.firstName = user.firstName;
      }
      if (formState.lastName === "") {
        formState.lastName = user.lastName;
      }
      if (formState.username === "") {
        formState.username = user.username;
      }
      if (formState.email === "") {
        formState.email = user.email;
      }
      if (formState.phone === "") {
        formState.phone = user.phone;
      }
    }

    // await emailjs.send(
    //   "service_hsdqjea",
    //   "sign_up",
    //   formState,
    //   "user_VX87bNMDuxlz9E5XfnclG"
    // );

    await updateUser({
      variables: { ...formState, _id: user._id },
    });

    // reloads this page after form submission
    window.location.assign("/profile");
  };

  // Update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Container className="profileForm">
      <Row className="row1">
        <Card style={{ width: "18rem" }}>

          {/* button to open editing modal */}
          <Button variant="primary" className="edit" onClick={handleShow}></Button>

          {/* edit profile modal */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form className="editform">
                <div className="form-group">
                  <label>First name</label>
                  <input type="text" className="form-control" defaultValue={user.firstName} name="firstName" onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>Last name</label>
                  <input type="text" className="form-control" defaultValue={user.lastName} name="lastName" onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>Username</label>
                  <input type="text" className="form-control" defaultValue={user.username} name="username" onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" pattern="[\+]\d{2}[\(]\d{2}[\)]\d{4}[\-]\d{4}" className="form-control" defaultValue={user.phone} name="phone" onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input type="email" className="form-control" defaultValue={user.email} name="email" onChange={handleChange} />
                </div>

                <div className="form-group about">
                  <label>About Me</label>
                  <input type="text" className="form-control aboutInput" name="about" onChange={handleChange} />
                </div>

                <button type="submit" onClick={handleFormSubmit} className="btn btn-dark btn-lg btn-block">Save</button>
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
      </Row>
    </Container>
  );
};

export default UserProfile;