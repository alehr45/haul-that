import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { GET_JOB, QUERY_ME_BASIC } from "../utils/queries";
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useQuery } from "@apollo/react-hooks";

const Payment = () => {
  const [code, setCode] = useState(0);
  let { job_Id } = useParams();
  const { loading, data: jobData } = useQuery(GET_JOB, {
    variables: { _id: job_Id },
  });
  const { loading: userLoading, data } = useQuery(QUERY_ME_BASIC);

  const currentJob = jobData?.job || {};
  const currentUser = data?.me || {};

  const checkCode = () => {
    console.log(currentJob.verificationCode, code)
    if(code == currentJob.verificationCode){
      window.location.assign("/checkoutform")
      // Stripe
      // CompleteJob
    } else {
      console.log("incorrect")
    }
  };

  // Get Job
  return (
    <Container style={{ margin: "100px" }}>
      {currentJob.email === currentUser.email ? (
        <InputGroup>
          <FormControl placeholder="enter code" value={code} onChange={(event) => {
            console.log(code)
            setCode(event.target.value)
          }}></FormControl>
          <Button type="submit" onClick={checkCode}>Submit</Button>
        </InputGroup>
      ) : (
        <h1> {currentJob.verificationCode} </h1>
      )}
    </Container>
  );
};

export default Payment;