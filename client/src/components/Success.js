import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { COMPLETE_JOB } from "../utils/mutation";
import { Button } from "react-bootstrap";

const Success = () => {
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
