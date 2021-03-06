import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { GET_JOB, QUERY_ME_BASIC } from "../utils/queries"
import { Container, Button, InputGroup, FormControl, Modal } from "react-bootstrap"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { FIND_CUSTOMER_AND_RATE } from "../utils/mutation"
import CheckoutForm from "./CheckoutForm"
import { Rating } from "react-simple-star-rating"

const Payment = () => {
  const [code, setCode] = useState(0)
  const [verified, setVerified] = useState(false)
  const { job_Id } = useParams()
  const { data: jobData } = useQuery(GET_JOB, {
    variables: { _id: job_Id }
  })
  const [findCustomerAndRate] = useMutation(FIND_CUSTOMER_AND_RATE)
  const { data } = useQuery(QUERY_ME_BASIC)
  const currentJob = jobData?.job || {}
  const currentUser = data?.me || {}

  const [show, setShow] = useState(true)
  const [rating, setRating] = useState(0)
  console.log(rating)
  // User declines rating
  function handleClose() {
    setShow(false)
  }

  // User selects rating
  const handleChange = rate => {
    console.log(rating, rate)
    setRating(rate)
  }

  // User saves rating
  const handleSave = event => {
    event.preventDefault()
    setShow(false)
    let newRating = rating
    findCustomerAndRate({
      variables: { job_id: job_Id, input: newRating }
    })
  }

  console.log(currentJob)

  const checkCode = () => {
    console.log(currentJob.verificationCode, code)
    if (code === currentJob.verificationCode) {
      setVerified(true)
      // window.location.assign("/checkoutform");
      // Stripe
      // CompleteJob
    } else {
      console.log("incorrect")
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Get Job
  return (
    <div>
      {verified === false ? (
        <Container style={{ margin: "100px" }}>
          {currentJob.email === currentUser.email ? (
            <InputGroup>
              <FormControl
                placeholder="enter code"
                value={code}
                onChange={event => {
                  console.log(code)
                  setCode(event.target.value)
                }}
              ></FormControl>
              <Button type="submit" onClick={checkCode}>
                Submit
              </Button>
            </InputGroup>
          ) : (
            <>
              <h1> {currentJob.verificationCode} </h1>
              <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header>
                  <Modal.Title>Rate Your Customer!</Modal.Title>
                </Modal.Header>
                <Modal.Body className="stars">
                  <Rating onClick={handleChange} ratingValue={rating} />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    No Thanks
                  </Button>
                  <Button variant="primary" onClick={handleSave}>
                    Save Rating
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          )}
        </Container>
      ) : (
        <CheckoutForm currentJob={currentJob} />
      )}
    </div>
  )
}

export default Payment
