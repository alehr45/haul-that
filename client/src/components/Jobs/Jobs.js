import React from "react"
import { Button, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import Map from "../Map/Map"
import { Container } from "react-bootstrap"
import { useQuery } from "@apollo/react-hooks"
import { GET_JOBS, QUERY_ME_BASIC } from "../../utils/queries"

const Jobs = distance => {
  const { loading, data: jobsData } = useQuery(GET_JOBS)
  const { loading: meLoading } = useQuery(QUERY_ME_BASIC)
  const jobs = jobsData?.jobs || []
  const activeJobs = jobs.filter(job => job.completed === false)

  console.log(distance, jobs)

  const handleCardRender = () => {
    var cards = []
    if (loading) {
      return <div>Loading...</div>
    }

    if (!loading && !meLoading) {
      cards = activeJobs.map(job => {
        const _id = job._id
        return (
          <Container key={job._id} fluid>
            <Row className="row5">
              {job.taken ? (
                <Button variant="secondary" disabled>
                  Pending...
                </Button>
              ) : (
                <Button className="button6" variant="text-white-20">
                  <Link className="link" to={`/job/${_id}`}>
                    <h5>Active Job #{job.id} </h5>
                    Haul: {parseInt(job.distance)} miles {job.category} for ${parseInt(job.distance * 1.2)}
                  </Link>
                </Button>
              )}
            </Row>
          </Container>
        )
      })
    }
    return cards
  }

  console.log(activeJobs)
  return (
    <div>
      <Map jobs={jobs} loading={loading} />
      <Container>{activeJobs.length == 0 ? <h4 className="mt-5">No Jobs Available</h4> : handleCardRender()}</Container>
    </div>
  )
}

export default Jobs
