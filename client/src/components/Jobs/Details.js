import React from "react"
import { Card, ListGroupItem, Image } from "react-bootstrap"
import moment from "moment"

const Details = ({ currentJob }) => {
  return (
    <Card.Body>
      <Card.Title>Job # {currentJob.id}</Card.Title>
      <ListGroupItem>Description: {currentJob.description}</ListGroupItem>
      {currentJob.image === "" ? (
        <ListGroupItem> No Images Provided...</ListGroupItem>
      ) : (
        <ListGroupItem>
          <a href={currentJob.image}>
            <Image style={{ height: 100, width: 100 }} src={currentJob.image} />
          </a>
        </ListGroupItem>
      )}
      <ListGroupItem>Email: {currentJob.email}</ListGroupItem>
      <ListGroupItem>Distance: {currentJob.distance} miles</ListGroupItem>
      <ListGroupItem>Phone: {currentJob.phone}</ListGroupItem>
      <ListGroupItem>Date: {moment(currentJob.date).format("MMMM Do YYYY")}</ListGroupItem>
    </Card.Body>
  )
}

export default Details
