import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useMutation } from "@apollo/react-hooks"
import { Button, Modal, InputField } from "react-bootstrap"
import { COMPLETE_JOB } from "../utils/mutation"
import { QUERY_ME_BASIC, GET_JOB, GET_USER } from "../utils/queries"
import { useQuery } from "@apollo/react-hooks"
import { FIND_DRIVER_AND_RATE } from "../utils/mutation"
import { Rating } from "react-simple-star-rating"

const Success = () => {
  const { loading: userLoading, data } = useQuery(QUERY_ME_BASIC)
  const [completeJob] = useMutation(COMPLETE_JOB)
  const [findDriverAndRate] = useMutation(FIND_DRIVER_AND_RATE)
  const { job_Id } = useParams()
  const [show, setShow] = useState(true)
  const [rating, setRating] = useState(0)
  const [seconds, setSeconds] = useState(10)
  var timeRemaining = seconds

  // User data

  // User declines rating
  function handleClose() {
    setShow(false)
    setInterval(countDown, 1000)
  }

  // User selects rating
  const handleChange = rate => {
    setRating(rate)
  }

  // User saves rating
  const handleSave = () => {
    setShow(false)
    setInterval(countDown, 1000)
    findDriverAndRate({
      variables: { job_id: job_Id, input: rating }
    })
  }

  completeJob({
    variables: { _id: job_Id }
  })

  // Timer to reroute
  const countDown = () => {
    timeRemaining--
    if (timeRemaining > 0) {
      setSeconds(timeRemaining)
    } else {
      window.location.assign("/profile")
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header>
          <h3 className="modal-rate">Rate Your Driver!</h3>
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

      <div style={{ margin: 200 }}>
        <h5>Rerouting in {seconds}</h5>
        <h1>Your payment was successful!</h1>
        <Button
          onClick={() => {
            window.location.assign("/profile")
          }}
        >
          OK
        </Button>
      </div>
    </>
  )
}

export default Success
