import React, { useState } from "react"
import { Modal, Button } from "react-bootstrap"
import PictureUploader from "./PictureUploader"
import { UPDATE_USER } from "../../utils/mutation"

import { useQuery, useMutation } from "@apollo/react-hooks"

function ProfileModal({ user, show, setShow }) {
  const [updateUser] = useMutation(UPDATE_USER)

  const handleClose = () => setShow(false)
  // const handleShow = () => setShow(true)
  var result

  // try setting (on signup) a value to equal customer or driver

  // const driver = "Driver";
  // const customer = "Customer";

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
    image: "https://i.imgur.com/mn6sKRv.png"
  })

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
    <Modal show={show} onHide={handleClose}>
      <h1 className="editprofile">Edit Profile</h1>
      <Modal.Body className="modalbody">
        <form>
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
            <textarea rows="4" type="text" className="form-control aboutInput" defaultValue={user.aboutMe} name="aboutMe" onChange={handleChange} />
          </div>

          <PictureUploader type="user"></PictureUploader>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="submit-modal" center type="submit" onClick={handleFormSubmit} variant="primary">
          Save
        </Button>
        <Button center variant="warning" onClick={handleClose}>
          Cancel
        </Button>{" "}
      </Modal.Footer>
    </Modal>
  )
}

export default ProfileModal
