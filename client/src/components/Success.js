import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";
import { GET_JOB, COMPLETE_JOB } from "../utils/mutation";

const Success = ({ currentJob }) => {
  const [seconds, setSeconds] = useState(10);
  var timeRemaining = seconds;

  const countDown = () => {
    timeRemaining--;
    if (timeRemaining > 0 || timeRemaining === 1) {
      setSeconds(timeRemaining);
    } else {
      window.location.assign("/profile");
    }
  };

  useEffect(() => {
    if (timeRemaining > 0) {
      setInterval(countDown, 1000);
    }
  }, []);

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
    </div>
  );
};

export default Success;
