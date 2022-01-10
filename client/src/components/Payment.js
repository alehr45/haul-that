import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { GET_JOB, QUERY_ME_BASIC } from "../utils/queries"
import { Container, Button, InputGroup, FormControl } from "react-bootstrap"
import { useQuery } from "@apollo/react-hooks"
import CheckoutForm from "./CheckoutForm"

const Payment = () => {
  const [code, setCode] = useState(0)
  const [verified, setVerified] = useState(false)
  let { job_Id } = useParams()
  const { data: jobData } = useQuery(GET_JOB, {
    variables: { _id: job_Id }
  })
  const { data } = useQuery(QUERY_ME_BASIC)

  const currentJob = jobData?.job || {}
  const currentUser = data?.me || {}

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
            <h1> {currentJob.verificationCode} </h1>
          )}
        </Container>
      ) : (
        <CheckoutForm currentJob={currentJob} />
      )}
    </div>
  )
}

export default Payment
