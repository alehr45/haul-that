import React from "react"
import { Button, Col } from "react-bootstrap"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { QUERY_ME_BASIC } from "../utils/queries"
import { UPDATE_POSITION } from "../utils/mutation"

const Welcome = () => {
  const { data } = useQuery(QUERY_ME_BASIC)
  const [updatePosition] = useMutation(UPDATE_POSITION)
  let user = data?.me || {}
  var driver
  var customer
  let newFirstName

  const handleSubmit = async e => {
    e.preventDefault()

    if (e.target.value === "customer") {
      driver = false
      customer = true
    } else {
      driver = true
      customer = false
    }

    await updatePosition({
      variables: { _id: user._id, driver: driver, customer: customer }
    })

    window.location.assign("/")
  }

  if (data) {
    newFirstName = user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)
  }

  return (
    <div className="welcome">
      <h3>
        Hello <strong>{newFirstName}</strong>,
      </h3>
      <h1 className="welcome-title ">Welcome to Haul-That</h1>
      <Col className="p-3">
        <h6>
          <small>Choose a position to get started.</small>
        </h6>
        <Button variant="success" className="m-2" value="customer" onClick={handleSubmit}>
          Customer
        </Button>
        <Button className="m-2" value="driver" onClick={handleSubmit}>
          Driver
        </Button>
      </Col>
    </div>
  )
}

export default Welcome
