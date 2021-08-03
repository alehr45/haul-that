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
import React, { useState } from "react";
import { UPDATE_USER } from "../utils/mutation";
import emailjs from "emailjs-com";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Avatar from "react-avatar";

const UserProfile = ({ user }) => {
  console.log(user);
  const [updateUser] = useMutation(UPDATE_USER);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
  });

  //   submit form (notice the async!)
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // await emailjs.send(
    //   "service_hsdqjea",
    //   "sign_up",
    //   formState,
    //   "user_VX87bNMDuxlz9E5XfnclG"
    // );

    // use try/catch instead of promises to handle errors
    await updateUser({
      variables: { ...formState, _id: user._id },
    });

    window.location.assign("/profile");
  };

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
    console.log(formState);
  };

  return (
    <Container classname="profileForm">
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
    
          <Modal.Body className="modalbody">
              <form>
              <h1 className="editprofile">Edit Profile</h1>
                <div className="form-group">
                  <label>First name</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={user.firstName}
                    name="firstName"
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={user.lastName}
                    name="lastName"
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={user.username}
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
                    defaultValue={user.phone}
                    name="phone"
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    defaultValue={user.email}
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
                  variant="danger"
                  type="submit"
                  className="savebutton"
                  onClick={handleFormSubmit}
                  className="btn btn-dark btn-lg btn-block"
                >
                  Save
                </button>
                <button
                variant="danger"
                  
                  onClick={handleClose}
                  
                >
                  Close
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
      </Row>
    </Container>
  );
};

export default UserProfile;
