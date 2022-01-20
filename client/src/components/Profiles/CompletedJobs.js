import React from "react"
import { Card, ListGroup, ListGroupItem } from "react-bootstrap"
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

  return (
    <div className="profilejob">
      {completedJobs &&
        completedJobs.map(job => (
          <Card className="cardbody" key={job._id} style={{ width: "12rem" }}>
            <Card.Body>
              <Card.Title>Job # {job.id}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>Haul: {parseInt(job.distance)} miles</ListGroupItem>
              <ListGroupItem> {job.category} </ListGroupItem>
              <ListGroupItem>
                {"$"}
                {job.price / 100}
              </ListGroupItem>
            </ListGroup>
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
