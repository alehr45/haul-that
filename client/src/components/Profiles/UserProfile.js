import { Card, Container, Row, ListGroup, Image, Col } from "react-bootstrap"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useQuery } from "@apollo/react-hooks"
import { QUERY_ME_BASIC } from "../../utils/queries"
import { Rating } from "react-simple-star-rating"
import ProfileModal from "./ProfileModal"
import RatingModal from "./RatingModal"

// Displays user info card for profile and opens modal for editing user information
const UserProfile = ({ user, driverEarning, jobNumber }) => {
  const { data } = useQuery(QUERY_ME_BASIC)
  const [show, setShow] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const handleShowModal = () => setShowModal(true)
  const handleShow = () => setShow(true)

  let me = data?.me || {}

  //Rating
  let rating = me.rating / me.ratingNumber
  let secondRating = rating / 20
  let finalRating = secondRating.toFixed(2)

  return (
    <>
      <Container className="pt-2">
        <Row className="profile-top-color">
          <Card className="p-5">
            <Row>
              <ProfileModal show={show} setShow={setShow} user={user} />
              <Col className="mb-4 profile-box">
                <h6 className="pt-3 username">{user.username}</h6>
                <h6 className="name-profile">
                  {user.firstName} {user.lastName}
                </h6>
                <h6>
                  <a className="small" onClick={handleShow}>
                    Edit Profile
                  </a>
                </h6>
              </Col>
              <Col>
                <Image src={user.image} roundedCircle height={160} />
              </Col>
            </Row>
          </Card>
        </Row>
      </Container>
      <Container className="pb-4">
        <Row>
          <Card className="profile-bottom">
            <Card className="mb-3">
              <ListGroup>
                <Col className="p-4">
                  <h6>
                    {""}
                    <i className="bi bi-envelope"> {user.email}</i>
                  </h6>
                  <h6>
                    {""}
                    <i className="bi bi-telephone"> {user.phone}</i>
                  </h6>
                  {me.driver ? <h6 className="display-5">$ {driverEarning.toFixed(2)}</h6> : <h6 className="display-5">$ {driverEarning.toFixed(2)}</h6>}
                </Col>
              </ListGroup>
            </Card>

            <Card.Body className="border">
              <Card.Title>About Me</Card.Title>

              <Card.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur mi lectus, blandit nec libero in, pellentesque molestie tellus. Nam vel ultricies sem. Aenean aliquam convallis consectetur. Phasellus at metus interdum, ornare massa nec, convallis metus. Duis luctus orci a est semper, eget bibendum est pellentesque. </Card.Text>

              <Card.Body className="rating-box">
                {me.driver ? <Card.Subtitle className="mb-2  text-white">Driver Rating</Card.Subtitle> : <Card.Subtitle className="mb-2  text-white">Customer Rating</Card.Subtitle>}
                <Card.Title>
                  <RatingModal setShowModal={setShowModal} showModal={showModal} finalRating={finalRating}></RatingModal>
                  <Link onClick={handleShowModal}>
                    <Rating ratingValue={me.rating / me.ratingNumber} allowHalfIcon={true} allowHover={false} readonly={true} />
                  </Link>
                </Card.Title>
              </Card.Body>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  )
}

export default UserProfile
