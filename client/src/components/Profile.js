// import image from "../images/profile.png";
import { QUERY_ME_BASIC } from "../utils/queries";
import { useQuery } from "@apollo/react-hooks";
import  React,{ useState } from "react";
import {Card, ListGroupItem, ListGroup, Container, Row, Modal , Button} from "react-bootstrap";
import Avatar from 'react-avatar';
// import Pic1 from "../images/pic1.jpg"

const Profile = () => {
  const { loading, data } = useQuery(QUERY_ME_BASIC);
  var user = {};

  if (!loading) {
    user = data.me;
    console.log(data);
  }
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  // handleImageChange = (profileImage) => {
  //   this.setState({
  //     profileImage
  //   })
  // };
  
  return (
    <Container className="profileForm">
      <Row>
        <Card style={{ width: "18rem" }}>
        <Avatar size={262}  name= {user.username}  />
          
          <Button variant="primary" onClick={handleShow}>
        Add Profile Pic
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cant import picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>Whoa! This feature is not ready yet. Coming Soon!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
         {/* <img src={ Pic1 }></img> */}
          <Card.Body>
            <Card.Title>{user.username}</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>Rating ☆☆☆☆☆</ListGroupItem>
            <ListGroupItem>Phone Number: {user.phone}</ListGroupItem>
            <ListGroupItem>Email: {user.email}</ListGroupItem>
          </ListGroup>
        </Card>
      </Row>
    </Container>
  );
};

export default Profile;
