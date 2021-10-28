import {
  Card,
  ListGroupItem,
  ListGroup,
  Container,
  Row,
  Button,
  Modal,
  ToggleButton,
  ButtonGroup,
  Image,
} from "react-bootstrap";
import React, { useState } from "react";
import { UPDATE_USER } from "../../utils/mutation";
// import emailjs from "emailjs-com";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { QUERY_ME_BASIC } from "../../utils/queries";
import Avatar from "react-avatar";
import PictureUploader from "./PictureUploader";

// Displays user info card for profile and opens modal for editing user information
const UserProfile = ({ user }) => {
  const { loading: userLoading, data } = useQuery(QUERY_ME_BASIC);
  const [updateUser] = useMutation(UPDATE_USER);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // try setting (on signup) a value to equal customer or driver

  const [checked1, setChecked1] = useState(user.customer);
  const [checked2, setChecked2] = useState(user.driver);

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

  const checkedInput = () => {
    if (checked1 === false) {
      setChecked1(true);
      setChecked2(false);
      formState.customer = true;
      formState.driver = false;
    } else {
      setChecked1(false);
      setChecked2(true);
      formState.driver = true;
      formState.customer = false;
    }
    if (formState.driver === true) {
      formState.position = "driver";
    } else {
      formState.position = "customer";
    }
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

                <div className="form-group">
                  <label>Preferred Use</label>
                  <br />
                  <ButtonGroup className="mb-2">
                    <ToggleButton
                      id="toggle-check"
                      type="checkbox"
                      variant="outline-dark"
                      checked={checked1}
                      onChange={(e) => checkedInput()}
                    >
                      Customer
                    </ToggleButton>
                  </ButtonGroup>
                  <ButtonGroup className="mb-2">
                    <ToggleButton
                      id="toggle-check"
                      type="checkbox"
                      variant="outline-dark"
                      checked={checked2}
                      onChange={(e) => checkedInput()}
                    >
                      Driver
                    </ToggleButton>
                  </ButtonGroup>
                </div>

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
