import React from "react"
import { Container, Row } from "react-bootstrap"
import { QUERY_ME_BASIC, GET_JOBS } from "../../utils/queries"
import { useQuery } from "@apollo/react-hooks"
import ActiveJobs from "./ActiveJobs"
import CompletedJobs from "./CompletedJobs"

const JobProfile = ({ options, title, newTitle, setDriverEarning }) => {
  const { data } = useQuery(QUERY_ME_BASIC)
  const { data: jobsData } = useQuery(GET_JOBS)
  const user = data?.me || {}
  const jobs = jobsData?.jobs || []
  const driver = user.driver
  let incompleteJobs
  let completedJobs

  if (driver === true) {
    incompleteJobs = jobs?.filter(job => job.completed === false && job.driver_id === user._id) || []
    completedJobs = jobs?.filter(job => job.completed === true && job.driver_id === user._id) || []
  } else {
    incompleteJobs = jobs?.filter(job => job.completed === false && job.email === user.email) || []
    completedJobs = jobs?.filter(job => job.completed === true && job.email === user.email) || []
  }

  const info = {
    title: title,
    newTitle: newTitle,
    options: options,
    jobs: jobs,
    user: user,
    incompleteJobs: incompleteJobs,
    completedJobs: completedJobs
  }

  return (
    <Container className="profile2Form">
      <Row>
        <h1 className="active9">Active Jobs</h1>
        <ActiveJobs info={info} />
        <h1 className="completed">Completed Jobs</h1>
        <CompletedJobs setDriverEarning={setDriverEarning} info={info} />
      </Row>
    </Container>
  )
}

export default JobProfile
