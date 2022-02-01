import React from "react"
import { Container, Row } from "react-bootstrap"
import { QUERY_ME_BASIC, GET_JOBS } from "../../utils/queries"
import { useQuery } from "@apollo/react-hooks"
import ActiveJobs from "./ActiveJobs"
import CompletedJobs from "./CompletedJobs"

const JobProfile = ({ options, title, newTitle, setDriverEarning, setJobNumber }) => {
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
    setJobNumber(completedJobs.length)
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
    <Container>
      <Row>
        <div>
          {incompleteJobs.length ? (
            <div>
              <h1 className="active9">Active Jobs</h1>
              <ActiveJobs info={info} />
            </div>
          ) : (
            <div>
              <h1 className="active9">No Available Jobs</h1>
            </div>
          )}
        </div>

        {completedJobs.length ? (
          <div>
            <h1 className="active9">Completed Jobs</h1>
            <CompletedJobs setJobNumber={setJobNumber} setDriverEarning={setDriverEarning} info={info} />
          </div>
        ) : (
          <div>
            <h1 className="active9">No Completed Jobs</h1>
          </div>
        )}
      </Row>
    </Container>
  )
}

export default JobProfile
