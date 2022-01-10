import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { Button, Modal, InputField } from "react-bootstrap";
import { COMPLETE_JOB } from "../utils/mutation";
import { QUERY_ME_BASIC, GET_JOB, GET_USER } from "../utils/queries";
import { useQuery } from "@apollo/react-hooks";
import { FIND_DRIVER_AND_RATE } from "../utils/mutation";

const Success = ({}) => {
  const { loading: userLoading, data } = useQuery(QUERY_ME_BASIC);
  const [completeJob] = useMutation(COMPLETE_JOB);
  const [findDriverAndRate] = useMutation(FIND_DRIVER_AND_RATE);
  const { job_Id } = useParams();
  const [show, setShow] = useState(true);
  const [input, setInput] = useState(5);
  const [seconds, setSeconds] = useState(10);
  var timeRemaining = seconds;

  // User data
  const meData = data?.me || [];

  function handleClose() {
    setShow(false);
    // setInterval(countDown, 1000);
  }

  const handleShow = () => setShow(true);

  const handleSave = () => {
    setShow(false);
    setInterval(countDown, 1000);
    findDriverAndRate({
      variables: { job_id: job_Id, input: parseInt(input) },
    });
  };

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

  const handleChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setInput(value);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Rate Your Driver!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="stars">
          <input type="number" value={input} onChange={handleChange}></input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
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
      </div>
    </>
  );
};

export default Success;
