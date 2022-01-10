import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { COMPLETE_JOB } from "../utils/mutation";
import { Button, Modal } from "react-bootstrap";
import RatingPage from '../components/RatingPage'

const Success = () => {
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    setInterval(countDown, 1000);
  }

  const [seconds, setSeconds] = useState(10);
  var timeRemaining = seconds;

  const [completeJob] = useMutation(COMPLETE_JOB);
  const { job_Id } = useParams();

  completeJob({
    variables: { _id: job_Id },
  });

  // Timer to reroute
  const countDown = () => {
    timeRemaining--;
    if (timeRemaining > 0) {
      setSeconds(timeRemaining);
    } else {
      window.location.assign("/profile");
    }
  };

  return (
    <div style={{ margin: 200 }}>
      <h5>Rerouting in {seconds}</h5>
      <h1>Your payment was successful!</h1>
      <Button
        onClick={() => {
          window.location.assign("/profile");
        }}
      >
        OK
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Rate Your Driver</Modal.Title>
        </Modal.Header>
        <Modal.Body><RatingPage /></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No Thanks
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Success;
