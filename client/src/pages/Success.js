import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useMutation } from "@apollo/react-hooks"
import { Button, Modal } from "react-bootstrap"
import { COMPLETE_JOB } from "../utils/mutation"

const Success = ({ currentJob }) => {
  const [seconds, setSeconds] = useState(10)
  var timeRemaining = seconds

  const [completeJob] = useMutation(COMPLETE_JOB)
  const { job_Id } = useParams()
  const [show, setShow] = useState(true)
  const [rating, setRating] = useState(0) // initial rating value

  // Catch Rating value

  function handleClose() {
    setShow(false)
    // setInterval(countDown, 1000)
  }

  const handleShow = () => setShow(true)

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
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Rate Your Driver!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="stars">☆☆☆☆☆</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
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
