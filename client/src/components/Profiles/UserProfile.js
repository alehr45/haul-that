import {
  Card,
  ListGroupItem,
  ListGroup,
  InputGroup,
  Container,
  Row,
  Button,
  Modal,
  FormControl,
  Image,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import React, { useState } from "react";
import { UPDATE_USER } from "../../utils/mutation";
// import emailjs from "emailjs-com";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { QUERY_ME_BASIC } from "../../utils/queries";
import PictureUploader from "./PictureUploader";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { Rating } from 'react-simple-star-rating'

// Displays user info card for profile and opens modal for editing user information
const UserProfile = ({ user }) => {


  const { loading: userLoading, data } = useQuery(QUERY_ME_BASIC);
  const [updateUser] = useMutation(UPDATE_USER);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  var result;
  let me = data?.me || {};

  console.log(typeof me.rating / me.ratingNumber)
  // try setting (on signup) a value to equal customer or driver

  const driver = "Driver";
  const customer = "Customer";

  // Initializing formstate for input fields
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    aboutMe: "",
    customer: "",
    driver: "",
    position: "",
    image: "https://i.imgur.com/mn6sKRv.png",
  });
  console.log(formState.position);

  const option1 = (thing) => {
    console.log(thing);

    formState.driver = true;
    formState.customer = false;
    formState.position = "driver";
  };

  const option2 = (event) => {
    formState.customer = true;
    formState.driver = false;
    formState.position = "customer";
  };

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
      if (formState.email === "") {
        formState.email = user.email;
      }
      if (formState.phone === "") {
        formState.phone = user.phone;
      }
      if (formState.aboutMe === "") {
        formState.aboutMe = user.aboutMe;
      }
      if (formState.customer === "") {
        formState.customer = user.customer;
      }
      if (formState.driver === "") {
        formState.driver = user.driver;
      }
      if (formState.position === "") {
        formState.position = user.position;
      } else {
        formState.position = result;
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

                <DropdownButton title="Profile" id="dropdown-basic-button">
                  <Dropdown.Item href="#" onSelect={option1}>
                    driver
                  </Dropdown.Item>
                  <Dropdown.Item href="#" onSelect={option2}>
                    customer
                  </Dropdown.Item>
                </DropdownButton>

                {/* <div className="form-group6">
                  <ToggleButton
                    id="toggle-check"
                    type="checkbox"
                    variant="white"
                    checked={checked1}
                    onChange={(e) => checkedInput()}
                  >
                    Customer
                  </ToggleButton>
                  <ToggleButton
                    id="toggle-check"
                    type="checkbox"
                    variant="white"
                    checked={checked2}
                    onChange={(e) => checkedInput()}
                  >
                    Driver
                  </ToggleButton>
                </div> */}

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

                <div className="form-group about">
                  <label>About Me</label>
                  <textarea
                    rows="5"
                    type="text"
                    className="form-control aboutInput"
                    defaultValue={user.aboutMe}
                    name="aboutMe"
                    onChange={handleChange}
                  />
                </div>
                <PictureUploader type="user"></PictureUploader>

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

          <Image src={user.image} />
          {/* <img src={ Pic1 }></img> */}
          {/* User's profile card - displays user's info */}
          <Card.Body>
            <Card.Title>{user.username}</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>
              About Me: <br />
              {user.aboutMe}
            </ListGroupItem>
            {me.driver ? (<ListGroupItem>
              Driver Rating:
              <Rating ratingValue={me.rating / me.ratingNumber} allowHalfIcon={true} allowHover={false} readonly={true}></Rating></ListGroupItem>) : null}
            <ListGroupItem>Phone Number: {user.phone}</ListGroupItem>
            <ListGroupItem>Email: {user.email}</ListGroupItem>
          </ListGroup>
        </Card>
      </Row>
    </Container>
  );
};

export default UserProfile;
