import React, { useState } from "react"
import { Row, Container } from "react-bootstrap"
import { useMutation } from "@apollo/react-hooks"
import { ADD_USER } from "../utils/mutation"
import Auth from "../utils/auth"
import emailjs from "emailjs-com"

const Signup = () => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",

    image: "https://i.imgur.com/mn6sKRv.png"
  })

  const [addUser] = useMutation(ADD_USER)

  // update state based on form input changes
  const handleChange = event => {
    // }
    const { name, value } = event.target

    setFormState({
      ...formState,
      [name]: value
    })
  }

  //   submit form (notice the async!)
  const handleFormSubmit = async event => {
    event.preventDefault()

    await emailjs.send("service_hsdqjea", "sign_up", formState, "user_VX87bNMDuxlz9E5XfnclG")

    // use try/catch instead of promises to handle errors
    try {
      const { data } = await addUser({
        variables: { ...formState }
      })
      const signedUp = true

      Auth.login(data.addUser.token, signedUp)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Container>
      <Row className="p-4 pt-5">
        <form className="p-5">
          <h3>Sign Up</h3>

          <div className="form-group">
            <label>First name</label>
            <input type="first-name" className="form-control" placeholder="First name" name="firstName" onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Last name</label>
            <input type="text" className="form-control" placeholder="Last name" name="lastName" onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Username</label>
            <input type="text" className="form-control" placeholder="Enter username" name="username" onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" pattern="[\+]\d{2}[\(]\d{2}[\)]\d{4}[\-]\d{4}" className="form-control" placeholder="123-456-7890" name="phone" onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-control" placeholder="Enter email" name="email" onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Enter password" name="password" onChange={handleChange} />
          </div>
          {/* <div className="form-group">
            <label>Preferred Use</label>
            <br />
            <ButtonGroup>
              <ToggleButton className="m-2" id="toggle-check" type="checkbox" variant="primary" checked={checked1} onChange={e => checkedInput()}>
                {" "}
                Customer
              </ToggleButton>
            </ButtonGroup>
            <ButtonGroup>
              <ToggleButton variant="primary" id="toggle-check" type="checkbox" checked={checked2} onChange={e => checkedInput()}>
                {" "}
                Driver
              </ToggleButton>
            </ButtonGroup>
          </div> */}

          <button type="submit" onClick={handleFormSubmit} className="btn btn-dark btn-lg btn-block">
            Register
          </button>
        </form>
      </Row>
    </Container>
  )
}

export default Signup
