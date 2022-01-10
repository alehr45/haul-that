import React from "react"
import { Container, Card, Button } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { QUERY_ME_BASIC, GET_JOB } from "../../utils/queries"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { PICKUP_JOB, UPDATE_JOB, UPDATE_JOB_DRIVER } from "../../utils/mutation"
import DetailsMap from "./DetailsMap"
import Details from "./Details"
import emailjs from "emailjs-com"

const Job = () => {
  const { data: meData } = useQuery(QUERY_ME_BASIC)
  const [updateJobDriver] = useMutation(UPDATE_JOB_DRIVER)
  const [pickupJob] = useMutation(PICKUP_JOB)
  const [updateJob] = useMutation(UPDATE_JOB)

  let { job_Id } = useParams()
  const { loading, data: jobData } = useQuery(GET_JOB, {
    variables: { _id: job_Id }
  })

  const currentJob = jobData?.job || {}
  const meEmail = meData?.me.email || ""
  // driverUsername to driver_id
  const driver_id = meData?.me._id || ""
  const name = meData?.me.name || ""

  console.log(typeof driver_id)

  const handlePickup = async () => {
    let userInfo = {
      name: name,
      email: meEmail,
      date: currentJob.date,
      meName: meEmail
    }
    await pickupJob({
      variables: {
        driverEmail: meEmail,
        _id: job_Id,
        distance: currentJob.distance,
        category: currentJob.category,
        id: currentJob.id
      }
    })
    await updateJob({
      variables: { _id: job_Id, taken: true, status: 1 }
    })
    // driverUsername to driver_id
    await updateJobDriver({
      variables: { _id: job_Id, driver_id }
    })

    console.log(userInfo)
    await emailjs.send("service_rvgpaz5", "accept_job", userInfo, "user_ZAvEHL9UX2xiYewnTTWEa")
    window.location.assign("/profile")
  }

  const handleCancel = async () => {
    await updateJob({
      variables: { _id: job_Id, taken: false, status: 1 }
    })

    await updateJobDriver({
      variables: { _id: job_Id, driverUsername: "" }
    })

    window.location.assign("/profile")
  }

  return (
    <Container className="currentjob">
      {loading ? <p>...loading</p> : <DetailsMap currentJob={currentJob} />}
      <Card className="cardbody" style={{ width: "100%" }}>
        <Details currentJob={currentJob} />
        {currentJob.taken ? (
          <div>
            {currentJob.status <= 2 ? (
              <Button variant="danger" onClick={handleCancel}>
                Drop Job
              </Button>
            ) : null}
            <Button variant="primary">
              <Link className="goback" to={"/profile"}>
                Go Back
              </Link>
            </Button>
          </div>
        ) : (
          <div>
            <Button variant="success" onClick={handlePickup}>
              Accept Job
            </Button>
            <Button variant="primary">
              <Link className="goback" to={"/jobs"}>
                Go Back
              </Link>
            </Button>
          </div>
        )}
      </Card>
    </Container>
  )
}

export default Job
