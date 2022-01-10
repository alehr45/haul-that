import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { Button, Modal, InputField } from "react-bootstrap";
import { COMPLETE_JOB } from "../utils/mutation";
import { QUERY_ME_BASIC, GET_JOB, GET_USER } from "../utils/queries";
import { useQuery } from "@apollo/react-hooks";
import { FIND_DRIVER_AND_RATE } from "../utils/mutation";
import { Rating } from 'react-simple-star-rating'

const Success = ({ }) => {
  const { loading: userLoading, data } = useQuery(QUERY_ME_BASIC);

  const [seconds, setSeconds] = useState(10);
  var timeRemaining = seconds;

  // User data
  const meData = data?.me || [];

  const [completeJob] = useMutation(COMPLETE_JOB);
  const [findDriverAndRate] = useMutation(FIND_DRIVER_AND_RATE);
  const { job_Id } = useParams();
  const [show, setShow] = useState(true);
  // const [input, setInput] = useState(5);
  const [rating, setRating] = useState(0)

  function handleClose() {
    setShow(false);
    setInterval(countDown, 1000);
  }

  const handleChange = (rate) => {
    setRating(rate)
  };

  const handleSave = () => {
    setShow(false);
    setInterval(countDown, 1000);
    findDriverAndRate({
      variables: { job_id: job_Id, input: rating },
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

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header>
          <Modal.Title>Rate Your Driver!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="stars">
          {/* <input type="number" value={input} onChange={handleChange}></input> */}
          <Rating onClick={handleChange} ratingValue={rating} /* Available Props */ />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No Thanks
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
