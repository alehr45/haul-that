import React from "react"
import { Card, ListGroup, ListGroupItem, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import moment from "moment"
import AliceCarousel from "react-alice-carousel"
import "react-alice-carousel/lib/alice-carousel.css"

const CompletedJobs = ({ info, setDriverEarning }) => {
  let { completedJobs } = info

  const handleDragStart = e => e.preventDefault()

  function add(accumulator, a) {
    return accumulator + a
  }

  const totalEarnings = completedJobs.map(job => job.price)
  const sum = totalEarnings.reduce(add, 0)
  const finalEarnings = sum / 100

  const responsive = {
    1024: { items: 3 },
    0: { items: 1 }
  }

  if (finalEarnings) {
    setDriverEarning(finalEarnings)
  }

  const completedJobsArr = () => {
    const items = completedJobs.map(job => (
      <div onDragStart={handleDragStart} role="presentation" className="profilejob">
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
        </Card>{" "}
        <li> </li>
      </div>
    ))
    console.log(items)
    return <AliceCarousel mouseTracking items={items} responsive={responsive} disableButtonsControls={true} />
  }

  // const slicedJobs = completedJobs.slice(0, 3)

  return <div>{completedJobsArr()}</div>
}

export default CompletedJobs
