import React, { useState } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import { QUERY_ME_BASIC } from "../../utils/queries"
// import emailjs from "emailjs-com";
import { useQuery } from "@apollo/react-hooks"
import UserProfile from "./UserProfile"
import JobProfile from "./JobProfile"

const Profile = () => {
  const { loading: userLoading, data } = useQuery(QUERY_ME_BASIC)
  let user = data?.me || {}

  const title = ["Start Job", "At Pickup", "Delivering", "At Dropoff", "Generate Code", "Payment"]
  const newTitle = ["Job Starting", "At Pickup", "Delivering", "At Dropoff", "Get CODE from Driver"]
  const options = ["secondary", "info", "warning", "danger", "success"]

  return (
    <Container className="profile2Form">
      <UserProfile user={user}></UserProfile>
      <JobProfile options={options} title={title} newTitle={newTitle} />
    </Container>
  )
}

export default Profile
