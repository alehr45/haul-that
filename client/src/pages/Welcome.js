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
      <h1>Hello {newFirstName}</h1>
      <h1>Welcome to Haul-That</h1>
      <Col>
        <h5>Preferred Use</h5>
        <Button value="customer" onClick={handleSubmit}>
          Customer
        </Button>
        <Button value="driver" onClick={handleSubmit}>
          Driver
        </Button>
      </Col>
    </div>
  )
}

export default Welcome
