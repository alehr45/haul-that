import { Card, ListGroupItem, ListGroup, Container, Row, Button, Modal, Image, DropdownButton, Dropdown } from "react-bootstrap"
import React, { useState } from "react"
import { UPDATE_USER } from "../../utils/mutation"
// import emailjs from "emailjs-com";
<<<<<<< HEAD
import { useQuery, useMutation } from "@apollo/react-hooks"
import { QUERY_ME_BASIC } from "../../utils/queries"
import PictureUploader from "./PictureUploader"

import { Rating } from "react-simple-star-rating"

// Displays user info card for profile and opens modal for editing user information
const UserProfile = ({ user }) => {
  const { data } = useQuery(QUERY_ME_BASIC)
  const [updateUser] = useMutation(UPDATE_USER)
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  var result
  let me = data?.me || {}
=======
import { useQuery, useMutation } from "@apollo/react-hooks";
import { QUERY_ME_BASIC } from "../../utils/queries";
import PictureUploader from "./PictureUploader";
import { Rating } from "react-simple-star-rating";

// Displays user info card for profile and opens modal for editing user information
const UserProfile = ({ user }) => {
  const { loading: userLoading, data } = useQuery(QUERY_ME_BASIC);
  const [updateUser] = useMutation(UPDATE_USER);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  var result;
  let me = data?.me || {};
>>>>>>> 060ec212f1a04dba1b3830f2c3671fd0c8b860bd

  // try setting (on signup) a value to equal customer or driver

<<<<<<< HEAD
=======
  // const driver = "Driver";
  // const customer = "Customer";

>>>>>>> 060ec212f1a04dba1b3830f2c3671fd0c8b860bd
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
<<<<<<< HEAD
    image: "https://i.imgur.com/mn6sKRv.png"
  })
  console.log(formState.position)

  const option1 = thing => {
    console.log(thing)

    formState.driver = true
    formState.customer = false
    formState.position = "driver"
  }

  const option2 = event => {
    formState.customer = true
    formState.driver = false
    formState.position = "customer"
  }
=======
    image: "https://i.imgur.com/mn6sKRv.png",
  });

  console.log(formState, me);

  //  DEAL WITH THIS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const setProfile = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    if (event.target.value === "driver") {
      setFormState({
        ...formState,
        driver: true,
        customer: false,
        // position: "driver"
      });
    } else {
      setFormState({
        ...formState,
        customer: true,
        driver: false,
        // position: "customer"
      });
    }
  };
>>>>>>> 060ec212f1a04dba1b3830f2c3671fd0c8b860bd

  // Handles form submission via save button
  const handleFormSubmit = async event => {
    event.preventDefault()

    // Checks for blank/unaltered input fields to assign the original value
    // Ensures required user data in database is not sent an empty field
    if (formState) {
      if (formState.firstName === "") {
        formState.firstName = user.firstName
      }
      if (formState.lastName === "") {
        formState.lastName = user.lastName
      }
      if (formState.email === "") {
        formState.email = user.email
      }
      if (formState.phone === "") {
        formState.phone = user.phone
      }
      if (formState.aboutMe === "") {
        formState.aboutMe = user.aboutMe
      }
      if (formState.customer === "") {
        formState.customer = user.customer
      }
      if (formState.driver === "") {
        formState.driver = user.driver
      }
      if (formState.position === "") {
        formState.position = user.position
      } else {
        formState.position = result
      }
    }

    // await emailjs.send(
    //   "service_hsdqjea",
    //   "sign_up",
    //   formState,
    //   "user_VX87bNMDuxlz9E5XfnclG"
    // );

    await updateUser({
      variables: { ...formState, _id: user._id }
    })

    // reloads this page after form submission
    window.location.assign("/profile")
  }

  // Update state based on form input changes
  const handleChange = event => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    })
  }

  return (
    <Container className="profileForm">
      <Row className="row1">
        <Card style={{ width: "18rem" }}>
          {/* button to open editing modal */}
          <Button variant="primary" className="edit" onClick={handleShow}></Button>

          {/* edit profile modal */}
          <Modal show={show} onHide={handleClose}>
            <h1 className="editprofile">Edit Profile</h1>
            <Modal.Body className="modalbody">
              <form>
                <div className="form-group">
                  <label>Select a profile</label>
                  <br />
                  <Button
                    value="driver"
                    variant="outline-dark"
                    onClick={setProfile}
                  >
                    driver
                  </Button>
                  <Button
                    value="customer"
                    variant="outline-dark"
                    onClick={setProfile}
                  >
                    customer
                  </Button>
                </div>

                <div className="form-group">
                  <label>First name</label>
                  <input type="text" className="form-control" defaultValue={user.firstName} name="firstName" onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>Last name</label>
                  <input type="text" className="form-control" defaultValue={user.lastName} name="lastName" onChange={handleChange} />
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
                  <textarea rows="5" type="text" className="form-control aboutInput" defaultValue={user.aboutMe} name="aboutMe" onChange={handleChange} />
                </div>

<<<<<<< HEAD
                <button type="submit" onClick={handleFormSubmit} className="btn btn-dark btn-lg btn-block">
                  Save
                </button>
=======
                <PictureUploader type="user"></PictureUploader>
>>>>>>> 060ec212f1a04dba1b3830f2c3671fd0c8b860bd
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>{" "}
              <Button
                type="submit"
                onClick={handleFormSubmit}
                variant="primary"
              >
                Save
              </Button>
            </Modal.Footer>
          </Modal>
          {/* edit profile end */}

          <Image src={user.image} />

          {/* User's profile card - displays user's info */}
          <Card.Body>
            <Card.Title>{user.username}</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>
              {user.firstName} {user.lastName}
            </ListGroupItem>
            <ListGroupItem>
              About Me: <br />
              {user.aboutMe}
            </ListGroupItem>
            {me.driver ? (
              <ListGroupItem>
<<<<<<< HEAD
                <Button
                  onClick={() => {
                    alert(`Your driver rating is ${me.rating / me.ratingNumber / 20}`)
                  }}
                >
                  Driver Rating
                  <Rating ratingValue={me.rating / me.ratingNumber} allowHalfIcon={true} allowHover={false} readonly={true}></Rating>
                </Button>
              </ListGroupItem>
            ) : null}
=======
                Driver Rating:
                <Rating
                  ratingValue={me.rating / me.ratingNumber}
                  allowHalfIcon={true}
                  allowHover={false}
                  readonly={true}
                ></Rating>
              </ListGroupItem>
            ) : (
              <ListGroupItem>
                Customer Rating:
                <Rating
                  ratingValue={me.rating / me.ratingNumber}
                  allowHalfIcon={true}
                  allowHover={false}
                  readonly={true}
                ></Rating>
              </ListGroupItem>
            )}
>>>>>>> 060ec212f1a04dba1b3830f2c3671fd0c8b860bd
            <ListGroupItem>Phone Number: {user.phone}</ListGroupItem>
            <ListGroupItem>Email: {user.email}</ListGroupItem>
          </ListGroup>
        </Card>
      </Row>
    </Container>
  )
}

export default UserProfile
