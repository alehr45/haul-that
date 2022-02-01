import React, { useState } from "react"
import { Container, Row, Col, Card } from "react-bootstrap"
import { QUERY_ME_BASIC } from "../../utils/queries"
// import emailjs from "emailjs-com";
import { useQuery } from "@apollo/react-hooks"
import UserProfile from "./UserProfile"
import JobProfile from "./JobProfile"

const Profile = () => {
  const [driverEarning, setDriverEarning] = useState(0)
  const [jobNumber, setJobNumber] = useState(0)
  const { data } = useQuery(QUERY_ME_BASIC)
  let user = data?.me || {}

  const title = ["Start Job", "At Pickup", "Delivering", "At Dropoff", "Generate Code", "Payment"]
  const newTitle = ["Job Starting", "At Pickup", "Delivering", "At Dropoff", "Get CODE from Driver"]
  const options = ["secondary", "info", "warning", "danger", "success"]

  return (
    <Container fluid>
      <Row style={{ height: 500, marginTop: 40 }}>
        <Card className="profilecard">
          <Card.Body>
            <Row>
              <Col>
                <UserProfile jobNumber={jobNumber} driverEarning={driverEarning} user={user}></UserProfile>
              </Col>
              <Col>
                <JobProfile setJobNumber={setJobNumber} setDriverEarning={setDriverEarning} options={options} title={title} newTitle={newTitle} />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  )
}

export default Profile
