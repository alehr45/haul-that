import React from "react"
import { Button, Container, Card, ListGroup } from "react-bootstrap"
import axios from "axios"
import Details from "../Jobs/Details"

const CheckoutForm = ({ currentJob }) => {
  const amount = "$" + currentJob.price / 100
  const handleSubmit = async event => {
    event.preventDefault()

    const response = await axios({
      method: "post",
      url: "/create-checkout-session",
      data: {
        amount: currentJob.price,
        id: currentJob._id
      }
    })

    window.location.href = response.data.url
  }

  return (
    <Container>
      <div style={{ margin: 150 }}>
        {/* <form action="/create-checkout-session" method="POST"> */}
        <form className="logo2" onClick={handleSubmit}>
          <h2 className="logo">Job Summary</h2>
          <Card className="cardbody" style={{ width: "100%" }}>
            <Details currentJob={currentJob} />
            <ListGroup.Item>Price: {amount}</ListGroup.Item>
            <Button variant="primary" type="submit">
              Checkout
            </Button>
          </Card>
        </form>
      </div>
    </Container>
  )
}

export default CheckoutForm
