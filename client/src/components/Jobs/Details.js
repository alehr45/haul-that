import React from "react"
import { Card, Image } from "react-bootstrap"
import moment from "moment"

const Details = ({ currentJob }) => {
  return (
    <Card.Body className="details-card">
      <Card.Title>Job # {currentJob.id}</Card.Title>
      <h6>Description: {currentJob.description}</h6>
      {currentJob.image === "" ? (
        <h6> No Images Provided...</h6>
      ) : (
        <h6>
          <a href={currentJob.image}>
            <Image style={{ height: 100, width: 100 }} src={currentJob.image} />
          </a>
        </h6>
      )}
      <h6>Email: {currentJob.email}</h6>
      <h6>Distance: {currentJob.distance} miles</h6>
      <h6>Phone: {currentJob.phone}</h6>
      <h6>Date: {moment(currentJob.date).format("MMMM Do YYYY")}</h6>
    </Card.Body>
  )
}

export default Details
