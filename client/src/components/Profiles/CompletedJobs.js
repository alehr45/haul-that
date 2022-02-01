import React from "react"
import { Card, ListGroup, ListGroupItem, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import moment from "moment"

const CompletedJobs = ({ info, setDriverEarning }) => {
  let { completedJobs } = info

  function add(accumulator, a) {
    return accumulator + a
  }

  const totalEarnings = completedJobs.map(job => job.price)
  const sum = totalEarnings.reduce(add, 0)
  const finalEarnings = sum / 100

  if (finalEarnings) {
    setDriverEarning(finalEarnings)
  }

  const slicedJobs = completedJobs.slice(0, 3)

  return (
    <div className="profilejob">
      {slicedJobs &&
        slicedJobs.map(job => (
          <Card className="cardbody" key={job._id} style={{ width: "12rem" }}>
            <ListGroupItem className="job-box">
              <Col className="pt-2">
                <h4>Job # {job.id}</h4>
                <h6>{parseInt(job.distance)} miles</h6>
                <h6>{moment(job.date).format("MMMM Do YYYY")}</h6>
                <h6>{job.category}</h6>
                <h6>
                  {"$"}
                  {(job.price / 100).toFixed(2)}
                </h6>
              </Col>
            </ListGroupItem>
          </Card>

          // <li>
          //   <Link className="link4" to={`/job/${job._id}`}>
          //     {moment(job.date).format("MMMM Do YYYY")}
          //   </Link>
          // </li>
        ))}
    </div>
  )
}

export default CompletedJobs
